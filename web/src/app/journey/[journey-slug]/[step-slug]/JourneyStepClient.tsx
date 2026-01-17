'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Journey, JourneyStep, Module, ContentBlock } from '@/types/journey';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';

interface JourneyStepClientProps {
  journeySlug: string;
  stepSlug: string;
  journey: Journey;
}

export default function JourneyStepClient({
  journeySlug,
  stepSlug,
  journey,
}: JourneyStepClientProps) {
  const router = useRouter();
  const { progress, isLoaded, completeStep, saveQuizAnswer } = useJourneyProgress(journeySlug, journey);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Animation state: 'visible' | 'exiting' | 'entering'
  const [animState, setAnimState] = useState<'visible' | 'exiting' | 'entering'>('visible');
  const pendingAction = useRef<(() => void) | null>(null);

  const stepContext = useMemo(() => {
    let currentStep: JourneyStep | null = null;
    let currentModule: Module | null = null;
    let foundIndex = 0;

    const allSteps: Array<{ step: JourneyStep; module: Module; index: number }> = [];
    let stepIndex = 0;

    for (const mod of journey.modules) {
      for (const step of mod.steps) {
        allSteps.push({ step, module: mod, index: stepIndex });
        if (step.slug === stepSlug) {
          currentStep = step;
          currentModule = mod;
          foundIndex = stepIndex;
        }
        stepIndex++;
      }
    }

    if (!currentStep || !currentModule) return null;

    const prevStepData = foundIndex > 0 ? allSteps[foundIndex - 1] : null;
    const nextStepData = foundIndex < allSteps.length - 1 ? allSteps[foundIndex + 1] : null;
    const isLastFreeStep = nextStepData !== null && !nextStepData.module.isFree && currentModule.isFree;

    return {
      step: currentStep,
      module: currentModule,
      stepIndex: foundIndex,
      prevStep: prevStepData?.step || null,
      nextStep: nextStepData?.step || null,
      isLastFreeStep,
      totalSteps: allSteps.length,
    };
  }, [journey, stepSlug]);

  // Reset state when step changes
  useEffect(() => {
    setCurrentBlockIndex(0);
    setSelectedOption(null);
    setQuizAnswered(false);
    setAnimState('visible');
  }, [stepSlug]);

  // Handle animation state machine
  useEffect(() => {
    if (animState === 'exiting') {
      const timer = setTimeout(() => {
        // Execute pending action during the "hidden" moment
        if (pendingAction.current) {
          pendingAction.current();
          pendingAction.current = null;
        }
        setAnimState('entering');
      }, 180);
      return () => clearTimeout(timer);
    }

    if (animState === 'entering') {
      // Small delay to ensure DOM has updated before fade in
      const timer = setTimeout(() => {
        setAnimState('visible');
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [animState]);

  const animateTransition = useCallback((action: () => void) => {
    pendingAction.current = action;
    setAnimState('exiting');
  }, []);

  if (!stepContext || !isLoaded) {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="journey-screen">
          <div style={{ color: '#9c9690', textAlign: 'center' }}>Loading...</div>
        </div>
      </>
    );
  }

  const { step, module } = stepContext;
  const blocks = step.blocks;
  const currentBlock = blocks[currentBlockIndex];
  const isLastBlock = currentBlockIndex === blocks.length - 1;

  const totalSteps = journey.modules.reduce((sum, m) => sum + m.steps.length, 0);
  const currentStepInJourney = stepContext.stepIndex;
  const pillCount = Math.min(totalSteps, 6);

  const transitionToNext = () => {
    if (animState !== 'visible') return;

    animateTransition(() => {
      if (isLastBlock) {
        completeStep(step.id, module.id);
        if (stepContext.isLastFreeStep) {
          router.push(`/journey/${journeySlug}/upgrade`);
        } else if (stepContext.nextStep) {
          router.push(`/journey/${journeySlug}/${stepContext.nextStep.slug}`);
        } else {
          router.push(`/journey/${journeySlug}/complete`);
        }
      } else {
        setCurrentBlockIndex(currentBlockIndex + 1);
        setSelectedOption(null);
        setQuizAnswered(false);
      }
    });
  };

  const handleBack = () => {
    if (animState !== 'visible') return;

    if (currentBlockIndex > 0) {
      animateTransition(() => {
        setCurrentBlockIndex(currentBlockIndex - 1);
        setSelectedOption(null);
        setQuizAnswered(false);
      });
    } else if (stepContext.prevStep) {
      router.push(`/journey/${journeySlug}/${stepContext.prevStep.slug}`);
    } else {
      router.push(`/journey/${journeySlug}`);
    }
  };

  const canProceed = currentBlock.type === 'quiz' ? quizAnswered : true;

  const moduleEmoji = module.icon || (module.type === 'company' ? '📦' : module.type === 'role' ? '💻' : '🎯');

  const handleQuizSelect = (optionId: string, blockId: string) => {
    if (quizAnswered) return;
    setSelectedOption(optionId);
    setQuizAnswered(true);
    saveQuizAnswer(module.id, step.id, blockId, optionId);
  };

  const renderQuiz = (block: ContentBlock & { type: 'quiz' }) => (
    <div className="quiz-container">
      {block.content.options.map((option, idx) => {
        const isSelected = selectedOption === option.id;
        const isUnselected = quizAnswered && !isSelected;

        return (
          <button
            key={option.id}
            onClick={() => handleQuizSelect(option.id, block.id)}
            className={`quiz-option ${isSelected ? 'selected' : ''} ${isUnselected ? 'unselected' : ''}`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {option.text}
          </button>
        );
      })}
      <div className={`quiz-explanation ${quizAnswered ? 'visible' : ''}`}>
        {block.content.explanation}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentBlock.type) {
      case 'quiz':
        return renderQuiz(currentBlock as ContentBlock & { type: 'quiz' });

      case 'text':
        const lines = currentBlock.content.markdown.split('\n').filter((l: string) => l.trim());
        const mainContent = lines[0]?.replace(/^#+\s*/, '') || '';
        return <p className="text-content">{mainContent}</p>;

      case 'video':
        return (
          <div className="video-container">
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${currentBlock.content.youtubeId}?rel=0`}
                title={currentBlock.content.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        );

      case 'tip':
        return (
          <div className="tip-container">
            <p className="tip-title">{currentBlock.content.title}</p>
            <p className="tip-body">{currentBlock.content.body}</p>
          </div>
        );

      case 'quote':
        return (
          <div className="quote-container">
            <p className="quote-text">"{currentBlock.content.quote}"</p>
            <p className="quote-author">— {currentBlock.content.author}</p>
          </div>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    if (currentBlock.type === 'quiz') {
      return currentBlock.content.question;
    }
    return step.title;
  };

  const contentOpacity = animState === 'visible' ? 1 : 0;
  const contentTransform = animState === 'visible' ? 'translateY(0)' : 'translateY(12px)';

  return (
    <>
      <style>{globalStyles}</style>

      <div className="journey-screen">
        {/* Header */}
        <header className="journey-header">
          <button onClick={handleBack} className="back-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <div className="pills-container">
            {Array.from({ length: pillCount }).map((_, i) => {
              const pillProgress = (currentStepInJourney + (currentBlockIndex / blocks.length)) / totalSteps;
              const thisPillStart = i / pillCount;
              const thisPillEnd = (i + 1) / pillCount;
              let fillPercent = 0;
              if (pillProgress >= thisPillEnd) fillPercent = 100;
              else if (pillProgress > thisPillStart) {
                fillPercent = ((pillProgress - thisPillStart) / (thisPillEnd - thisPillStart)) * 100;
              }
              return (
                <div key={i} className="pill">
                  <div className="pill-fill" style={{ width: `${fillPercent}%` }} />
                </div>
              );
            })}
          </div>

          <Link href={`/journey/${journeySlug}`} className="help-button">
            Help
          </Link>
        </header>

        {/* Main */}
        <main className="journey-main">
          <div
            className="content-wrapper"
            style={{
              opacity: contentOpacity,
              transform: contentTransform,
            }}
          >
            {/* Avatar */}
            <div className="avatar">{moduleEmoji}</div>

            {/* Title */}
            <h1 className="title">{getTitle()}</h1>

            {/* Content */}
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="journey-footer">
          <button
            onClick={transitionToNext}
            disabled={!canProceed}
            className={`next-button ${canProceed ? 'active' : 'disabled'}`}
          >
            {isLastBlock ? 'Continue' : 'Next'}
          </button>
        </footer>
      </div>
    </>
  );
}

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Inter:wght@400;500&display=swap');

  .journey-screen {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background: #fffbf5;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  /* Header */
  .journey-header {
    flex-shrink: 0;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .back-button {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: white;
    border: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9c9690;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .back-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .back-button:active {
    transform: scale(0.95);
  }

  .pills-container {
    display: flex;
    gap: 0.375rem;
  }

  .pill {
    width: 2rem;
    height: 0.375rem;
    border-radius: 1rem;
    background: #e8e4df;
    overflow: hidden;
  }

  .pill-fill {
    height: 100%;
    background: #e8670f;
    border-radius: 1rem;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .help-button {
    font-size: 0.8rem;
    color: #9c9690;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .help-button:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  /* Main */
  .journey-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 400px;
    will-change: opacity, transform;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #fff4ed, #ffe4d4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .title {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(1.5rem, 5vw, 1.875rem);
    font-weight: 400;
    line-height: 1.35;
    color: #2d2a26;
    margin: 0 0 2rem 0;
  }

  /* Quiz */
  .quiz-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .quiz-option {
    position: relative;
    padding: 1rem 1.25rem;
    min-height: 3.5rem;
    border-radius: 0.875rem;
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Inter', -apple-system, sans-serif;
    background: white;
    color: #2d2a26;
    border: 2px solid #f0ebe6;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    cursor: pointer;
    text-align: center;
    transition: background 0.2s ease,
                border-color 0.2s ease,
                color 0.2s ease,
                opacity 0.25s ease,
                box-shadow 0.2s ease;
  }

  .quiz-option:hover:not(.selected):not(.unselected) {
    border-color: #d4cfc9;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .quiz-option:active:not(.selected):not(.unselected) {
    background: #faf7f4;
  }

  .quiz-option.selected {
    background: #fff4ed;
    border-color: #e8670f;
    color: #c45a0a;
    box-shadow: 0 2px 12px rgba(232, 103, 15, 0.15);
  }

  .quiz-option.unselected {
    opacity: 0.45;
    cursor: default;
  }

  .quiz-explanation {
    margin-top: 1rem;
    padding: 0 0.5rem;
    font-size: 0.875rem;
    color: #6b6b6b;
    line-height: 1.5;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s;
    pointer-events: none;
  }

  .quiz-explanation.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* Text content */
  .text-content {
    font-size: 1.0625rem;
    color: #5a5652;
    line-height: 1.6;
    margin: 0;
  }

  /* Video */
  .video-container {
    width: 100%;
  }

  .video-wrapper {
    aspect-ratio: 16/9;
    border-radius: 1rem;
    overflow: hidden;
    background: #1a1a1a;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }

  .video-wrapper iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  /* Tip */
  .tip-container {
    width: 100%;
    background: #fff4ed;
    border: 1px solid #ffe4d4;
    border-radius: 1rem;
    padding: 1.25rem;
    text-align: left;
  }

  .tip-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #c45a0a;
    margin: 0 0 0.5rem 0;
  }

  .tip-body {
    font-size: 0.875rem;
    color: #a85a1a;
    line-height: 1.5;
    margin: 0;
  }

  /* Quote */
  .quote-container {
    width: 100%;
  }

  .quote-text {
    font-size: 1.125rem;
    font-style: italic;
    color: #5a5652;
    line-height: 1.5;
    margin: 0 0 0.75rem 0;
  }

  .quote-author {
    font-size: 0.875rem;
    color: #9c9690;
    margin: 0;
  }

  /* Footer */
  .journey-footer {
    flex-shrink: 0;
    padding: 1.5rem;
  }

  .next-button {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    display: block;
    padding: 1rem 2rem;
    border-radius: 0.875rem;
    background: #2d2a26;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Inter', -apple-system, sans-serif;
    border: none;
    cursor: pointer;
    transition: transform 0.15s ease,
                box-shadow 0.15s ease,
                opacity 0.2s ease;
  }

  .next-button.active:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  }

  .next-button.active:active {
    transform: translateY(0);
  }

  .next-button.disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
