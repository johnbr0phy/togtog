'use client';

import { useState, useEffect, useCallback } from 'react';
import { AllJourneyProgress, JourneyProgressData, Journey } from '@/types/journey';

const STORAGE_KEY = 'togtog-journey-progress';

const defaultProgress: JourneyProgressData = {
  currentStepId: '',
  currentModuleId: '',
  completedSteps: [],
  startedAt: new Date().toISOString(),
  lastAccessedAt: new Date().toISOString(),
  isFirstRun: true,
  moduleProgress: {},
};

export function useJourneyProgress(journeySlug: string, journey?: Journey) {
  const [progress, setProgress] = useState<JourneyProgressData>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const allProgress: AllJourneyProgress = JSON.parse(stored);
        if (allProgress[journeySlug]) {
          setProgress(allProgress[journeySlug]);
        } else if (journey) {
          // Initialize progress for new journey
          const firstModule = journey.modules[0];
          const firstStep = firstModule?.steps[0];
          const initial: JourneyProgressData = {
            ...defaultProgress,
            currentStepId: firstStep?.id || '',
            currentModuleId: firstModule?.id || '',
            startedAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
          };
          setProgress(initial);
        }
      } catch {
        // Invalid JSON, use default
      }
    } else if (journey) {
      // No stored progress, initialize
      const firstModule = journey.modules[0];
      const firstStep = firstModule?.steps[0];
      const initial: JourneyProgressData = {
        ...defaultProgress,
        currentStepId: firstStep?.id || '',
        currentModuleId: firstModule?.id || '',
        startedAt: new Date().toISOString(),
        lastAccessedAt: new Date().toISOString(),
      };
      setProgress(initial);
    }
    setIsLoaded(true);
  }, [journeySlug, journey]);

  // Save progress to localStorage
  const saveProgress = useCallback(
    (newProgress: JourneyProgressData) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      let allProgress: AllJourneyProgress = {};

      if (stored) {
        try {
          allProgress = JSON.parse(stored);
        } catch {
          // Invalid JSON, start fresh
        }
      }

      allProgress[journeySlug] = {
        ...newProgress,
        lastAccessedAt: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
      setProgress(newProgress);
    },
    [journeySlug]
  );

  // Mark a step as completed
  const completeStep = useCallback(
    (stepId: string, moduleId: string) => {
      if (progress.completedSteps.includes(stepId)) {
        return; // Already completed
      }

      const newProgress: JourneyProgressData = {
        ...progress,
        completedSteps: [...progress.completedSteps, stepId],
        currentStepId: stepId,
        currentModuleId: moduleId,
      };

      saveProgress(newProgress);
    },
    [progress, saveProgress]
  );

  // Save quiz answer
  const saveQuizAnswer = useCallback(
    (moduleId: string, stepId: string, blockId: string, optionId: string) => {
      const moduleProgress = progress.moduleProgress[moduleId] || {
        completedSteps: [],
        quizAnswers: {},
        exerciseResponses: {},
        checklistProgress: {},
      };

      const newModuleProgress = {
        ...moduleProgress,
        quizAnswers: {
          ...moduleProgress.quizAnswers,
          [`${stepId}-${blockId}`]: optionId,
        },
      };

      const newProgress: JourneyProgressData = {
        ...progress,
        moduleProgress: {
          ...progress.moduleProgress,
          [moduleId]: newModuleProgress,
        },
      };

      saveProgress(newProgress);
    },
    [progress, saveProgress]
  );

  // Save checklist progress
  const saveChecklistProgress = useCallback(
    (moduleId: string, blockId: string, checkedIds: string[]) => {
      const moduleProgress = progress.moduleProgress[moduleId] || {
        completedSteps: [],
        quizAnswers: {},
        exerciseResponses: {},
        checklistProgress: {},
      };

      const newModuleProgress = {
        ...moduleProgress,
        checklistProgress: {
          ...moduleProgress.checklistProgress,
          [blockId]: checkedIds,
        },
      };

      const newProgress: JourneyProgressData = {
        ...progress,
        moduleProgress: {
          ...progress.moduleProgress,
          [moduleId]: newModuleProgress,
        },
      };

      saveProgress(newProgress);
    },
    [progress, saveProgress]
  );

  // Save exercise response
  const saveExerciseResponse = useCallback(
    (moduleId: string, blockId: string, text: string) => {
      const moduleProgress = progress.moduleProgress[moduleId] || {
        completedSteps: [],
        quizAnswers: {},
        exerciseResponses: {},
        checklistProgress: {},
      };

      const newModuleProgress = {
        ...moduleProgress,
        exerciseResponses: {
          ...moduleProgress.exerciseResponses,
          [blockId]: text,
        },
      };

      const newProgress: JourneyProgressData = {
        ...progress,
        moduleProgress: {
          ...progress.moduleProgress,
          [moduleId]: newModuleProgress,
        },
      };

      saveProgress(newProgress);
    },
    [progress, saveProgress]
  );

  // Mark first run as complete (unlocks free navigation)
  const completeFirstRun = useCallback(() => {
    const newProgress: JourneyProgressData = {
      ...progress,
      isFirstRun: false,
    };
    saveProgress(newProgress);
  }, [progress, saveProgress]);

  // Reset progress
  const resetProgress = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let allProgress: AllJourneyProgress = {};

    if (stored) {
      try {
        allProgress = JSON.parse(stored);
      } catch {
        // Invalid JSON
      }
    }

    delete allProgress[journeySlug];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    setProgress(defaultProgress);
  }, [journeySlug]);

  return {
    progress,
    isLoaded,
    completeStep,
    saveQuizAnswer,
    saveChecklistProgress,
    saveExerciseResponse,
    completeFirstRun,
    resetProgress,
  };
}

// Helper hook to get progress for all journeys
export function useAllJourneyProgress() {
  const [allProgress, setAllProgress] = useState<AllJourneyProgress>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAllProgress(JSON.parse(stored));
      } catch {
        // Invalid JSON
      }
    }
    setIsLoaded(true);
  }, []);

  return { allProgress, isLoaded };
}
