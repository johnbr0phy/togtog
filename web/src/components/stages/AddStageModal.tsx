'use client';

import { useState } from 'react';
import { InterviewStage } from '../../types';

interface AddStageModalProps {
  onAdd: (stage: InterviewStage) => void;
  onClose: () => void;
  existingIds: Set<string>;
}

// Common stage templates users might want to add
const STAGE_TEMPLATES: Partial<InterviewStage>[] = [
  {
    name: 'Recruiter Screen',
    format: '15-30 min phone call',
    duration: '15-30 minutes',
    whoYouMeet: 'Recruiter',
    assessments: ['Basic qualifications', 'Salary expectations', 'Timeline'],
  },
  {
    name: 'Hiring Manager Interview',
    format: '45-60 min video call',
    duration: '45-60 minutes',
    whoYouMeet: 'Hiring Manager',
    assessments: ['Role fit', 'Team fit', 'Experience relevance'],
  },
  {
    name: 'System Design',
    format: '45-60 min whiteboard/screen share',
    duration: '45-60 minutes',
    whoYouMeet: 'Senior Engineer or Architect',
    assessments: ['Architecture skills', 'Trade-off analysis', 'Scalability thinking'],
  },
  {
    name: 'Coding Interview',
    format: '45-60 min live coding',
    duration: '45-60 minutes',
    whoYouMeet: 'Engineer',
    assessments: ['Coding ability', 'Problem solving', 'Communication'],
  },
  {
    name: 'Culture Fit / Values',
    format: '30-45 min conversation',
    duration: '30-45 minutes',
    whoYouMeet: 'HR or Team Member',
    assessments: ['Company values alignment', 'Work style', 'Collaboration'],
  },
  {
    name: 'Team Panel',
    format: '60-90 min with multiple interviewers',
    duration: '60-90 minutes',
    whoYouMeet: 'Multiple Team Members',
    assessments: ['Team dynamics', 'Cross-functional skills', 'Communication'],
  },
  {
    name: 'Executive Interview',
    format: '30-45 min with senior leader',
    duration: '30-45 minutes',
    whoYouMeet: 'VP or Director',
    assessments: ['Strategic thinking', 'Leadership potential', 'Vision alignment'],
  },
  {
    name: 'Take-Home Assignment',
    format: 'Self-paced project',
    duration: '2-8 hours',
    whoYouMeet: 'Review with Engineer',
    assessments: ['Code quality', 'Problem approach', 'Documentation'],
  },
];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AddStageModal({ onAdd, onClose, existingIds }: AddStageModalProps) {
  const [mode, setMode] = useState<'template' | 'custom'>('template');
  const [customName, setCustomName] = useState('');
  const [customFormat, setCustomFormat] = useState('');
  const [customDuration, setCustomDuration] = useState('');
  const [customWho, setCustomWho] = useState('');
  const [error, setError] = useState('');

  const handleAddTemplate = (template: Partial<InterviewStage>) => {
    const slug = generateSlug(template.name!);
    const id = `custom-${slug}-${Date.now()}`;

    if (existingIds.has(id)) {
      setError('A stage with this name already exists');
      return;
    }

    const stage: InterviewStage = {
      id,
      name: template.name!,
      slug,
      format: template.format!,
      duration: template.duration!,
      whoYouMeet: template.whoYouMeet!,
      order: 999, // Will be placed at end
      overview: '',
      hiddenIntent: '',
      assessments: template.assessments || [],
      howToPrepare: [],
      commonMistakes: [],
      checklist: [],
    };

    onAdd(stage);
  };

  const handleAddCustom = () => {
    if (!customName.trim()) {
      setError('Please enter a stage name');
      return;
    }

    const slug = generateSlug(customName);
    const id = `custom-${slug}-${Date.now()}`;

    const stage: InterviewStage = {
      id,
      name: customName.trim(),
      slug,
      format: customFormat.trim() || 'Interview',
      duration: customDuration.trim() || '30-60 minutes',
      whoYouMeet: customWho.trim() || 'Interviewer',
      order: 999,
      overview: '',
      hiddenIntent: '',
      assessments: [],
      howToPrepare: [],
      commonMistakes: [],
      checklist: [],
    };

    onAdd(stage);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add Interview Stage</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setMode('template')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                mode === 'template'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Choose Template
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                mode === 'custom'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Custom
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {mode === 'template' ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {STAGE_TEMPLATES.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddTemplate(template)}
                    className="text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{template.format}</p>
                    <p className="text-xs text-gray-500">{template.whoYouMeet}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stage Name *
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => {
                      setCustomName(e.target.value);
                      setError('');
                    }}
                    placeholder="e.g., Product Demo Presentation"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Format
                  </label>
                  <input
                    type="text"
                    value={customFormat}
                    onChange={(e) => setCustomFormat(e.target.value)}
                    placeholder="e.g., 30 min presentation + Q&A"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    placeholder="e.g., 45-60 minutes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Who You&apos;ll Meet
                  </label>
                  <input
                    type="text"
                    value={customWho}
                    onChange={(e) => setCustomWho(e.target.value)}
                    placeholder="e.g., Product Team"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleAddCustom}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Stage
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
