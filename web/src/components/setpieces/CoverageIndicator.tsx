'use client';

import Link from 'next/link';
import { SetPiece, SET_PIECE_CATEGORIES } from '../../types/v3';

interface CoverageIndicatorProps {
  setPieces: SetPiece[];
  compact?: boolean;
}

const categoryIcons: Record<string, string> = {
  leadership: '👑',
  teamwork: '🤝',
  challenges: '⛰️',
  technical: '⚙️',
  conflict: '🔀',
  achievement: '🏆',
  growth: '🌱',
};

export default function CoverageIndicator({ setPieces, compact = false }: CoverageIndicatorProps) {
  const getCategoryStatus = (categoryId: string) => {
    const pieces = setPieces.filter(sp => sp.category === categoryId);
    if (pieces.length === 0) return 'empty';
    if (pieces.every(p => p.isDraft)) return 'draft';
    return 'complete';
  };

  const stats = SET_PIECE_CATEGORIES.reduce(
    (acc, cat) => {
      const status = getCategoryStatus(cat.id);
      acc[status]++;
      return acc;
    },
    { empty: 0, draft: 0, complete: 0 }
  );

  const percentage = Math.round((stats.complete / SET_PIECE_CATEGORIES.length) * 100);

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex -space-x-1">
          {SET_PIECE_CATEGORIES.slice(0, 5).map(cat => {
            const status = getCategoryStatus(cat.id);
            return (
              <div
                key={cat.id}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-white ${
                  status === 'complete'
                    ? 'bg-green-100'
                    : status === 'draft'
                    ? 'bg-yellow-100'
                    : 'bg-gray-100'
                }`}
                title={`${cat.name}: ${status}`}
              >
                {categoryIcons[cat.id]}
              </div>
            );
          })}
          {SET_PIECE_CATEGORIES.length > 5 && (
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
              +{SET_PIECE_CATEGORIES.length - 5}
            </div>
          )}
        </div>
        <span className="text-sm text-gray-600">
          {stats.complete}/{SET_PIECE_CATEGORIES.length} complete
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Set Piece Coverage</h3>
        <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
      </div>

      {/* Category Icons Grid */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {SET_PIECE_CATEGORIES.map(cat => {
          const status = getCategoryStatus(cat.id);
          return (
            <Link
              key={cat.id}
              href={`/set-pieces/category/${cat.id}`}
              className={`relative aspect-square rounded-lg flex items-center justify-center text-xl transition-transform hover:scale-110 ${
                status === 'complete'
                  ? 'bg-green-100 border-2 border-green-300'
                  : status === 'draft'
                  ? 'bg-yellow-100 border-2 border-yellow-300'
                  : 'bg-gray-100 border-2 border-gray-200'
              }`}
              title={cat.name}
            >
              {categoryIcons[cat.id]}
              {status === 'complete' && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {status === 'draft' && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-100 border border-green-300 rounded" />
          Complete ({stats.complete})
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded" />
          Draft ({stats.draft})
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-gray-100 border border-gray-200 rounded" />
          Empty ({stats.empty})
        </span>
      </div>

      {/* CTA if incomplete */}
      {stats.empty > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            You're missing stories in {stats.empty} {stats.empty === 1 ? 'category' : 'categories'}.
            Having at least one story in each category ensures you're prepared for any question.
          </p>
          <Link
            href="/set-pieces"
            className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Complete Your Set Pieces
          </Link>
        </div>
      )}
    </div>
  );
}
