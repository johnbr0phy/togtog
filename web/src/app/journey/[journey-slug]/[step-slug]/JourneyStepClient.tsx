'use client';

import { useState, useMemo } from 'react';
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

  const stepContext = useMemo(() => {
    let currentStep: JourneyStep | null = null;
    let currentModule: Module | null = null;
    let foundIndex = 0;

    const allSteps: Array<{ step: JourneyStep; module: Module; index: number }> = [];
    let stepIndex = 0;

    for (const module of journey.modules) {
      for (const step of module.steps) {
        allSteps.push({ step, module, index: stepIndex });
        if (step.slug === stepSlug) {
          currentStep = step;
          currentModule = module;
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

  if (!stepContext || !isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#fffbf5' }}>
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  const { step, module } = stepContext;
  const blocks = step.blocks;
  const currentBlock = blocks[currentBlockIndex];
  const isLastBlock = currentBlockIndex === blocks.length - 1;

  const totalSteps = journey.modules.reduce((sum, m) => sum + m.steps.length, 0);
  const completedSteps = progress.completedSteps.length;

  // Calculate which pill to fill
  const currentStepInJourney = stepContext.stepIndex;
  const pillCount = Math.min(totalSteps, 6); // Show max 6 pills
  const stepsPerPill = totalSteps / pillCount;

  const handleNext = () => {
    if (isLastBlock) {
      completeStep(step.id, module.id);

      if (stepContext.isLastFreeStep) {
        router.push(`/journey/${journeySlug}/upgrade`);
      } else if (stepContext.nextStep) {
        setCurrentBlockIndex(0);
        setSelectedOption(null);
        setQuizAnswered(false);
        router.push(`/journey/${journeySlug}/${stepContext.nextStep.slug}`);
      } else {
        router.push(`/journey/${journeySlug}/complete`);
      }
    } else {
      setCurrentBlockIndex(currentBlockIndex + 1);
      setSelectedOption(null);
      setQuizAnswered(false);
    }
  };

  const handleBack = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
      setSelectedOption(null);
      setQuizAnswered(false);
    } else if (stepContext.prevStep) {
      router.push(`/journey/${journeySlug}/${stepContext.prevStep.slug}`);
    } else {
      router.push(`/journey/${journeySlug}`);
    }
  };

  const canProceed = () => {
    if (currentBlock.type === 'quiz') {
      return quizAnswered;
    }
    return true;
  };

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        // Extract just the first heading or first paragraph for minimal display
        const lines = block.content.markdown.split('\n').filter(l => l.trim());
        const mainContent = lines[0]?.replace(/^#+\s*/, '') || '';
        return (
          <p className="text-lg text-center text-gray-700 leading-relaxed max-w-md">
            {mainContent}
          </p>
        );

      case 'quiz':
        return (
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-3">
              {block.content.options.map((option) => {
                const isSelected = selectedOption === option.id;
                const showCorrect = quizAnswered && option.isCorrect;
                const showWrong = quizAnswered && isSelected && !option.isCorrect;

                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      if (!quizAnswered) {
                        setSelectedOption(option.id);
                        setQuizAnswered(true);
                        saveQuizAnswer(module.id, step.id, block.id, option.id);
                      }
                    }}
                    className={`
                      px-5 py-4 rounded-2xl text-base font-medium text-center transition-all
                      ${showCorrect
                        ? 'bg-green-50 border-2 border-green-500 text-green-700'
                        : showWrong
                          ? 'bg-red-50 border-2 border-red-400 text-red-700'
                          : isSelected
                            ? 'bg-orange-50 border-2 border-orange-500 text-orange-700'
                            : 'bg-white border-2 border-transparent hover:shadow-md hover:-translate-y-0.5'
                      }
                    `}
                    style={{
                      boxShadow: !isSelected && !quizAnswered ? '0 2px 8px rgba(0,0,0,0.04)' : undefined
                    }}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
            {quizAnswered && (
              <p className="mt-5 text-sm text-center text-gray-600 animate-fadeIn">
                {block.content.explanation}
              </p>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="w-full max-w-md">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
              <iframe
                src={`https://www.youtube.com/embed/${block.content.youtubeId}?rel=0`}
                title={block.content.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            {block.content.title && (
              <p className="mt-3 text-sm text-center text-gray-500">{block.content.title}</p>
            )}
          </div>
        );

      case 'tip':
        return (
          <div className="w-full max-w-sm bg-orange-50 border border-orange-100 rounded-2xl p-5">
            <p className="text-sm font-medium text-orange-800 mb-1">{block.content.title}</p>
            <p className="text-sm text-orange-700">{block.content.body}</p>
          </div>
        );

      case 'quote':
        return (
          <div className="w-full max-w-sm text-center">
            <p className="text-lg italic text-gray-700 mb-3">"{block.content.quote}"</p>
            <p className="text-sm text-gray-500">— {block.content.author}</p>
          </div>
        );

      case 'checklist':
        return (
          <div className="w-full max-w-sm">
            <p className="text-sm font-medium text-gray-900 mb-3">{block.content.title}</p>
            <div className="space-y-2">
              {block.content.items.map((item) => (
                <label key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded accent-orange-500" />
                  <span className="text-sm text-gray-700">{item.text}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Get emoji for module
  const moduleEmoji = module.icon || (module.type === 'company' ? '📦' : module.type === 'role' ? '💻' : '🎯');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#fffbf5' }}>
      {/* Header */}
      <header className="flex-shrink-0 px-4 py-4 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Progress pills */}
        <div className="flex gap-1.5">
          {Array.from({ length: pillCount }).map((_, i) => {
            const pillProgress = (currentStepInJourney + (currentBlockIndex / blocks.length)) / totalSteps;
            const thisPillStart = i / pillCount;
            const thisPillEnd = (i + 1) / pillCount;

            let fillPercent = 0;
            if (pillProgress >= thisPillEnd) {
              fillPercent = 100;
            } else if (pillProgress > thisPillStart) {
              fillPercent = ((pillProgress - thisPillStart) / (thisPillEnd - thisPillStart)) * 100;
            }

            return (
              <div
                key={i}
                className="w-8 h-1.5 rounded-full overflow-hidden"
                style={{ background: '#e8e4df' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${fillPercent}%`,
                    background: '#e8670f'
                  }}
                />
              </div>
            );
          })}
        </div>

        <Link
          href={`/journey/${journeySlug}`}
          className="text-sm text-gray-400 hover:text-gray-600 px-3 py-1.5 bg-white rounded-full shadow-sm"
        >
          Help
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Emoji avatar */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6"
          style={{ background: 'linear-gradient(135deg, #fff4ed, #ffe4d4)' }}
        >
          {moduleEmoji}
        </div>

        {/* Question/Title */}
        <h1
          className="text-2xl md:text-3xl font-normal text-center text-gray-900 mb-8 max-w-lg leading-snug animate-fadeIn"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          {currentBlock.type === 'quiz'
            ? currentBlock.content.question
            : step.title
          }
        </h1>

        {/* Content block */}
        <div className="animate-fadeIn">
          {renderBlock(currentBlock)}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 px-4 py-6">
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className="w-full max-w-sm mx-auto block py-4 rounded-2xl text-base font-medium transition-all disabled:opacity-30"
          style={{
            background: '#2d2a26',
            color: 'white'
          }}
        >
          {isLastBlock ? 'Continue' : 'Next'}
        </button>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&display=swap');

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
