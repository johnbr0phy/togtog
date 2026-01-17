'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import StageSection from '../../../components/stages/StageSection';
import StageChecklist from '../../../components/stages/StageChecklist';
import StageSidebar from '../../../components/stages/StageSidebar';
import { InterviewStage, StageProgress, ChecklistItem } from '../../../types';
import { getStageBySlug } from '../../../data/stages';

const STORAGE_KEY = 'togtog_stage_progress';

const SECTION_IDS = {
  overview: 'overview',
  hiddenIntent: 'hidden-intent',
  howToPrepare: 'how-to-prepare',
  transcript: 'transcript',
  practice: 'practice',
  mistakes: 'common-mistakes',
  checklist: 'checklist',
};

const SECTION_TITLES: Record<string, string> = {
  [SECTION_IDS.overview]: 'Overview',
  [SECTION_IDS.hiddenIntent]: "What They're Really Testing",
  [SECTION_IDS.howToPrepare]: 'How to Prepare',
  [SECTION_IDS.transcript]: 'Example Transcript',
  [SECTION_IDS.practice]: 'Practice Questions',
  [SECTION_IDS.mistakes]: 'Common Mistakes',
  [SECTION_IDS.checklist]: 'Completion Checklist',
};

interface StoredProgress {
  stages: Record<string, StageProgress>;
  stageOrder: string[];
  customStages: InterviewStage[];
}

function loadProgress(): StoredProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveProgress(progress: StoredProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export default function StagePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [stage, setStage] = useState<InterviewStage | null>(null);
  const [stageProgress, setStageProgress] = useState<StageProgress | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Load stage and progress
  useEffect(() => {
    const stageData = getStageBySlug(slug);
    setStage(stageData);

    const allProgress = loadProgress();
    if (allProgress && stageData) {
      setStageProgress(allProgress.stages[stageData.id] || null);
    }
    setIsLoaded(true);
  }, [slug]);

  // Calculate completion percentage
  const calculateProgress = useCallback((progress: StageProgress | null, stage: InterviewStage): number => {
    if (!progress || !stage) return 0;

    const totalSections = Object.keys(SECTION_IDS).length;
    const viewedSections = progress.sectionsViewed.length;

    const totalChecklist = stage.checklist.length;
    const completedChecklist = progress.checklistCompleted.length;

    // Weight: 60% sections viewed, 40% checklist
    const sectionWeight = totalSections > 0 ? (viewedSections / totalSections) * 60 : 0;
    const checklistWeight = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 40 : 40;

    return Math.round(sectionWeight + checklistWeight);
  }, []);

  // Save progress helper
  const updateProgress = useCallback((updater: (prev: StageProgress) => StageProgress) => {
    if (!stage) return;

    setStageProgress((prev) => {
      const newProgress = updater(
        prev || {
          stageId: stage.id,
          sectionsViewed: [],
          checklistCompleted: [],
          percentComplete: 0,
          isComplete: false,
        }
      );

      // Calculate new percentage
      newProgress.percentComplete = calculateProgress(newProgress, stage);

      // Save to localStorage
      const allProgress = loadProgress() || {
        stages: {},
        stageOrder: [],
        customStages: [],
      };
      allProgress.stages[stage.id] = newProgress;
      saveProgress(allProgress);

      return newProgress;
    });
  }, [stage, calculateProgress]);

  // Mark section as viewed
  const handleSectionView = useCallback((sectionId: string) => {
    updateProgress((prev) => {
      if (prev.sectionsViewed.includes(sectionId)) return prev;
      return {
        ...prev,
        sectionsViewed: [...prev.sectionsViewed, sectionId],
      };
    });
  }, [updateProgress]);

  // Toggle checklist item
  const handleChecklistToggle = useCallback((itemId: string) => {
    updateProgress((prev) => {
      const isCompleted = prev.checklistCompleted.includes(itemId);
      return {
        ...prev,
        checklistCompleted: isCompleted
          ? prev.checklistCompleted.filter((id) => id !== itemId)
          : [...prev.checklistCompleted, itemId],
      };
    });
  }, [updateProgress]);

  // Mark stage as complete
  const handleMarkComplete = useCallback(() => {
    if (!stage) return;

    updateProgress((prev) => ({
      ...prev,
      isComplete: true,
      completedAt: new Date().toISOString(),
    }));
  }, [stage, updateProgress]);

  // Navigate to section
  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // Section icons
  const sectionIcons: Record<string, React.ReactNode> = {
    [SECTION_IDS.overview]: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    [SECTION_IDS.hiddenIntent]: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    [SECTION_IDS.howToPrepare]: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    [SECTION_IDS.transcript]: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    [SECTION_IDS.practice]: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    [SECTION_IDS.mistakes]: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    [SECTION_IDS.checklist]: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Stage Not Found</h1>
          <p className="text-gray-600 mb-4">The interview stage &quot;{slug}&quot; doesn&apos;t exist.</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const sectionsViewed = stageProgress?.sectionsViewed || [];
  const checklistCompleted = stageProgress?.checklistCompleted || [];
  const percentComplete = stageProgress?.percentComplete || 0;
  const isComplete = stageProgress?.isComplete || false;

  // Build checklist items with completion state
  const checklistItems: ChecklistItem[] = stage.checklist.map((item) => ({
    ...item,
    completed: checklistCompleted.includes(item.id),
  }));

  const allChecklistComplete = checklistItems.length > 0 && checklistItems.every((item) => item.completed);

  // Sidebar sections
  const sidebarSections = Object.entries(SECTION_IDS).map(([key, id]) => ({
    id,
    title: SECTION_TITLES[id],
    isViewed: sectionsViewed.includes(id),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Stages
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{stage.name}</h1>
                {isComplete && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Complete
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                {stage.format} &bull; {stage.whoYouMeet}
              </p>
            </div>

            {!isComplete && (
              <button
                onClick={handleMarkComplete}
                disabled={!allChecklistComplete}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  allChecklistComplete
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Mark Stage Complete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <StageSidebar
              sections={sidebarSections}
              activeSection={activeSection}
              onNavigate={handleNavigateToSection}
              percentComplete={percentComplete}
            />
          </aside>

          {/* Content */}
          <main className="flex-1 space-y-4">
            {/* Mobile progress bar */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Progress</span>
                <span className="text-gray-600">{percentComplete}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            {/* Section: Overview */}
            <StageSection
              id={SECTION_IDS.overview}
              title={SECTION_TITLES[SECTION_IDS.overview]}
              icon={sectionIcons[SECTION_IDS.overview]}
              isViewed={sectionsViewed.includes(SECTION_IDS.overview)}
              onView={() => handleSectionView(SECTION_IDS.overview)}
              defaultOpen={true}
            >
              <div className="prose prose-gray max-w-none">
                {stage.overview ? (
                  <p>{stage.overview}</p>
                ) : (
                  <p className="text-gray-500 italic">Content coming soon...</p>
                )}
                <div className="mt-4 grid grid-cols-3 gap-4 not-prose">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
                    <p className="font-medium text-gray-900">{stage.duration}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Format</p>
                    <p className="font-medium text-gray-900">{stage.format}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Who You Meet</p>
                    <p className="font-medium text-gray-900">{stage.whoYouMeet}</p>
                  </div>
                </div>
              </div>
            </StageSection>

            {/* Section: Hidden Intent */}
            <StageSection
              id={SECTION_IDS.hiddenIntent}
              title={SECTION_TITLES[SECTION_IDS.hiddenIntent]}
              icon={sectionIcons[SECTION_IDS.hiddenIntent]}
              isViewed={sectionsViewed.includes(SECTION_IDS.hiddenIntent)}
              onView={() => handleSectionView(SECTION_IDS.hiddenIntent)}
            >
              <div className="prose prose-gray max-w-none">
                {stage.hiddenIntent ? (
                  <>
                    <p className="text-lg font-medium text-gray-900 mb-4">{stage.hiddenIntent}</p>
                    {stage.assessments && stage.assessments.length > 0 && (
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 not-prose">
                        <p className="text-sm font-medium text-blue-900 mb-2">They&apos;re assessing:</p>
                        <ul className="space-y-1">
                          {stage.assessments.map((assessment, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-blue-800">
                              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {assessment}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 italic">Content coming soon...</p>
                )}
              </div>
            </StageSection>

            {/* Section: How to Prepare */}
            <StageSection
              id={SECTION_IDS.howToPrepare}
              title={SECTION_TITLES[SECTION_IDS.howToPrepare]}
              icon={sectionIcons[SECTION_IDS.howToPrepare]}
              isViewed={sectionsViewed.includes(SECTION_IDS.howToPrepare)}
              onView={() => handleSectionView(SECTION_IDS.howToPrepare)}
            >
              {stage.howToPrepare && stage.howToPrepare.length > 0 ? (
                <ul className="space-y-3">
                  {stage.howToPrepare.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                        {i + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Content coming soon...</p>
              )}
            </StageSection>

            {/* Section: Example Transcript */}
            <StageSection
              id={SECTION_IDS.transcript}
              title={SECTION_TITLES[SECTION_IDS.transcript]}
              icon={sectionIcons[SECTION_IDS.transcript]}
              isViewed={sectionsViewed.includes(SECTION_IDS.transcript)}
              onView={() => handleSectionView(SECTION_IDS.transcript)}
            >
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <p className="text-gray-500">Excellence transcripts coming soon...</p>
                <p className="text-sm text-gray-400 mt-1">See what top candidates say in this stage</p>
              </div>
            </StageSection>

            {/* Section: Practice Questions */}
            <StageSection
              id={SECTION_IDS.practice}
              title={SECTION_TITLES[SECTION_IDS.practice]}
              icon={sectionIcons[SECTION_IDS.practice]}
              isViewed={sectionsViewed.includes(SECTION_IDS.practice)}
              onView={() => handleSectionView(SECTION_IDS.practice)}
            >
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-gray-500">Practice questions coming soon...</p>
                <p className="text-sm text-gray-400 mt-1">Stage-specific practice will appear here</p>
              </div>
            </StageSection>

            {/* Section: Common Mistakes */}
            <StageSection
              id={SECTION_IDS.mistakes}
              title={SECTION_TITLES[SECTION_IDS.mistakes]}
              icon={sectionIcons[SECTION_IDS.mistakes]}
              isViewed={sectionsViewed.includes(SECTION_IDS.mistakes)}
              onView={() => handleSectionView(SECTION_IDS.mistakes)}
            >
              {stage.commonMistakes && stage.commonMistakes.length > 0 ? (
                <ul className="space-y-3">
                  {stage.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-red-800">{mistake}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Content coming soon...</p>
              )}
            </StageSection>

            {/* Section: Checklist */}
            <StageSection
              id={SECTION_IDS.checklist}
              title={SECTION_TITLES[SECTION_IDS.checklist]}
              icon={sectionIcons[SECTION_IDS.checklist]}
              isViewed={sectionsViewed.includes(SECTION_IDS.checklist)}
              onView={() => handleSectionView(SECTION_IDS.checklist)}
            >
              {checklistItems.length > 0 ? (
                <StageChecklist items={checklistItems} onToggle={handleChecklistToggle} />
              ) : (
                <p className="text-gray-500 italic">Checklist coming soon...</p>
              )}
            </StageSection>

            {/* Mobile: Mark Complete Button */}
            {!isComplete && (
              <div className="lg:hidden pt-4">
                <button
                  onClick={handleMarkComplete}
                  disabled={!allChecklistComplete}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                    allChecklistComplete
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {allChecklistComplete ? 'Mark Stage Complete' : 'Complete checklist to finish'}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
