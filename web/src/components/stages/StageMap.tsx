'use client';

import { useState, useEffect, useCallback } from 'react';
import StageCard from './StageCard';
import AddStageModal from './AddStageModal';
import { InterviewStage, StageProgress, DEFAULT_STAGES } from '../../types';

const STORAGE_KEY = 'togtog_stage_progress';
const STAGE_ORDER_KEY = 'togtog_stage_order';
const CUSTOM_STAGES_KEY = 'togtog_custom_stages';

interface StoredProgress {
  stages: Record<string, StageProgress>;
  stageOrder: string[];
  customStages: InterviewStage[];
}

function getDefaultProgress(): StoredProgress {
  return {
    stages: {},
    stageOrder: DEFAULT_STAGES.map((s) => s.id),
    customStages: [],
  };
}

function loadProgress(): StoredProgress {
  if (typeof window === 'undefined') return getDefaultProgress();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return getDefaultProgress();
}

function saveProgress(progress: StoredProgress): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export default function StageMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState<StoredProgress>(getDefaultProgress());
  const [showAddModal, setShowAddModal] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadProgress();
    setProgress(stored);
    setIsLoaded(true);
  }, []);

  // Save to localStorage when progress changes
  useEffect(() => {
    if (isLoaded) {
      saveProgress(progress);
    }
  }, [progress, isLoaded]);

  // Get all stages in order
  const getAllStages = useCallback((): InterviewStage[] => {
    const defaultStagesMap = new Map(DEFAULT_STAGES.map((s) => [s.id, s]));
    const customStagesMap = new Map(progress.customStages.map((s) => [s.id, s]));

    // Build ordered list
    const orderedStages: InterviewStage[] = [];
    for (const id of progress.stageOrder) {
      const stage = defaultStagesMap.get(id) || customStagesMap.get(id);
      if (stage) {
        // Add checklist if missing
        const fullStage: InterviewStage = {
          ...stage,
          checklist: stage.checklist || [],
        };
        orderedStages.push(fullStage);
      }
    }

    // Add any stages not in order (shouldn't happen but safety)
    for (const stage of DEFAULT_STAGES) {
      if (!progress.stageOrder.includes(stage.id)) {
        orderedStages.push({ ...stage, checklist: stage.checklist || [] });
      }
    }

    return orderedStages;
  }, [progress.stageOrder, progress.customStages]);

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setProgress((prev) => {
      const newOrder = [...prev.stageOrder];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      return { ...prev, stageOrder: newOrder };
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= progress.stageOrder.length - 1) return;
    setProgress((prev) => {
      const newOrder = [...prev.stageOrder];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      return { ...prev, stageOrder: newOrder };
    });
  };

  const handleRemoveStage = (stageId: string) => {
    setProgress((prev) => ({
      ...prev,
      stageOrder: prev.stageOrder.filter((id) => id !== stageId),
      customStages: prev.customStages.filter((s) => s.id !== stageId),
      stages: Object.fromEntries(
        Object.entries(prev.stages).filter(([id]) => id !== stageId)
      ),
    }));
  };

  const handleAddStage = (stage: InterviewStage) => {
    setProgress((prev) => ({
      ...prev,
      stageOrder: [...prev.stageOrder, stage.id],
      customStages: [...prev.customStages, stage],
    }));
    setShowAddModal(false);
  };

  const stages = getAllStages();
  const customStageIds = new Set(progress.customStages.map((s) => s.id));

  // Calculate overall progress
  const totalStages = stages.length;
  const completedStages = Object.values(progress.stages).filter((p) => p.isComplete).length;
  const overallPercent = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

  if (!isLoaded) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with overall progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Interview Stages</h2>
          <span className="text-sm font-medium text-gray-600">
            {completedStages} of {totalStages} complete
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Stage Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage, index) => (
          <StageCard
            key={stage.id}
            stage={stage}
            progress={progress.stages[stage.id] || null}
            onMoveUp={() => handleMoveUp(index)}
            onMoveDown={() => handleMoveDown(index)}
            onRemove={() => handleRemoveStage(stage.id)}
            isFirst={index === 0}
            isLast={index === stages.length - 1}
            isCustom={customStageIds.has(stage.id)}
          />
        ))}

        {/* Add Stage Card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-600">Add Custom Stage</span>
          <span className="text-xs text-gray-500 mt-1">For unique interview rounds</span>
        </button>
      </div>

      {/* Add Stage Modal */}
      {showAddModal && (
        <AddStageModal
          onAdd={handleAddStage}
          onClose={() => setShowAddModal(false)}
          existingIds={new Set(stages.map((s) => s.id))}
        />
      )}
    </div>
  );
}
