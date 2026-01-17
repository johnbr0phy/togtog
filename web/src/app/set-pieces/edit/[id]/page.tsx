'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import SetPieceEditor from '../../../../components/setpieces/SetPieceEditor';
import { SetPiece } from '../../../../types/v3';

export default function EditSetPiecePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [piece, setPiece] = useState<SetPiece | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the set piece from localStorage
    const saved = localStorage.getItem('togtog-setpieces');
    if (saved) {
      const pieces: SetPiece[] = JSON.parse(saved);
      const found = pieces.find(p => p.id === resolvedParams.id);
      if (found) {
        setPiece(found);
      }
    }
    setLoading(false);
  }, [resolvedParams.id]);

  const handleSave = (updatedPiece: SetPiece) => {
    // Load existing set pieces
    const saved = localStorage.getItem('togtog-setpieces');
    const pieces: SetPiece[] = saved ? JSON.parse(saved) : [];

    // Find and update the piece
    const index = pieces.findIndex(p => p.id === updatedPiece.id);
    if (index >= 0) {
      pieces[index] = updatedPiece;
    } else {
      pieces.push(updatedPiece);
    }

    // Save back to localStorage
    localStorage.setItem('togtog-setpieces', JSON.stringify(pieces));

    // Clean up draft
    localStorage.removeItem(`togtog-setpiece-draft-${updatedPiece.id}`);

    // Navigate back
    router.push(`/set-pieces/category/${updatedPiece.category}`);
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

  if (!piece) {
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
          <Link href={`/set-pieces/category/${piece.category}`} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Edit Set Piece</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <SetPieceEditor
          initialPiece={piece}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
}
