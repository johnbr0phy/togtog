'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExerciseContent } from '@/types/journey';

interface ExerciseBlockProps {
  content: ExerciseContent;
  blockId: string;
  onSave?: (text: string) => void;
  savedResponse?: string;
}

export default function ExerciseBlock({
  content,
  blockId,
  onSave,
  savedResponse,
}: ExerciseBlockProps) {
  const [text, setText] = useState(savedResponse || '');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`togtog-exercise-${content.persistKey}`);
    if (saved && !savedResponse) {
      setText(saved);
    }
  }, [content.persistKey, savedResponse]);

  // Auto-save after 2 seconds of inactivity
  const autoSave = useCallback(() => {
    if (text.trim()) {
      localStorage.setItem(`togtog-exercise-${content.persistKey}`, text);
      setLastSaved(new Date());
      if (onSave) {
        onSave(text);
      }
    }
  }, [text, content.persistKey, onSave]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text !== savedResponse) {
        autoSave();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [text, savedResponse, autoSave]);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const getWordCountColor = () => {
    if (!content.minWords) return 'text-gray-500';
    if (wordCount < content.minWords) return 'text-yellow-600';
    if (content.maxWords && wordCount > content.maxWords) return 'text-red-600';
    return 'text-green-600';
  };

  const getProgressWidth = () => {
    if (!content.minWords) return 0;
    const progress = Math.min((wordCount / content.minWords) * 100, 100);
    return progress;
  };

  return (
    <div className="exercise-block bg-white border border-gray-200 rounded-xl p-6 my-6">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </span>
        <div>
          <h3 className="font-medium text-gray-900">Writing Exercise</h3>
          <p className="text-sm text-gray-600 mt-1">{content.prompt}</p>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={content.placeholder || 'Start writing...'}
        className="w-full min-h-[200px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y text-gray-700"
      />

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        {/* Word count */}
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${getWordCountColor()}`}>
            {wordCount} words
            {content.minWords && ` / ${content.minWords} min`}
            {content.maxWords && ` / ${content.maxWords} max`}
          </span>

          {content.minWords && (
            <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  wordCount >= content.minWords ? 'bg-green-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${getProgressWidth()}%` }}
              />
            </div>
          )}
        </div>

        {/* Save status */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          {isSaving ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </>
          ) : lastSaved ? (
            <>
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Auto-saved
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
