'use client';

import { useState, useEffect } from 'react';
import { ChecklistContent } from '@/types/journey';

interface ChecklistBlockProps {
  content: ChecklistContent;
  blockId: string;
  onProgress?: (checkedIds: string[]) => void;
  savedProgress?: string[];
}

export default function ChecklistBlock({
  content,
  blockId,
  onProgress,
  savedProgress,
}: ChecklistBlockProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(
    new Set(savedProgress || [])
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Load from localStorage on mount
  useEffect(() => {
    if (content.persistKey) {
      const saved = localStorage.getItem(`togtog-checklist-${content.persistKey}`);
      if (saved) {
        try {
          setCheckedItems(new Set(JSON.parse(saved)));
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, [content.persistKey]);

  const handleToggle = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);

    // Persist to localStorage
    if (content.persistKey) {
      localStorage.setItem(
        `togtog-checklist-${content.persistKey}`,
        JSON.stringify(Array.from(newChecked))
      );
    }

    // Notify parent
    if (onProgress) {
      onProgress(Array.from(newChecked));
    }
  };

  const toggleExpand = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const completedCount = checkedItems.size;
  const totalCount = content.items.length;
  const percentComplete = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="checklist-block bg-white border border-gray-200 rounded-xl p-6 my-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{content.title}</h3>
        <span className="text-sm text-gray-500">
          {completedCount}/{totalCount} complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      {/* Items */}
      <div className="space-y-2">
        {content.items.map((item) => {
          const isChecked = checkedItems.has(item.id);
          const isExpanded = expandedItems.has(item.id);

          return (
            <div key={item.id} className="border border-gray-100 rounded-lg overflow-hidden">
              <div
                className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                  isChecked ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleToggle(item.id)}
              >
                {/* Checkbox */}
                <span
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isChecked && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>

                {/* Text */}
                <span
                  className={`flex-1 ${
                    isChecked ? 'text-green-800 line-through' : 'text-gray-700'
                  }`}
                >
                  {item.text}
                </span>

                {/* Expand button if has detail */}
                {item.detail && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(item.id);
                    }}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Detail content */}
              {item.detail && isExpanded && (
                <div className="px-11 pb-3 text-sm text-gray-600 bg-gray-50 border-t border-gray-100">
                  {item.detail}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {percentComplete === 100 && (
        <div className="mt-4 flex items-center gap-2 text-green-600 text-sm font-medium">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          All items completed!
        </div>
      )}
    </div>
  );
}
