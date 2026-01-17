import { Position } from '@/lib/types';

interface HeroSectionProps {
  position: Position;
}

export function HeroSection({ position }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white/90">
            {position.company} • {position.role}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          {position.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl">
          {position.subheadline}
        </p>

        {/* Bullets */}
        <ul className="space-y-4 mb-10">
          {position.bullets.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-lg text-slate-200">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-lg shadow-emerald-500/25"
          >
            {position.ctaText}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {position.avgPrepTime} prep time
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {position.interviewRounds} interview rounds
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
