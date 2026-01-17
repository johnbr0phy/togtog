import Link from 'next/link';
import { Position } from '@/lib/types';

interface PricingSectionProps {
  position: Position;
}

export function PricingSection({ position }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get Complete Access
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to ace your {position.company} {position.role} interview
          </p>
        </div>

        {/* Pricing card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="text-emerald-400 font-medium mb-2">
                {position.company} {position.role} Bundle
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold">${position.price}</span>
                <span className="text-slate-400 line-through">$397</span>
                <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
                  SAVE 50%
                </span>
              </div>
              <p className="text-slate-300 mb-6">One-time payment. Lifetime access.</p>

              {/* What's included */}
              <ul className="space-y-3">
                {[
                  `${position.modules.length} comprehensive modules`,
                  'All practice questions with detailed answers',
                  'System design templates & frameworks',
                  'Behavioral interview story bank',
                  'Lifetime access + future updates',
                  '7-day money-back guarantee',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:text-center">
              <button
                className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg text-lg transition-colors shadow-lg shadow-emerald-500/25"
              >
                {position.ctaText}
              </button>
              <p className="text-sm text-slate-400 mt-4">
                Secure checkout powered by Stripe
              </p>
              <Link
                href="/my-prep"
                className="inline-block mt-4 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
              >
                Start your prep →
              </Link>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-6 py-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="text-left">
              <p className="font-semibold text-emerald-900">7-Day Money-Back Guarantee</p>
              <p className="text-sm text-emerald-700">
                Not satisfied? Get a full refund within 7 days. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
