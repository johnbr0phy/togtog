import Link from 'next/link';
import { COMPANIES } from '../../data/companies';

export default function MyPrepPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            togtog
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Choose Your Target Company</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every company interviews differently. Select your target to get company-specific
            stages, questions, and preparation strategies.
          </p>
        </div>

        {/* Company Cards */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {COMPANIES.map((company) => (
            <Link
              key={company.id}
              href={`/my-prep/${company.slug}`}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-6">
                {/* Company Badge */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                  style={{ backgroundColor: company.color }}
                >
                  {company.name[0]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                      {company.name}
                    </h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {company.role}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{company.interviewProcess}</p>

                  {/* Stage Preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {company.stages.slice(0, 4).map((stage) => (
                      <span
                        key={stage.id}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {stage.name}
                      </span>
                    ))}
                    {company.stages.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                        +{company.stages.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Tips Preview */}
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {company.tips[0]}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">More companies coming soon</p>
          <div className="flex justify-center gap-4 text-gray-400">
            <span className="px-3 py-1 bg-gray-100 rounded text-sm">Meta</span>
            <span className="px-3 py-1 bg-gray-100 rounded text-sm">Apple</span>
            <span className="px-3 py-1 bg-gray-100 rounded text-sm">BCG</span>
            <span className="px-3 py-1 bg-gray-100 rounded text-sm">Bain</span>
          </div>
        </div>

        {/* Why Company-Specific */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Why company-specific prep matters</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-medium text-blue-900 mb-1">Different structures</div>
              <p className="text-blue-800">
                Amazon has 5 loop interviews with Bar Raisers. Google has Hiring Committees.
                McKinsey uses case + PEI format.
              </p>
            </div>
            <div>
              <div className="font-medium text-blue-900 mb-1">Different values</div>
              <p className="text-blue-800">
                Amazon tests Leadership Principles. Google evaluates "Googleyness."
                McKinsey assesses consulting potential.
              </p>
            </div>
            <div>
              <div className="font-medium text-blue-900 mb-1">Different questions</div>
              <p className="text-blue-800">
                The same behavioral question needs different framing for each company's
                evaluation criteria.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
