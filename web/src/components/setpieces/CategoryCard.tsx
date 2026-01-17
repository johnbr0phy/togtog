'use client';

import Link from 'next/link';
import { SetPieceCategoryInfo, SetPieceCoverage } from '../../types/v3';

interface CategoryCardProps {
  category: SetPieceCategoryInfo;
  coverage?: SetPieceCoverage;
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

export default function CategoryCard({ category, coverage, compact = false }: CategoryCardProps) {
  const icon = categoryIcons[category.id] || '📝';

  const getCoverageStatus = () => {
    if (!coverage) return null;
    if (coverage.setPieceCount === 0) return { label: 'No story yet', color: 'text-red-600 bg-red-50' };
    if (coverage.isDraft) return { label: 'Draft only', color: 'text-yellow-600 bg-yellow-50' };
    return { label: `${coverage.setPieceCount} ${coverage.setPieceCount === 1 ? 'story' : 'stories'}`, color: 'text-green-600 bg-green-50' };
  };

  const status = getCoverageStatus();

  if (compact) {
    return (
      <Link
        href={`/set-pieces/category/${category.id}`}
        className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group"
      >
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 truncate">
            {category.name}
          </h4>
          {status && (
            <span className={`text-xs px-1.5 py-0.5 rounded ${status.color}`}>
              {status.label}
            </span>
          )}
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{icon}</span>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
          </div>
        </div>

        {status && (
          <div className="mt-3">
            <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>
        )}
      </div>

      {/* Example Questions */}
      <div className="p-5 bg-gray-50">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Questions this answers:
        </p>
        <ul className="space-y-2">
          {category.exampleQuestions.slice(0, 3).map((q, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span className="line-clamp-2">{q}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 mt-2">
          +{category.exampleQuestions.length - 3} more questions
        </p>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200 flex gap-3">
        <Link
          href={`/set-pieces/category/${category.id}`}
          className="flex-1 text-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          View Details
        </Link>
        <Link
          href={`/set-pieces/new?category=${category.id}`}
          className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Write Story
        </Link>
      </div>
    </div>
  );
}
