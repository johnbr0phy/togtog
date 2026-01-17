'use client';

interface SidebarSection {
  id: string;
  title: string;
  isViewed: boolean;
}

interface StageSidebarProps {
  sections: SidebarSection[];
  activeSection: string | null;
  onNavigate: (sectionId: string) => void;
  percentComplete: number;
}

export default function StageSidebar({
  sections,
  activeSection,
  onNavigate,
  percentComplete,
}: StageSidebarProps) {
  return (
    <div className="sticky top-4">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">Progress</span>
          <span className="text-gray-600">{percentComplete}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Section Navigation */}
      <nav className="space-y-1">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
          Sections
        </p>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
              activeSection === section.id
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {section.isViewed ? (
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
            )}
            <span className="truncate">{section.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
