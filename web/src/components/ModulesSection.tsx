import { Position } from '@/lib/types';

interface ModulesSectionProps {
  position: Position;
}

export function ModulesSection({ position }: ModulesSectionProps) {
  const totalHours = position.modules.reduce((acc, m) => {
    const hours = parseInt(m.duration.replace(' hrs', ''));
    return acc + hours;
  }, 0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What You&apos;ll Learn
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {position.modules.length} comprehensive modules totaling {totalHours}+ hours of content
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {position.modules.map((module, index) => (
            <div
              key={module.id}
              className="p-6 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all bg-white"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {module.name}
                    </h3>
                    <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {module.duration}
                    </span>
                  </div>
                  <p className="text-slate-600">{module.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard number={position.modules.length} label="Modules" />
          <StatCard number={`${totalHours}+`} label="Hours of Content" />
          <StatCard number={position.interviewRounds} label="Interview Rounds Covered" />
          <StatCard number="∞" label="Lifetime Access" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label }: { number: string | number; label: string }) {
  return (
    <div className="text-center p-4 rounded-lg bg-slate-50">
      <div className="text-3xl font-bold text-emerald-600 mb-1">{number}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}
