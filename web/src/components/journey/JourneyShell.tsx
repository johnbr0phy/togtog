'use client';

import Link from 'next/link';
import { Journey, JourneyProgressData, Module, JourneyStep } from '@/types/journey';
import JourneyProgress from './JourneyProgress';

interface JourneyShellProps {
  journey: Journey;
  currentModule: Module;
  currentStep: JourneyStep;
  progress: JourneyProgressData;
  children: React.ReactNode;
}

export default function JourneyShell({
  journey,
  currentModule,
  currentStep,
  progress,
  children,
}: JourneyShellProps) {
  // Calculate overall progress
  const totalSteps = journey.modules.reduce((sum, m) => sum + m.steps.length, 0);
  const completedSteps = progress.completedSteps.length;
  const percentComplete = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-gray-900">
            togtog
          </Link>

          {/* Journey title */}
          <div className="hidden md:block text-center">
            <span className="text-sm font-medium text-gray-900">{journey.title}</span>
          </div>

          {/* Skip to dashboard */}
          {!progress.isFirstRun && (
            <Link
              href="/my-prep"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Dashboard
            </Link>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${percentComplete}%`,
              backgroundColor: journey.color,
            }}
          />
        </div>
      </header>

      {/* Main content */}
      <div className="flex">
        {/* Sidebar - Progress tracker */}
        <aside className="hidden lg:block w-80 flex-shrink-0 bg-white border-r border-gray-200 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto">
          <JourneyProgress
            journey={journey}
            progress={progress}
            currentStepId={currentStep.id}
          />
        </aside>

        {/* Main content area */}
        <main className="flex-1 min-w-0">
          {/* Step header */}
          <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-6">
            <div className="max-w-3xl mx-auto">
              {/* Module badge */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    backgroundColor: `${journey.color}20`,
                    color: journey.color,
                  }}
                >
                  {currentModule.name}
                </span>
                <span>
                  Step {progress.completedSteps.length + 1} of {totalSteps}
                </span>
              </div>

              {/* Step title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {currentStep.title}
              </h1>

              {/* Subtitle and time */}
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                {currentStep.subtitle && <span>{currentStep.subtitle}</span>}
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {currentStep.estimatedMinutes} min
                </span>
              </div>
            </div>
          </div>

          {/* Step content */}
          <div className="px-4 md:px-8 py-8">
            <div className="max-w-3xl mx-auto">{children}</div>
          </div>
        </main>
      </div>

      {/* Mobile progress indicator */}
      <div className="lg:hidden fixed bottom-20 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-900">{percentComplete}% complete</span>
          <span className="text-gray-500">
            {completedSteps}/{totalSteps} steps
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentComplete}%`,
              backgroundColor: journey.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
