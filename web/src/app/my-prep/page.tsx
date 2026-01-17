import Link from 'next/link';
import { StageMap } from '../../components/stages';

export default function MyPrepPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            togtog
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              Question Bank
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Interview Prep</h1>
          <p className="text-gray-600">
            Work through each stage of the interview process. Complete the prep for each round to feel confident and ready.
          </p>
        </div>

        {/* Stage Map */}
        <StageMap />

        {/* Quick Links */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-sm text-gray-600 mb-3">
              Set Piece Builder - Create reusable stories for behavioral questions
            </p>
            <span className="text-xs text-gray-400">Chunk 24</span>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-sm text-gray-600 mb-3">
              Practice Sessions - Drill questions by stage or category
            </p>
            <span className="text-xs text-gray-400">Chunk 26</span>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-sm text-gray-600 mb-3">
              Weak Points Dashboard - See where you need more practice
            </p>
            <span className="text-xs text-gray-400">Chunk 28</span>
          </div>
        </div>
      </main>
    </div>
  );
}
