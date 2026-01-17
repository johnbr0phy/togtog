/**
 * Stage data and helpers
 * Content will be expanded in Chunk 21
 */

import { InterviewStage, ChecklistItem } from '../types';

// Helper to generate checklist items
function makeChecklist(items: string[]): ChecklistItem[] {
  return items.map((text, i) => ({
    id: `item-${i + 1}`,
    text,
    completed: false,
  }));
}

/**
 * Full stage data with content
 * This is populated with real content in Chunk 21
 */
export const STAGES: InterviewStage[] = [
  {
    id: 'phone-screen',
    name: 'Phone Screen',
    slug: 'phone-screen',
    format: '30-45 min video or phone call',
    duration: '30-45 minutes',
    whoYouMeet: 'Recruiter or Hiring Manager',
    order: 1,
    overview: '',  // Content added in Chunk 21
    hiddenIntent: '',
    assessments: [],
    howToPrepare: [],
    commonMistakes: [],
    checklist: [],
  },
  {
    id: 'technical',
    name: 'Technical Round',
    slug: 'technical',
    format: '45-60 min coding + discussion',
    duration: '45-60 minutes',
    whoYouMeet: 'Senior Engineer or Tech Lead',
    order: 2,
    overview: '',
    hiddenIntent: '',
    assessments: [],
    howToPrepare: [],
    commonMistakes: [],
    checklist: [],
  },
  {
    id: 'behavioral',
    name: 'Behavioral Round',
    slug: 'behavioral',
    format: '45-60 min structured interview',
    duration: '45-60 minutes',
    whoYouMeet: 'Hiring Manager or HR',
    order: 3,
    overview: '',
    hiddenIntent: '',
    assessments: [],
    howToPrepare: [],
    commonMistakes: [],
    checklist: [],
  },
  {
    id: 'case-study',
    name: 'Case Study Round',
    slug: 'case-study',
    format: '30-45 min business problem',
    duration: '30-45 minutes',
    whoYouMeet: 'Senior Consultant or Manager',
    order: 4,
    overview: '',
    hiddenIntent: '',
    assessments: [],
    howToPrepare: [],
    commonMistakes: [],
    checklist: [],
  },
  {
    id: 'final-round',
    name: 'Final Round / Onsite',
    slug: 'final-round',
    format: '4-6 hours multiple interviews',
    duration: '4-6 hours',
    whoYouMeet: 'Multiple team members',
    order: 5,
    overview: '',
    hiddenIntent: '',
    assessments: [],
    howToPrepare: [],
    commonMistakes: [],
    checklist: [],
  },
];

/**
 * Get a stage by its URL slug
 */
export function getStageBySlug(slug: string): InterviewStage | null {
  return STAGES.find((s) => s.slug === slug) || null;
}

/**
 * Get a stage by its ID
 */
export function getStageById(id: string): InterviewStage | null {
  return STAGES.find((s) => s.id === id) || null;
}

/**
 * Get all stages in order
 */
export function getAllStages(): InterviewStage[] {
  return [...STAGES].sort((a, b) => a.order - b.order);
}
