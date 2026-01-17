'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCompanyBySlug, CompanyConfig } from '../../../data/companies';
import { StageProgress } from '../../../types/v3';

interface CompanyPrepClientProps {
  companySlug: string;
}

export default function CompanyPrepClient({ companySlug }: CompanyPrepClientProps) {
  const [company, setCompany] = useState<CompanyConfig | null>(null);
  const [stageProgress, setStageProgress] = useState<Record<string, StageProgress>>({});

  useEffect(() => {
    const comp = getCompanyBySlug(companySlug);
    setCompany(comp);

    // Load progress from localStorage
    const saved = localStorage.getItem(`togtog-progress-${companySlug}`);
    if (saved) {
      setStageProgress(JSON.parse(saved));
    }
  }, [companySlug]);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Company not found</p>
          <Link href="/my-prep" className="text-blue-600 hover:text-blue-700">
            Back to company selection
          </Link>
        </div>
      </div>
    );
  }

  const getStageStatus = (stageId: string) => {
    const progress = stageProgress[stageId];
    if (!progress) return 'not_started';
    if (progress.isComplete) return 'complete';
    if (progress.sectionsViewed.length > 0 || progress.checklistCompleted.length > 0) {
      return 'in_progress';
    }
    return 'not_started';
  };

  const completedStages = company.stages.filter(s => getStageStatus(s.id) === 'complete').length;
  const progressPercent = Math.round((completedStages / company.stages.length) * 100);

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
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: company.color }}
            >
              {company.name[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-sm text-gray-500">{company.role}</p>
            </div>
          </div>
          <Link
            href={`/my-prep/${companySlug}/set-pieces`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Set Pieces
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div
          className="rounded-xl p-6 mb-8 text-white"
          style={{ backgroundColor: company.color }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Your Interview Prep</h2>
              <p className="text-white/80">{company.interviewProcess}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{progressPercent}%</div>
              <div className="text-sm text-white/80">Complete</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Stages */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Stages</h3>
            <div className="space-y-4">
              {company.stages.map((stage, index) => {
                const status = getStageStatus(stage.id);
                return (
                  <Link
                    key={stage.id}
                    href={`/my-prep/${companySlug}/stages/${stage.slug}`}
                    className="block bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Stage Number/Status */}
                      <div className="flex-shrink-0">
                        {status === 'complete' ? (
                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : status === 'in_progress' ? (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                            style={{ backgroundColor: company.color }}
                          >
                            {index + 1}
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-medium">
                            {index + 1}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">
                            {stage.name}
                          </h4>
                          {status === 'in_progress' && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{stage.format}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">{stage.overview.slice(0, 150)}...</p>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Principles */}
            {company.keyPrinciples && company.keyPrinciples.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {company.name === 'Amazon' ? 'Leadership Principles' :
                   company.name === 'McKinsey' ? 'PEI Dimensions' : 'Key Values'}
                </h3>
                <div className="space-y-2">
                  {company.keyPrinciples.slice(0, 5).map((principle) => (
                    <div key={principle.id} className="text-sm">
                      <div className="font-medium text-gray-900">{principle.name}</div>
                      <div className="text-gray-500 text-xs line-clamp-1">{principle.description}</div>
                    </div>
                  ))}
                  {company.keyPrinciples.length > 5 && (
                    <button className="text-sm text-blue-600 hover:text-blue-700 mt-2">
                      View all {company.keyPrinciples.length} principles
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Top Tips for {company.name}</h3>
              <ul className="space-y-3">
                {company.tips.map((tip, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href={`/my-prep/${companySlug}/set-pieces`}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
                >
                  <span>Your Set Pieces</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href={`/prep/${companySlug}`}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
                >
                  <span>Company Overview</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
