'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import SetPieceEditor from '../../../components/setpieces/SetPieceEditor';
import { SetPiece, SetPieceCategory } from '../../../types/v3';

function SetPieceEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as SetPieceCategory | null;
  const editId = searchParams.get('edit'); // Edit mode if ID provided

  const [existingPiece, setExistingPiece] = useState<SetPiece | undefined>(undefined);
  const [loading, setLoading] = useState(!!editId);

  useEffect(() => {
    if (editId) {
      // Load existing piece for editing
      const saved = localStorage.getItem('togtog-setpieces');
      if (saved) {
        const pieces: SetPiece[] = JSON.parse(saved);
        const found = pieces.find(p => p.id === editId);
        if (found) {
          setExistingPiece(found);
        }
      }
      setLoading(false);
    }
  }, [editId]);

  const handleSave = (piece: SetPiece) => {
    // Load existing set pieces
    const saved = localStorage.getItem('togtog-setpieces');
    const pieces: SetPiece[] = saved ? JSON.parse(saved) : [];

    if (editId) {
      // Update existing piece
      const index = pieces.findIndex(p => p.id === piece.id);
      if (index >= 0) {
        pieces[index] = piece;
      }
    } else {
      // Add new piece
      pieces.push(piece);
    }

    // Save back to localStorage
    localStorage.setItem('togtog-setpieces', JSON.stringify(pieces));

    // Clean up draft
    localStorage.removeItem(`togtog-setpiece-draft-${piece.id}`);

    // Navigate back
    router.push(`/set-pieces/category/${piece.category}`);
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (editId && !existingPiece) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Set piece not found</p>
          <Link href="/set-pieces" className="text-blue-600 hover:text-blue-700">
            Go back to Set Pieces
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/set-pieces" className="text-gray-700 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            {editId ? 'Edit Set Piece' : 'New Set Piece'}
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <SetPieceEditor
          initialPiece={existingPiece}
          initialCategory={categoryParam || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
}

export default function SetPieceEditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <SetPieceEditorContent />
    </Suspense>
  );
}
