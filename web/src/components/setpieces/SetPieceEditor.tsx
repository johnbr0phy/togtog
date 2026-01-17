'use client';

import { useState, useEffect, useCallback } from 'react';
import { SetPiece, SetPieceCategory, SET_PIECE_CATEGORIES } from '../../types/v3';

interface SetPieceEditorProps {
  initialPiece?: SetPiece;
  initialCategory?: SetPieceCategory;
  onSave: (piece: SetPiece) => void;
  onCancel: () => void;
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

const WORD_COUNT_TARGETS = {
  situation: { min: 30, ideal: 50, max: 80 },
  task: { min: 20, ideal: 40, max: 60 },
  action: { min: 80, ideal: 150, max: 200 },
  result: { min: 30, ideal: 60, max: 100 },
};

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function getWordCountStatus(count: number, target: typeof WORD_COUNT_TARGETS.situation): 'low' | 'good' | 'high' {
  if (count < target.min) return 'low';
  if (count > target.max) return 'high';
  return 'good';
}

export default function SetPieceEditor({ initialPiece, initialCategory, onSave, onCancel }: SetPieceEditorProps) {
  const [title, setTitle] = useState(initialPiece?.title || '');
  const [category, setCategory] = useState<SetPieceCategory>(initialPiece?.category || initialCategory || 'leadership');
  const [situation, setSituation] = useState(initialPiece?.situation || '');
  const [task, setTask] = useState(initialPiece?.task || '');
  const [action, setAction] = useState(initialPiece?.action || '');
  const [result, setResult] = useState(initialPiece?.result || '');
  const [isDraft, setIsDraft] = useState(initialPiece?.isDraft ?? true);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

  // Calculate word counts
  const wordCounts = {
    situation: countWords(situation),
    task: countWords(task),
    action: countWords(action),
    result: countWords(result),
  };
  const totalWordCount = wordCounts.situation + wordCounts.task + wordCounts.action + wordCounts.result;

  // Auto-save to localStorage
  const autoSave = useCallback(() => {
    if (!title) return;
    setAutoSaveStatus('saving');
    const draft: SetPiece = {
      id: initialPiece?.id || `sp-${Date.now()}`,
      category,
      title,
      situation,
      task,
      action,
      result,
      wordCount: totalWordCount,
      createdAt: initialPiece?.createdAt || new Date().toISOString(),
      lastEditedAt: new Date().toISOString(),
      isDraft: true,
    };
    localStorage.setItem(`togtog-setpiece-draft-${draft.id}`, JSON.stringify(draft));
    setTimeout(() => setAutoSaveStatus('saved'), 500);
  }, [title, category, situation, task, action, result, totalWordCount, initialPiece]);

  useEffect(() => {
    const timer = setTimeout(autoSave, 2000);
    setAutoSaveStatus('unsaved');
    return () => clearTimeout(timer);
  }, [title, category, situation, task, action, result, autoSave]);

  const handleSave = (asDraft: boolean) => {
    const piece: SetPiece = {
      id: initialPiece?.id || `sp-${Date.now()}`,
      category,
      title: title || 'Untitled Story',
      situation,
      task,
      action,
      result,
      wordCount: totalWordCount,
      createdAt: initialPiece?.createdAt || new Date().toISOString(),
      lastEditedAt: new Date().toISOString(),
      isDraft: asDraft,
    };
    onSave(piece);
  };

  const selectedCategoryInfo = SET_PIECE_CATEGORIES.find(c => c.id === category);

  const renderWordCountBadge = (field: keyof typeof WORD_COUNT_TARGETS) => {
    const count = wordCounts[field];
    const target = WORD_COUNT_TARGETS[field];
    const status = getWordCountStatus(count, target);

    return (
      <span
        className={`text-xs px-2 py-0.5 rounded-full ${
          status === 'low'
            ? 'bg-yellow-100 text-yellow-700'
            : status === 'high'
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700'
        }`}
      >
        {count} / ~{target.ideal} words
      </span>
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{categoryIcons[category]}</span>
          <div>
            <button
              onClick={() => setShowCategorySelect(!showCategorySelect)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              {selectedCategoryInfo?.name || 'Select Category'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showCategorySelect && (
              <div className="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 w-64">
                {SET_PIECE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
                      setShowCategorySelect(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 ${
                      category === cat.id ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                  >
                    <span>{categoryIcons[cat.id]}</span>
                    <span className="text-sm">{cat.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {autoSaveStatus === 'saving' && <span>Saving...</span>}
          {autoSaveStatus === 'saved' && <span className="text-green-600">Draft saved</span>}
          {autoSaveStatus === 'unsaved' && <span>Unsaved changes</span>}
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Story Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., 'Led the payment system migration'"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">A short name to identify this story</p>
      </div>

      {/* STAR Sections */}
      <div className="space-y-6">
        {/* Situation */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">S</span>
              <label className="font-medium text-gray-900">Situation</label>
            </div>
            {renderWordCountBadge('situation')}
          </div>
          <p className="text-sm text-gray-600 mb-3">Set the context. Where were you? When was this? What was happening?</p>
          <textarea
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            placeholder="At my last company, we were facing a 6-week deadline to migrate our payment system before our contract expired..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          />
        </div>

        {/* Task */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">T</span>
              <label className="font-medium text-gray-900">Task</label>
            </div>
            {renderWordCountBadge('task')}
          </div>
          <p className="text-sm text-gray-600 mb-3">What was YOUR specific responsibility or goal?</p>
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="I volunteered to lead the migration because I had experience with the new provider from a previous role..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[80px]"
          />
        </div>

        {/* Action */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">A</span>
              <label className="font-medium text-gray-900">Action</label>
            </div>
            {renderWordCountBadge('action')}
          </div>
          <p className="text-sm text-gray-600 mb-3">
            This is the most important part. What did YOU specifically do? Use "I" not "we".
          </p>
          <textarea
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="I started by creating a detailed project plan with clear milestones. I set up daily standups to surface blockers quickly. When our database team pushed back on the timeline, I worked with them to understand their concerns and proposed a phased approach..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px]"
          />
        </div>

        {/* Result */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">R</span>
              <label className="font-medium text-gray-900">Result</label>
            </div>
            {renderWordCountBadge('result')}
          </div>
          <p className="text-sm text-gray-600 mb-3">What was the outcome? Quantify if possible (%, time, money, etc.)</p>
          <textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="We completed the migration in 5 weeks with zero downtime. The phased approach we developed became the template for future migrations..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          />
        </div>
      </div>

      {/* Word Count Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-gray-900">Total: {totalWordCount} words</span>
            <span className="text-sm text-gray-600 ml-2">
              (Target: ~300 words for a 2-3 minute response)
            </span>
          </div>
          <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                totalWordCount < 200 ? 'bg-yellow-500' : totalWordCount > 400 ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((totalWordCount / 300) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(true)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSave(false)}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mark Complete
          </button>
        </div>
      </div>
    </div>
  );
}
