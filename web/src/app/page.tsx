import Link from 'next/link';
import { getAllPositions } from '@/data/positions';

export default function Home() {
  const positions = getAllPositions();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Interview Prep
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Master your next tech interview with company-specific preparation guides.
          </p>
        </div>
      </section>

      {/* Position Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Choose Your Target Company
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((position) => (
              <Link
                key={position.slug}
                href={`/prep/${position.slug}`}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-emerald-300 transition-all group"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                    {position.industry}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {position.company} {position.role}
                </h3>
                <p className="text-slate-600 mb-4 text-sm line-clamp-2">
                  {position.subheadline}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">
                    {position.modules.length} modules • {position.avgPrepTime}
                  </span>
                  <span className="text-emerald-600 font-semibold">
                    ${position.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 Interview Prep. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
