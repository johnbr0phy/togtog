'use client';

import { useState } from 'react';
import Link from 'next/link';
import QuestionCard from './QuestionCard';
import { Question } from '../lib/types';

interface QuestionsSectionProps {
  questions: Question[];
  companyName: string;
}

type FilterType = 'all' | 'behavioral' | 'technical' | 'case_study' | 'situational';

export default function QuestionsSection({ questions, companyName }: QuestionsSectionProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [showAll, setShowAll] = useState(false);

  const filteredQuestions = filter === 'all'
    ? questions
    : questions.filter(q => q.type === filter);

  const displayedQuestions = showAll ? filteredQuestions : filteredQuestions.slice(0, 5);

  const questionCounts = {
    all: questions.length,
    behavioral: questions.filter(q => q.type === 'behavioral').length,
    technical: questions.filter(q => q.type === 'technical' || q.type === 'multiple_choice').length,
    case_study: questions.filter(q => q.type === 'case_study').length,
    situational: questions.filter(q => q.type === 'situational' || q.type === 'culture_fit').length
  };

  return (
    <section id="questions" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Practice Interview Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Preview sample questions from our {companyName} interview prep module.
            Unlock full access to get complete answers and evaluation criteria.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { key: 'all', label: 'All Questions' },
            { key: 'behavioral', label: 'Behavioral' },
            { key: 'technical', label: 'Technical' },
            { key: 'case_study', label: 'Case Study' },
            { key: 'situational', label: 'Situational' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as FilterType)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {label} ({questionCounts[key as keyof typeof questionCounts]})
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {displayedQuestions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              showAnswer={!question.isPremiumAnswer}
            />
          ))}
        </div>

        {/* Show More / CTA */}
        {filteredQuestions.length > 5 && !showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Show More Questions ({filteredQuestions.length - 5} more)
            </button>
          </div>
        )}

        {/* Unlock CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Get Full Access to All Questions
          </h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Unlock 60+ practice questions with complete STAR-formatted answers,
            evaluation criteria, and expert tips for your {companyName} interview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/my-prep"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Your Prep
            </Link>
            <a
              href="#pricing"
              className="inline-block px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-900">60+</div>
            <div className="text-sm text-gray-600">Practice Questions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">STAR</div>
            <div className="text-sm text-gray-600">Formatted Answers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">Expert</div>
            <div className="text-sm text-gray-600">Evaluation Criteria</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">Company</div>
            <div className="text-sm text-gray-600">Specific Prep</div>
          </div>
        </div>
      </div>
    </section>
  );
}
