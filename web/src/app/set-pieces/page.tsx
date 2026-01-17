'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CategoryGrid } from '../../components/setpieces';
import { SetPiece } from '../../types/v3';

export default function SetPiecesPage() {
  const [setPieces, setSetPieces] = useState<SetPiece[]>([]);

  useEffect(() => {
    // Load set pieces from localStorage
    const saved = localStorage.getItem('togtog-setpieces');
    if (saved) {
      setSetPieces(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/my-prep" className="text-gray-700 hover:text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Set Pieces</h1>
          </div>
          <Link
            href="/set-pieces/new"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Write New Story
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Intro Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Your Power Stories</h2>
          <p className="text-blue-100 mb-4">
            Set pieces are pre-prepared stories that showcase your best work. Each category represents
            a type of question you'll face in interviews. Having at least one polished story in each
            category means you're ready for any behavioral question.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
              <span>📝</span>
              <span>Write once, use everywhere</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
              <span>🎯</span>
              <span>STAR format guidance</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
              <span>🔄</span>
              <span>Adapt to any question</span>
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <CategoryGrid setPieces={setPieces} showFilters={true} />

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Tips for Great Set Pieces</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-green-500 mt-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <p className="font-medium text-gray-900">Be specific</p>
                <p className="text-sm text-gray-600">Use real numbers, dates, and names to make your story credible.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-green-500 mt-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <p className="font-medium text-gray-900">Focus on YOUR actions</p>
                <p className="text-sm text-gray-600">Use "I" not "we" when describing what you personally did.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-green-500 mt-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <p className="font-medium text-gray-900">Quantify results</p>
                <p className="text-sm text-gray-600">Percentages, time saved, revenue impact—make outcomes concrete.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-green-500 mt-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <p className="font-medium text-gray-900">Practice out loud</p>
                <p className="text-sm text-gray-600">Aim for 2-3 minutes when speaking—not reading.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
