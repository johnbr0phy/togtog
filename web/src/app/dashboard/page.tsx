'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { sampleQuestions } from '@/data/questions';
import { Question } from '@/lib/types';

type FilterType = 'all' | 'behavioral' | 'technical' | 'case_study' | 'situational' | 'culture_fit';
type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
type CompanyFilter = 'all' | 'google' | 'amazon' | 'mckinsey';

export default function DashboardPage() {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>('all');
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedQuestions');
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('completedQuestions', JSON.stringify([...completedQuestions]));
  }, [completedQuestions]);

  const toggleComplete = (questionId: string) => {
    setCompletedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const toggleExpanded = (questionId: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  // Filter questions
  const filteredQuestions = sampleQuestions.filter(q => {
    if (typeFilter !== 'all') {
      if (typeFilter === 'technical' && q.type !== 'technical' && q.type !== 'multiple_choice') return false;
      if (typeFilter === 'situational' && q.type !== 'situational' && q.type !== 'culture_fit') return false;
      if (typeFilter !== 'technical' && typeFilter !== 'situational' && q.type !== typeFilter) return false;
    }
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
    if (companyFilter !== 'all') {
      const companyTag = `company:${companyFilter}`;
      if (!q.companies.includes(companyTag) && !q.companies.includes('all')) return false;
    }
    return true;
  });

  const completedCount = filteredQuestions.filter(q => completedQuestions.has(q.id)).length;
  const progressPercent = filteredQuestions.length > 0
    ? Math.round((completedCount / filteredQuestions.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            InterviewPrep
          </Link>
          <div className="text-sm text-gray-500">
            Premium Access
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
              <p className="text-gray-600">Practice and track your progress</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{progressPercent}%</div>
              <div className="text-sm text-gray-500">{completedCount} of {filteredQuestions.length} complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as FilterType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="behavioral">Behavioral</option>
                <option value="technical">Technical</option>
                <option value="case_study">Case Study</option>
                <option value="situational">Situational</option>
                <option value="culture_fit">Culture Fit</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Company Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value as CompanyFilter)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Companies</option>
                <option value="google">Google</option>
                <option value="amazon">Amazon</option>
                <option value="mckinsey">McKinsey</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question, index) => (
            <QuestionCardFull
              key={question.id}
              question={question}
              index={index}
              isComplete={completedQuestions.has(question.id)}
              isExpanded={expandedQuestions.has(question.id)}
              onToggleComplete={() => toggleComplete(question.id)}
              onToggleExpanded={() => toggleExpanded(question.id)}
            />
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No questions match your filters. Try adjusting them.
          </div>
        )}
      </main>
    </div>
  );
}

// Full question card component (no blur)
interface QuestionCardFullProps {
  question: Question;
  index: number;
  isComplete: boolean;
  isExpanded: boolean;
  onToggleComplete: () => void;
  onToggleExpanded: () => void;
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

function QuestionCardFull({
  question,
  index,
  isComplete,
  isExpanded,
  onToggleComplete,
  onToggleExpanded
}: QuestionCardFullProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border ${isComplete ? 'border-green-300 bg-green-50/30' : 'border-gray-200'} overflow-hidden`}>
      {/* Question Header */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Completion Checkbox */}
          <button
            onClick={onToggleComplete}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              isComplete
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {isComplete && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[question.type]}`}>
                {typeLabels[question.type]}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[question.difficulty]}`}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </span>
              {question.estimatedTimeMinutes && (
                <span className="text-xs text-gray-500">~{question.estimatedTimeMinutes} min</span>
              )}
            </div>

            <h3 className={`text-lg font-semibold mb-2 ${isComplete ? 'text-gray-600' : 'text-gray-900'}`}>
              {question.questionText}
            </h3>

            {question.context && (
              <p className="text-sm text-gray-600 mb-3">{question.context}</p>
            )}

            {/* Multiple Choice Options */}
            {question.type === 'multiple_choice' && question.options && (
              <div className="space-y-2 mb-4">
                {question.options.map((option, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      i === question.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-700 mr-2">{String.fromCharCode(65 + i)}.</span>
                    <span className="text-gray-800">{option}</span>
                    {i === question.correctAnswer && (
                      <span className="ml-2 text-green-600 text-sm font-medium">(Correct)</span>
                    )}
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
          </div>
        </div>
      </div>

      {/* Answer Section */}
      <div className="border-t border-gray-200">
        <button
          onClick={onToggleExpanded}
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
          <div className="px-6 pb-6 space-y-4">
            {/* Explanation (for multiple choice) */}
            {question.explanation && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Explanation</h4>
                <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">{question.explanation}</p>
              </div>
            )}

            {/* Sample Answer */}
            {question.sampleAnswer && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Sample Answer</h4>
                <div className="text-gray-800 bg-gray-50 p-4 rounded-lg whitespace-pre-line">
                  {question.sampleAnswer}
                </div>
              </div>
            )}

            {/* Evaluation Criteria */}
            {question.evaluationCriteria && question.evaluationCriteria.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Evaluation Criteria</h4>
                <ul className="space-y-2">
                  {question.evaluationCriteria.map((criterion, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag, i) => (
                  <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    #{tag.split(':')[1] || tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
