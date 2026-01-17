import { Journey, Module, ModuleRegistry } from '@/types/journey';
import { amazonCompanyModule } from './company/amazon';
import { softwareEngineerModule } from './role/software-engineer';
import { amazonSdeModule } from './company-role/amazon-sde';

// Module registry - all available modules
export const moduleRegistry: ModuleRegistry = {
  company: {
    'amazon-company': amazonCompanyModule,
  },
  role: {
    'software-engineer': softwareEngineerModule,
  },
  'company-role': {
    'amazon-sde': amazonSdeModule,
  },
};

// Helper to get a module by ID
export function getModule(type: keyof ModuleRegistry, slug: string): Module | undefined {
  return moduleRegistry[type][slug];
}

// Journey definitions - composed of modules
export const journeys: Record<string, Journey> = {
  'amazon-sde': {
    id: 'amazon-sde-journey',
    slug: 'amazon-sde',
    company: 'Amazon',
    role: 'Software Engineer',
    title: 'Amazon SDE Interview Prep',
    description: 'Complete preparation for Amazon software engineering interviews',
    color: '#FF9900', // Amazon orange
    modules: [amazonCompanyModule, softwareEngineerModule, amazonSdeModule],
    totalSteps:
      amazonCompanyModule.steps.length +
      softwareEngineerModule.steps.length +
      amazonSdeModule.steps.length,
    estimatedHours: Math.round(
      (amazonCompanyModule.steps.reduce((sum, s) => sum + s.estimatedMinutes, 0) +
        softwareEngineerModule.steps.reduce((sum, s) => sum + s.estimatedMinutes, 0) +
        amazonSdeModule.steps.reduce((sum, s) => sum + s.estimatedMinutes, 0)) /
        60
    ),
  },
};

// Helper functions
export function getJourney(slug: string): Journey | undefined {
  return journeys[slug];
}

export function getAllJourneys(): Journey[] {
  return Object.values(journeys);
}

export function getJourneySlugs(): string[] {
  return Object.keys(journeys);
}

// Get all step slugs for a journey (for static params generation)
export function getJourneyStepSlugs(journeySlug: string): string[] {
  const journey = journeys[journeySlug];
  if (!journey) return [];

  const slugs: string[] = [];
  for (const module of journey.modules) {
    for (const step of module.steps) {
      slugs.push(step.slug);
    }
  }
  return slugs;
}

// Get step by slug within a journey
export function getStepBySlug(
  journeySlug: string,
  stepSlug: string
): { step: Module['steps'][0]; module: Module } | undefined {
  const journey = journeys[journeySlug];
  if (!journey) return undefined;

  for (const module of journey.modules) {
    for (const step of module.steps) {
      if (step.slug === stepSlug) {
        return { step, module };
      }
    }
  }
  return undefined;
}
