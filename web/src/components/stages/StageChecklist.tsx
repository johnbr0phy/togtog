'use client';

import { ChecklistItem } from '../../types';

interface StageChecklistProps {
  items: ChecklistItem[];
  onToggle: (itemId: string) => void;
}

export default function StageChecklist({ items, onToggle }: StageChecklistProps) {
  const completedCount = items.filter((item) => item.completed).length;
  const allComplete = completedCount === items.length && items.length > 0;

  return (
    <div>
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">
          {completedCount} of {items.length} complete
        </span>
        {allComplete && (
          <span className="text-sm font-medium text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Ready to mark complete!
          </span>
        )}
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={item.id}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              item.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggle(item.id)}
              className="mt-0.5 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span
              className={`text-sm ${
                item.completed ? 'text-green-800 line-through' : 'text-gray-700'
              }`}
            >
              {item.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
