'use client';

import { QuoteContent } from '@/types/journey';

interface QuoteBlockProps {
  content: QuoteContent;
}

export default function QuoteBlock({ content }: QuoteBlockProps) {
  return (
    <div className="quote-block my-6">
      <blockquote className="relative bg-slate-50 rounded-xl p-6 border-l-4 border-slate-400">
        {/* Quote mark */}
        <svg
          className="absolute top-4 left-4 w-8 h-8 text-slate-200"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>

        {/* Quote text */}
        <p className="relative z-10 text-lg text-slate-700 italic leading-relaxed pl-8">
          {content.quote}
        </p>

        {/* Attribution */}
        <footer className="mt-4 pl-8">
          <div className="flex items-center gap-3">
            {/* Avatar placeholder */}
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-semibold">
              {content.author[0]}
            </div>
            <div>
              <cite className="not-italic font-medium text-slate-900">{content.author}</cite>
              {content.role && <p className="text-sm text-slate-500">{content.role}</p>}
              {content.source && (
                <p className="text-xs text-slate-400 mt-0.5">via {content.source}</p>
              )}
            </div>
          </div>
        </footer>
      </blockquote>
    </div>
  );
}
