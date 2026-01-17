'use client';

import Link from 'next/link';
import { InterviewStage, StageProgress, StageStatus } from '../../types';

interface StageCardProps {
  stage: InterviewStage;
  progress: StageProgress | null;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  isCustom?: boolean;
}

const statusColors: Record<StageStatus, { bg: string; text: string; border: string }> = {
  not_started: {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    border: 'border-gray-200',
  },
  in_progress: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  complete: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
};

const statusLabels: Record<StageStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  complete: 'Complete',
};

function getStatus(progress: StageProgress | null): StageStatus {
  if (!progress) return 'not_started';
  if (progress.isComplete) return 'complete';
  if (progress.percentComplete > 0) return 'in_progress';
  return 'not_started';
}

export default function StageCard({
  stage,
  progress,
  onMoveUp,
  onMoveDown,
  onRemove,
  isFirst = false,
  isLast = false,
  isCustom = false,
}: StageCardProps) {
  const status = getStatus(progress);
  const colors = statusColors[status];
  const percentComplete = progress?.percentComplete ?? 0;

  return (
    <div
      className={`relative rounded-lg border-2 ${colors.border} ${colors.bg} overflow-hidden transition-all hover:shadow-md`}
    >
      {/* Reorder Controls */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        {!isFirst && onMoveUp && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onMoveUp();
            }}
            className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700"
            aria-label="Move up"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
        {!isLast && onMoveDown && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onMoveDown();
            }}
            className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700"
            aria-label="Move down"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
        {isCustom && onRemove && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (confirm('Remove this stage from your prep?')) {
                onRemove();
              }
            }}
            className="p-1 rounded hover:bg-red-100 text-gray-500 hover:text-red-600"
            aria-label="Remove stage"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <Link href={`/stages/${stage.slug}`} className="block p-5">
        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.text} ${
              status === 'complete'
                ? 'bg-green-100'
                : status === 'in_progress'
                ? 'bg-blue-100'
                : 'bg-gray-100'
            }`}
          >
            {status === 'complete' && (
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {statusLabels[status]}
          </span>
          {isCustom && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-700">
              Custom
            </span>
          )}
        </div>

        {/* Stage Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{stage.name}</h3>

        {/* Format & Duration */}
        <p className="text-sm text-gray-600 mb-3">{stage.format}</p>

        {/* What They're Assessing */}
        {stage.assessments && stage.assessments.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              What they&apos;re assessing
            </p>
            <p className="text-sm text-gray-700">{stage.assessments.slice(0, 2).join(', ')}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-500">Prep progress</span>
            <span className={`font-medium ${colors.text}`}>{percentComplete}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                status === 'complete'
                  ? 'bg-green-500'
                  : status === 'in_progress'
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              }`}
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Time Estimate */}
        <div className="mt-3 flex items-center text-xs text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{stage.duration} interview</span>
        </div>
      </Link>
    </div>
  );
}
