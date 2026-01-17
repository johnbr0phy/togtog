'use client';

import { useState } from 'react';
import { QuizContent } from '@/types/journey';

interface QuizBlockProps {
  content: QuizContent;
  blockId: string;
  onAnswer?: (optionId: string, isCorrect: boolean) => void;
  savedAnswer?: string;
}

export default function QuizBlock({ content, blockId, onAnswer, savedAnswer }: QuizBlockProps) {
  const [selectedId, setSelectedId] = useState<string | null>(savedAnswer || null);
  const [hasAnswered, setHasAnswered] = useState(!!savedAnswer);
  const [showHint, setShowHint] = useState(false);

  const selectedOption = content.options.find((o) => o.id === selectedId);
  const isCorrect = selectedOption?.isCorrect || false;

  const handleSelect = (optionId: string) => {
    if (hasAnswered) return; // Can't change answer after submitting

    setSelectedId(optionId);
    setHasAnswered(true);

    const option = content.options.find((o) => o.id === optionId);
    if (option && onAnswer) {
      onAnswer(optionId, option.isCorrect);
    }
  };

  return (
    <div className="quiz-block bg-white border border-gray-200 rounded-xl p-6 my-6">
      {/* Question */}
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
          ?
        </span>
        <h3 className="text-lg font-medium text-gray-900 pt-1">{content.question}</h3>
      </div>

      {/* Hint button */}
      {content.hint && !hasAnswered && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-sm text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          {showHint ? 'Hide hint' : 'Show hint'}
        </button>
      )}

      {/* Hint content */}
      {showHint && content.hint && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-yellow-800">
          {content.hint}
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {content.options.map((option) => {
          const isSelected = selectedId === option.id;
          const showResult = hasAnswered && isSelected;

          let borderColor = 'border-gray-200 hover:border-blue-300';
          let bgColor = 'bg-white';
          let textColor = 'text-gray-700';

          if (hasAnswered) {
            if (option.isCorrect) {
              borderColor = 'border-green-300';
              bgColor = 'bg-green-50';
              textColor = 'text-green-800';
            } else if (isSelected && !option.isCorrect) {
              borderColor = 'border-red-300';
              bgColor = 'bg-red-50';
              textColor = 'text-red-800';
            } else {
              borderColor = 'border-gray-200';
              bgColor = 'bg-gray-50';
              textColor = 'text-gray-500';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${borderColor} ${bgColor} ${
                !hasAnswered ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Radio indicator */}
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    hasAnswered && option.isCorrect
                      ? 'border-green-500 bg-green-500'
                      : hasAnswered && isSelected && !option.isCorrect
                        ? 'border-red-500 bg-red-500'
                        : isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                  }`}
                >
                  {hasAnswered && option.isCorrect && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {hasAnswered && isSelected && !option.isCorrect && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>

                <span className={`${textColor}`}>{option.text}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation (shown after answering) */}
      {hasAnswered && (
        <div
          className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <span className="text-green-600 font-medium">Correct!</span>
            ) : (
              <span className="text-blue-600 font-medium">Explanation:</span>
            )}
          </div>
          <p className={`mt-1 text-sm ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
            {content.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
