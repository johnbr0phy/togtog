'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Journey, JourneyStep, Module, ContentBlock } from '@/types/journey';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import {
  TextBlock,
  QuizBlock,
  VideoBlock,
  TipBlock,
  ChecklistBlock,
  QuoteBlock,
  ExerciseBlock,
} from '@/components/journey/blocks';

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

  // Track which content block we're showing (one at a time, Lemonade-style)
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  // Find current step and module
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
      nextModule: nextStepData?.module || null,
      isLastFreeStep,
      totalSteps: allSteps.length,
    };
  }, [journey, stepSlug]);

  if (!stepContext || !isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  const { step, module } = stepContext;
  const blocks = step.blocks;
  const currentBlock = blocks[currentBlockIndex];
  const isLastBlock = currentBlockIndex === blocks.length - 1;
  const isFirstBlock = currentBlockIndex === 0;

  // Calculate overall progress
  const totalSteps = journey.modules.reduce((sum, m) => sum + m.steps.length, 0);
  const completedSteps = progress.completedSteps.length;
  const progressPercent = Math.round(((completedSteps + (currentBlockIndex / blocks.length)) / totalSteps) * 100);

  const handleNext = () => {
    if (isLastBlock) {
      // Complete this step and go to next
      completeStep(step.id, module.id);

      if (stepContext.isLastFreeStep) {
        router.push(`/journey/${journeySlug}/upgrade`);
      } else if (stepContext.nextStep) {
        router.push(`/journey/${journeySlug}/${stepContext.nextStep.slug}`);
      } else {
        router.push(`/journey/${journeySlug}/complete`);
      }
    } else {
      // Show next block
      setCurrentBlockIndex(currentBlockIndex + 1);
    }
  };

  const handleBack = () => {
    if (isFirstBlock) {
      if (stepContext.prevStep) {
        router.push(`/journey/${journeySlug}/${stepContext.prevStep.slug}`);
      } else {
        router.push(`/journey/${journeySlug}`);
      }
    } else {
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  };

  const handleQuizAnswer = (blockId: string, optionId: string, isCorrect: boolean) => {
    saveQuizAnswer(module.id, step.id, blockId, optionId);
  };

  // Render a single content block
  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return <TextBlock content={block.content} />;
      case 'video':
        return <VideoBlock content={block.content} />;
      case 'quiz':
        return (
          <QuizBlock
            blockId={block.id}
            content={block.content}
            savedAnswer={progress.moduleProgress?.[module.id]?.quizAnswers?.[`${step.id}-${block.id}`]}
            onAnswer={(optionId, isCorrect) => handleQuizAnswer(block.id, optionId, isCorrect)}
          />
        );
      case 'checklist':
        return <ChecklistBlock blockId={block.id} content={block.content} />;
      case 'tip':
        return <TipBlock content={block.content} />;
      case 'quote':
        return <QuoteBlock content={block.content} />;
      case 'exercise':
        return <ExerciseBlock blockId={block.id} content={block.content} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal header */}
      <header className="flex-shrink-0">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={`/journey/${journeySlug}`} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>

          <span className="font-medium text-gray-900">togtog</span>

          <button className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-gray-900 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main content - centered, one thing at a time */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Step title - only show on first block */}
          {isFirstBlock && (
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed">
                {step.title}
              </h1>
              {step.subtitle && (
                <p className="mt-2 text-gray-500">{step.subtitle}</p>
              )}
            </div>
          )}

          {/* Single content block */}
          <div className="animate-fadeIn">
            {renderBlock(currentBlock)}
          </div>
        </div>
      </main>

      {/* Bottom navigation */}
      <footer className="flex-shrink-0 border-t border-gray-100">
        <div className="max-w-xl mx-auto px-4 py-6 flex items-center justify-between">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Block indicator dots */}
          {blocks.length > 1 && (
            <div className="flex gap-2">
              {blocks.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentBlockIndex ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Next button */}
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            {isLastBlock ? 'Continue' : 'Next'}
          </button>
        </div>
      </footer>
    </div>
  );
}
