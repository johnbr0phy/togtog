'use client';

import Link from 'next/link';
import { Journey, JourneyStep, Module } from '@/types/journey';

interface StepNavigationProps {
  journey: Journey;
  currentModule: Module;
  currentStep: JourneyStep;
  prevStep: JourneyStep | null;
  nextStep: JourneyStep | null;
  nextModule: Module | null;
  isLastFreeStep: boolean;
  onComplete: () => void;
}

export default function StepNavigation({
  journey,
  currentModule,
  currentStep,
  prevStep,
  nextStep,
  nextModule,
  isLastFreeStep,
  onComplete,
}: StepNavigationProps) {
  const handleNext = () => {
    onComplete();
  };

  return (
    <div className="step-navigation mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between gap-4">
        {/* Back button */}
        {prevStep ? (
          <Link
            href={`/journey/${journey.slug}/${prevStep.slug}`}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </Link>
        ) : (
          <div /> // Spacer
        )}

        {/* Next button or completion */}
        {nextStep ? (
          isLastFreeStep ? (
            // Show paywall prompt
            <Link
              href={`/journey/${journey.slug}/upgrade`}
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-md"
            >
              <span>Unlock Full Course</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </Link>
          ) : (
            <Link
              href={`/journey/${journey.slug}/${nextStep.slug}`}
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
              style={{ backgroundColor: journey.color }}
            >
              <span>
                {nextModule && nextModule.id !== currentModule.id
                  ? `Continue to ${nextModule.name}`
                  : 'Continue'}
              </span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )
        ) : (
          // Last step - completion button
          <Link
            href={`/journey/${journey.slug}/complete`}
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all shadow-md"
          >
            <span>Complete Journey</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* Next step preview */}
      {nextStep && !isLastFreeStep && (
        <div className="mt-4 text-center text-sm text-gray-500">
          Next: {nextStep.title} ({nextStep.estimatedMinutes} min)
        </div>
      )}
    </div>
  );
}
