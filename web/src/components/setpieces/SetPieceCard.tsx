'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SetPiece } from '../../types/v3';

interface SetPieceCardProps {
  piece: SetPiece;
  onDelete?: (id: string) => void;
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

export default function SetPieceCard({ piece, onDelete }: SetPieceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(piece.id);
    }
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{categoryIcons[piece.category] || '📝'}</span>
          <div>
            <h3 className="font-medium text-gray-900">{piece.title}</h3>
            <p className="text-sm text-gray-500">
              {piece.wordCount} words • Last edited {formatDate(piece.lastEditedAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {piece.isDraft && (
            <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded">
              Draft
            </span>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <svg
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {/* STAR Content */}
          <div className="p-4 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">S</span>
                <span className="text-xs font-semibold text-gray-500 uppercase">Situation</span>
              </div>
              <p className="text-sm text-gray-700 pl-7">{piece.situation || <em className="text-gray-400">Not written yet</em>}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">T</span>
                <span className="text-xs font-semibold text-gray-500 uppercase">Task</span>
              </div>
              <p className="text-sm text-gray-700 pl-7">{piece.task || <em className="text-gray-400">Not written yet</em>}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">A</span>
                <span className="text-xs font-semibold text-gray-500 uppercase">Action</span>
              </div>
              <p className="text-sm text-gray-700 pl-7">{piece.action || <em className="text-gray-400">Not written yet</em>}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">R</span>
                <span className="text-xs font-semibold text-gray-500 uppercase">Result</span>
              </div>
              <p className="text-sm text-gray-700 pl-7">{piece.result || <em className="text-gray-400">Not written yet</em>}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="px-4 pb-4 flex items-center justify-between">
            <Link
              href={`/set-pieces/new?edit=${piece.id}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Edit Story
            </Link>

            {showDeleteConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Delete this story?</span>
                <button
                  onClick={handleDelete}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-sm text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-sm text-gray-500 hover:text-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
