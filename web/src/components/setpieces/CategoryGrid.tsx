'use client';

import { useState } from 'react';
import CategoryCard from './CategoryCard';
import { SET_PIECE_CATEGORIES, SetPieceCoverage, SetPiece } from '../../types/v3';

interface CategoryGridProps {
  setPieces: SetPiece[];
  showFilters?: boolean;
}

type FilterType = 'all' | 'has_story' | 'needs_story' | 'has_draft';

export default function CategoryGrid({ setPieces, showFilters = true }: CategoryGridProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  // Calculate coverage for each category
  const getCoverage = (categoryId: string): SetPieceCoverage => {
    const categoryPieces = setPieces.filter(sp => sp.category === categoryId);
    const hasDraft = categoryPieces.some(sp => sp.isDraft);
    const hasComplete = categoryPieces.some(sp => !sp.isDraft);

    return {
      category: categoryId as SetPieceCoverage['category'],
      hasSetPiece: categoryPieces.length > 0,
      setPieceCount: categoryPieces.length,
      isDraft: hasDraft && !hasComplete,
    };
  };

  // Calculate overall stats
  const stats = {
    total: SET_PIECE_CATEGORIES.length,
    covered: SET_PIECE_CATEGORIES.filter(c => {
      const pieces = setPieces.filter(sp => sp.category === c.id);
      return pieces.some(p => !p.isDraft);
    }).length,
    drafts: SET_PIECE_CATEGORIES.filter(c => {
      const pieces = setPieces.filter(sp => sp.category === c.id);
      return pieces.length > 0 && pieces.every(p => p.isDraft);
    }).length,
    empty: SET_PIECE_CATEGORIES.filter(c =>
      !setPieces.some(sp => sp.category === c.id)
    ).length,
  };

  // Filter categories
  const filteredCategories = SET_PIECE_CATEGORIES.filter(category => {
    const coverage = getCoverage(category.id);
    switch (filter) {
      case 'has_story':
        return coverage.setPieceCount > 0 && !coverage.isDraft;
      case 'needs_story':
        return coverage.setPieceCount === 0;
      case 'has_draft':
        return coverage.isDraft;
      default:
        return true;
    }
  });

  return (
    <div>
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Categories</p>
        </div>
        <div className="bg-white rounded-lg border border-green-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.covered}</p>
          <p className="text-sm text-gray-600">Complete</p>
        </div>
        <div className="bg-white rounded-lg border border-yellow-200 p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.drafts}</p>
          <p className="text-sm text-gray-600">Drafts Only</p>
        </div>
        <div className="bg-white rounded-lg border border-red-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{stats.empty}</p>
          <p className="text-sm text-gray-600">Need Stories</p>
        </div>
      </div>

      {/* Filter Buttons */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: 'all', label: 'All Categories' },
            { value: 'needs_story', label: 'Need Stories' },
            { value: 'has_draft', label: 'Has Drafts' },
            { value: 'has_story', label: 'Complete' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value as FilterType)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Category Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No categories match this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              coverage={getCoverage(category.id)}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Story Coverage</span>
          <span className="text-sm text-gray-600">
            {stats.covered} of {stats.total} categories covered
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${(stats.covered / stats.total) * 100}%` }}
          />
        </div>
        {stats.covered < stats.total && (
          <p className="text-xs text-gray-500 mt-2">
            Write {stats.total - stats.covered} more {stats.total - stats.covered === 1 ? 'story' : 'stories'} to have full category coverage.
          </p>
        )}
      </div>
    </div>
  );
}
