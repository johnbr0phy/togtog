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
          <Link href="/set-pieces" className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📝</span>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">Set Pieces</h3>
            </div>
            <p className="text-sm text-gray-600">
              Create reusable STAR stories for 7 behavioral question categories.
            </p>
          </Link>
          <div className="bg-white rounded-lg border border-gray-200 p-5 opacity-60">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎯</span>
              <h3 className="font-semibold text-gray-900">Practice Sessions</h3>
            </div>
            <p className="text-sm text-gray-600">
              Drill questions by stage or category. Coming soon.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 opacity-60">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📊</span>
              <h3 className="font-semibold text-gray-900">Weak Points</h3>
            </div>
            <p className="text-sm text-gray-600">
              See where you need more practice. Coming soon.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
