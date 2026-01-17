'use client';

import Link from 'next/link';
import { Journey, JourneyProgressData } from '@/types/journey';

interface JourneyProgressProps {
  journey: Journey;
  progress: JourneyProgressData;
  currentStepId: string;
}

export default function JourneyProgress({
  journey,
  progress,
  currentStepId,
}: JourneyProgressProps) {
  // Build flat list of all steps with their module context
  const allSteps: Array<{
    step: { id: string; slug: string; title: string };
    module: { id: string; name: string; isFree: boolean };
    globalIndex: number;
    isCompleted: boolean;
    isCurrent: boolean;
    isLocked: boolean;
  }> = [];

  let globalIndex = 0;
  let hitPaywall = false;

  for (const module of journey.modules) {
    for (const step of module.steps) {
      const isCompleted = progress.completedSteps.includes(step.id);
      const isCurrent = step.id === currentStepId;

      // In first run mode, lock steps that haven't been reached yet
      // Also lock paid modules
      let isLocked = false;
      if (!module.isFree && !isCompleted && !isCurrent) {
        isLocked = true;
        hitPaywall = true;
      } else if (progress.isFirstRun && !isCompleted && !isCurrent) {
        isLocked = true;
      }

      allSteps.push({
        step,
        module,
        globalIndex,
        isCompleted,
        isCurrent,
        isLocked,
      });

      globalIndex++;
    }
  }

  // Group steps by module for display
  const moduleGroups: Array<{
    module: { id: string; name: string; isFree: boolean };
    steps: typeof allSteps;
  }> = [];

  let currentGroup: (typeof moduleGroups)[0] | null = null;
  for (const item of allSteps) {
    if (!currentGroup || currentGroup.module.id !== item.module.id) {
      currentGroup = {
        module: item.module,
        steps: [],
      };
      moduleGroups.push(currentGroup);
    }
    currentGroup.steps.push(item);
  }

  return (
    <div className="p-4">
      {/* Journey info */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mb-3"
          style={{ backgroundColor: journey.color }}
        >
          {journey.company[0]}
        </div>
        <h2 className="font-semibold text-gray-900">{journey.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{journey.estimatedHours} hours total</p>
      </div>

      {/* Module groups */}
      <div className="space-y-6">
        {moduleGroups.map((group, groupIndex) => (
          <div key={group.module.id}>
            {/* Module header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {group.module.name}
              </span>
              {!group.module.isFree && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-medium">
                  Premium
                </span>
              )}
            </div>

            {/* Steps in this module */}
            <div className="space-y-1">
              {group.steps.map((item, stepIndex) => {
                const isFirstInGroup = stepIndex === 0;
                const isLastInGroup = stepIndex === group.steps.length - 1;

                return (
                  <div key={item.step.id} className="relative">
                    {/* Connector line */}
                    {!isLastInGroup && (
                      <div
                        className={`absolute left-[11px] top-6 w-0.5 h-[calc(100%+4px)] ${
                          item.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}

                    {/* Step item */}
                    {item.isLocked ? (
                      <div className="flex items-start gap-3 py-2 px-2 rounded-lg opacity-50 cursor-not-allowed">
                        {/* Lock icon */}
                        <span className="relative z-10 flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="text-sm text-gray-400 pt-0.5">{item.step.title}</span>
                      </div>
                    ) : (
                      <Link
                        href={`/journey/${journey.slug}/${item.step.slug}`}
                        className={`flex items-start gap-3 py-2 px-2 rounded-lg transition-colors ${
                          item.isCurrent
                            ? 'bg-blue-50'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {/* Status indicator */}
                        <span
                          className={`relative z-10 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            item.isCompleted
                              ? 'bg-green-500'
                              : item.isCurrent
                                ? 'bg-blue-500'
                                : 'bg-gray-200'
                          }`}
                        >
                          {item.isCompleted ? (
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : item.isCurrent ? (
                            <span className="w-2 h-2 bg-white rounded-full" />
                          ) : (
                            <span className="w-2 h-2 bg-gray-400 rounded-full" />
                          )}
                        </span>

                        {/* Step title */}
                        <span
                          className={`text-sm pt-0.5 ${
                            item.isCurrent
                              ? 'text-blue-700 font-medium'
                              : item.isCompleted
                                ? 'text-gray-600'
                                : 'text-gray-700'
                          }`}
                        >
                          {item.step.title}
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
