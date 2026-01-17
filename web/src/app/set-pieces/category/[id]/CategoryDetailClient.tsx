'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SET_PIECE_CATEGORIES, SetPiece, SetPieceCategoryInfo } from '../../../../types/v3';
import { SetPieceCard } from '../../../../components/setpieces';

interface CategoryDetailClientProps {
  categoryId: string;
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

export default function CategoryDetailClient({ categoryId }: CategoryDetailClientProps) {
  const [category, setCategory] = useState<SetPieceCategoryInfo | null>(null);
  const [setPieces, setSetPieces] = useState<SetPiece[]>([]);
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Find category
    const cat = SET_PIECE_CATEGORIES.find(c => c.id === categoryId);
    if (cat) setCategory(cat);

    // Load set pieces from localStorage
    const saved = localStorage.getItem('togtog-setpieces');
    if (saved) {
      const allPieces: SetPiece[] = JSON.parse(saved);
      setSetPieces(allPieces.filter(sp => sp.category === categoryId));
    }
  }, [categoryId]);

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Category not found</p>
      </div>
    );
  }

  const icon = categoryIcons[category.id] || '📝';
  const hasPieces = setPieces.length > 0;
  const hasCompletePieces = setPieces.some(sp => !sp.isDraft);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/set-pieces" className="text-gray-700 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="text-2xl">{icon}</span>
          <h1 className="text-xl font-bold text-gray-900">{category.name}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Description */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-700">{category.description}</p>

          {/* Status Badge */}
          <div className="mt-4 flex items-center gap-3">
            {!hasPieces && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                No story written yet
              </span>
            )}
            {hasPieces && !hasCompletePieces && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Draft only
              </span>
            )}
            {hasCompletePieces && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {setPieces.filter(sp => !sp.isDraft).length} complete {setPieces.filter(sp => !sp.isDraft).length === 1 ? 'story' : 'stories'}
              </span>
            )}
          </div>
        </div>

        {/* Your Stories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Stories</h2>
            <Link
              href={`/set-pieces/new?category=${category.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Story
            </Link>
          </div>

          {setPieces.length === 0 ? (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <div className="text-4xl mb-3">{icon}</div>
              <h3 className="font-medium text-gray-900 mb-2">No stories yet</h3>
              <p className="text-sm text-gray-600 mb-4">
                Write your first {category.name.toLowerCase()} story to be prepared for these questions.
              </p>
              <Link
                href={`/set-pieces/new?category=${category.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Write Your Story
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {setPieces.map(piece => (
                <SetPieceCard
                  key={piece.id}
                  piece={piece}
                  onDelete={(id) => {
                    const saved = localStorage.getItem('togtog-setpieces');
                    if (saved) {
                      const pieces: SetPiece[] = JSON.parse(saved);
                      const updated = pieces.filter(p => p.id !== id);
                      localStorage.setItem('togtog-setpieces', JSON.stringify(updated));
                      setSetPieces(updated.filter(sp => sp.category === categoryId));
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Questions This Answers */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Questions This Answers</h2>
          <div className="space-y-3">
            {category.exampleQuestions.map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedQuestions.has(index) ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedQuestions.has(index) && (
                  <div className="px-4 pb-4 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-3">
                      Use your {category.name.toLowerCase()} story to answer this question.
                      Adapt the framing to match what they're specifically asking about.
                    </p>
                    <Link
                      href={`/practice?question=${encodeURIComponent(question)}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Practice this question →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Framework */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Recommended Framework</h2>
          <p className="text-blue-800">{category.framework}</p>
        </div>
      </main>
    </div>
  );
}
