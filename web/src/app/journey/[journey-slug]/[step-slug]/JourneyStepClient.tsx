'use client';

import { useEffect, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { Journey, JourneyStep, Module } from '@/types/journey';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';
import { JourneyShell, StepRenderer, StepNavigation } from '@/components/journey';

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
  const { progress, isLoaded, completeStep, saveQuizAnswer, saveChecklistProgress, saveExerciseResponse } =
    useJourneyProgress(journeySlug, journey);

  // Find current step and module
  const stepContext = useMemo(() => {
    let currentStep: JourneyStep | null = null;
    let currentModule: Module | null = null;
    let stepIndex = 0;
    let foundIndex = 0;

    // Build flat list of all steps
    const allSteps: Array<{ step: JourneyStep; module: Module; index: number }> = [];

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

    if (!currentStep || !currentModule) {
      return null;
    }

    const prevStepData = foundIndex > 0 ? allSteps[foundIndex - 1] : null;
    const nextStepData = foundIndex < allSteps.length - 1 ? allSteps[foundIndex + 1] : null;

    // Check if next step is behind paywall
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

  // Track page view - update current step
  useEffect(() => {
    if (isLoaded && stepContext) {
      // Could track analytics here
    }
  }, [isLoaded, stepContext]);

  if (!stepContext) {
    notFound();
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  const handleComplete = () => {
    completeStep(stepContext.step.id, stepContext.module.id);
  };

  const handleQuizAnswer = (blockId: string, optionId: string, isCorrect: boolean) => {
    saveQuizAnswer(stepContext.module.id, stepContext.step.id, blockId, optionId);
  };

  const handleChecklistProgress = (blockId: string, checkedIds: string[]) => {
    saveChecklistProgress(stepContext.module.id, blockId, checkedIds);
  };

  const handleExerciseSave = (blockId: string, text: string) => {
    saveExerciseResponse(stepContext.module.id, blockId, text);
  };

  return (
    <JourneyShell
      journey={journey}
      currentModule={stepContext.module}
      currentStep={stepContext.step}
      progress={progress}
    >
      <StepRenderer
        blocks={stepContext.step.blocks}
        moduleId={stepContext.module.id}
        stepId={stepContext.step.id}
        progress={progress}
        onQuizAnswer={handleQuizAnswer}
        onChecklistProgress={handleChecklistProgress}
        onExerciseSave={handleExerciseSave}
      />

      <StepNavigation
        journey={journey}
        currentModule={stepContext.module}
        currentStep={stepContext.step}
        prevStep={stepContext.prevStep}
        nextStep={stepContext.nextStep}
        nextModule={stepContext.nextModule}
        isLastFreeStep={stepContext.isLastFreeStep}
        onComplete={handleComplete}
      />
    </JourneyShell>
  );
}
