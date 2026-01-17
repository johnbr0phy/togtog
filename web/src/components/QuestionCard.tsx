'use client';

import { useState } from 'react';
import { Question } from '../lib/types';
import IntentLabel from './IntentLabel';

interface QuestionCardProps {
  question: Question;
  index: number;
  showAnswer?: boolean;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

const typeLabels: Record<string, string> = {
  behavioral: 'Behavioral',
  technical: 'Technical',
  case_study: 'Case Study',
  situational: 'Situational',
  culture_fit: 'Culture Fit',
  multiple_choice: 'Multiple Choice'
};

const typeColors: Record<string, string> = {
  behavioral: 'bg-blue-100 text-blue-800',
  technical: 'bg-purple-100 text-purple-800',
  case_study: 'bg-indigo-100 text-indigo-800',
  situational: 'bg-orange-100 text-orange-800',
  culture_fit: 'bg-pink-100 text-pink-800',
  multiple_choice: 'bg-gray-100 text-gray-800'
};

export default function QuestionCard({ question, index, showAnswer = false }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Question Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[question.type]}`}>
              {typeLabels[question.type]}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[question.difficulty]}`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </span>
            {question.estimatedTimeMinutes && (
              <span className="text-xs text-gray-500">
                ~{question.estimatedTimeMinutes} min
              </span>
            )}
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {question.questionText}
        </h3>

        {/* Context */}
        {question.context && (
          <p className="text-sm text-gray-600 mb-4">
            {question.context}
          </p>
        )}

        {/* Intent Label */}
        {question.intent && (
          <div className="mb-4">
            <IntentLabel intent={question.intent} />
          </div>
        )}

        {/* Multiple Choice Options */}
        {question.type === 'multiple_choice' && question.options && (
          <div className="space-y-2 mb-4">
            {question.options.map((option, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border ${
                  showAnswer && i === question.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <span className="font-medium text-gray-700 mr-2">{String.fromCharCode(65 + i)}.</span>
                <span className="text-gray-800">{option}</span>
              </div>
            ))}
          </div>
        )}

        {/* Case Study Key Areas */}
        {question.type === 'case_study' && question.keyAreas && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Key Areas to Cover:</p>
            <div className="flex flex-wrap gap-2">
              {question.keyAreas.map((area, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Framework Hint */}
        {question.frameworkHint && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Hint:</span> {question.frameworkHint}
            </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {question.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-xs text-gray-500">
              #{tag.split(':')[1] || tag}
            </span>
          ))}
        </div>
      </div>

      {/* Answer Section */}
      <div className="border-t border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-700">
            {isExpanded ? 'Hide Answer' : 'Show Answer'}
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <div className="px-6 pb-6">
            {/* Free answer (no blur) */}
            {!question.isPremiumAnswer ? (
              <div>
                {question.explanation && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Explanation:</p>
                    <p className="text-gray-800">{question.explanation}</p>
                  </div>
                )}
                {question.sampleAnswer && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Sample Answer:</p>
                    <p className="text-gray-800 whitespace-pre-line">{question.sampleAnswer}</p>
                  </div>
                )}
              </div>
            ) : (
              /* Premium answer (blurred) */
              <div className="relative">
                {/* Blurred preview */}
                <div className="filter blur-sm select-none pointer-events-none">
                  {question.sampleAnswer && (
                    <div className="text-gray-800 whitespace-pre-line">
                      {question.sampleAnswer.slice(0, 300)}...
                    </div>
                  )}
                  {question.evaluationCriteria && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Evaluation Criteria:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        {question.evaluationCriteria.slice(0, 2).map((criterion, i) => (
                          <li key={i}>{criterion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Overlay CTA */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                  <div className="text-center p-6 max-w-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Unlock Full Answer
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Get the complete STAR-formatted answer, evaluation criteria, and expert tips.
                    </p>
                    <a
                      href="#pricing"
                      className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Get Full Access
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
