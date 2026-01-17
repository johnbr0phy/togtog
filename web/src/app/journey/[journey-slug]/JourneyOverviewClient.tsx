'use client';

import Link from 'next/link';
import { Journey } from '@/types/journey';
import { useJourneyProgress } from '@/hooks/useJourneyProgress';

interface JourneyOverviewClientProps {
  journey: Journey;
}

export default function JourneyOverviewClient({ journey }: JourneyOverviewClientProps) {
  const { progress, isLoaded } = useJourneyProgress(journey.slug, journey);

  // Calculate stats
  const totalSteps = journey.modules.reduce((sum, m) => sum + m.steps.length, 0);
  const completedSteps = progress.completedSteps.length;
  const percentComplete = Math.round((completedSteps / totalSteps) * 100);

  // Find the next step to continue from
  let nextStepSlug = journey.modules[0]?.steps[0]?.slug || '';
  let foundIncomplete = false;

  for (const module of journey.modules) {
    for (const step of module.steps) {
      if (!progress.completedSteps.includes(step.id)) {
        nextStepSlug = step.slug;
        foundIncomplete = true;
        break;
      }
    }
    if (foundIncomplete) break;
  }

  // Count free vs paid steps
  const freeSteps = journey.modules
    .filter((m) => m.isFree)
    .reduce((sum, m) => sum + m.steps.length, 0);
  const paidSteps = totalSteps - freeSteps;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/my-prep" className="text-gray-500 hover:text-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <Link href="/" className="font-bold text-xl text-gray-900">
            togtog
          </Link>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="py-16 px-4"
        style={{
          background: `linear-gradient(135deg, ${journey.color}15 0%, ${journey.color}05 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Company badge */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-white text-2xl font-bold mb-6"
            style={{ backgroundColor: journey.color }}
          >
            {journey.company[0]}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{journey.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">{journey.description}</p>

          {/* Stats */}
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <div className="text-2xl font-bold text-gray-900">{totalSteps}</div>
              <div className="text-gray-500">steps</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{journey.estimatedHours}</div>
              <div className="text-gray-500">hours</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{journey.modules.length}</div>
              <div className="text-gray-500">modules</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress (if started) */}
      {isLoaded && completedSteps > 0 && (
        <div className="bg-white border-b border-gray-200 py-6 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">Your Progress</span>
              <span className="text-sm text-gray-500">
                {completedSteps}/{totalSteps} steps ({percentComplete}%)
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${percentComplete}%`, backgroundColor: journey.color }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* CTA Button */}
        <div className="text-center mb-12">
          <Link
            href={`/journey/${journey.slug}/${nextStepSlug}`}
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
            style={{ backgroundColor: journey.color }}
          >
            {completedSteps > 0 ? 'Continue Learning' : 'Start Your Journey'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Module breakdown */}
        <h2 className="text-xl font-bold text-gray-900 mb-6">What You'll Learn</h2>

        <div className="space-y-6">
          {journey.modules.map((module, moduleIndex) => {
            const moduleCompleted = module.steps.filter((s) =>
              progress.completedSteps.includes(s.id)
            ).length;
            const moduleTotal = module.steps.length;
            const modulePercent = Math.round((moduleCompleted / moduleTotal) * 100);

            return (
              <div
                key={module.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Module header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{module.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{module.name}</h3>
                          {!module.isFree && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                              Premium
                            </span>
                          )}
                          {module.isFree && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                              Free
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {moduleCompleted}/{moduleTotal}
                      </div>
                      <div className="text-xs text-gray-500">completed</div>
                    </div>
                  </div>

                  {/* Module progress bar */}
                  {moduleCompleted > 0 && (
                    <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-green-500 transition-all"
                        style={{ width: `${modulePercent}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Steps list */}
                <div className="divide-y divide-gray-100">
                  {module.steps.map((step, stepIndex) => {
                    const isCompleted = progress.completedSteps.includes(step.id);
                    const isLocked = !module.isFree && !isCompleted;

                    return (
                      <div key={step.id} className="px-6 py-4 flex items-center gap-4">
                        {/* Status */}
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? 'bg-green-500'
                              : isLocked
                                ? 'bg-gray-200'
                                : 'bg-gray-200'
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : isLocked ? (
                            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <span className="w-2 h-2 bg-gray-400 rounded-full" />
                          )}
                        </span>

                        {/* Step info */}
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                            {step.title}
                          </div>
                          {step.subtitle && (
                            <div className={`text-sm ${isLocked ? 'text-gray-300' : 'text-gray-500'}`}>
                              {step.subtitle}
                            </div>
                          )}
                        </div>

                        {/* Duration */}
                        <span className={`text-sm ${isLocked ? 'text-gray-300' : 'text-gray-500'}`}>
                          {step.estimatedMinutes} min
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Freemium info */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 text-white">
          <h3 className="text-xl font-semibold mb-4">What's Included</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-sm font-medium">
                  Free
                </span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Company fundamentals ({journey.modules.find((m) => m.type === 'company')?.steps.length} steps)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Interview basics ({journey.modules.find((m) => m.type === 'role')?.steps.length} steps)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Interactive quizzes & exercises
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-sm font-medium">
                  Premium
                </span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {journey.company}-specific deep dives
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Advanced strategies & tactics
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Story bank builder & LP mapping
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
