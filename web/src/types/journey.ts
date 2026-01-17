// Journey System Type Definitions
// Defines the content block system, modules, and journey composition

// =============================================================================
// Content Block Types - The building blocks of each step
// =============================================================================

export type ContentBlockType =
  | 'text'
  | 'video'
  | 'quiz'
  | 'checklist'
  | 'quote'
  | 'tip'
  | 'exercise'
  | 'company-fact';

// Individual content type definitions
export interface TextContent {
  markdown: string;
}

export interface VideoContent {
  youtubeId: string;
  title: string;
  duration?: string; // e.g., "5:32"
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizContent {
  question: string;
  options: QuizOption[];
  explanation: string; // Shown after answering
  hint?: string; // Optional hint before answering
}

export interface ChecklistItem {
  id: string;
  text: string;
  detail?: string; // Optional expanded detail
}

export interface ChecklistContent {
  title: string;
  items: ChecklistItem[];
  persistKey?: string; // localStorage key for persistence
}

export interface QuoteContent {
  quote: string;
  author: string;
  role?: string; // e.g., "Former Amazon Bar Raiser"
  source?: string; // e.g., "LinkedIn", "Interview"
}

export interface TipContent {
  title: string;
  body: string;
  variant: 'info' | 'warning' | 'success' | 'pro-tip';
}

export interface ExerciseContent {
  prompt: string;
  placeholder?: string;
  minWords?: number;
  maxWords?: number;
  persistKey: string; // localStorage key for saving response
}

export interface CompanyFactContent {
  fact: string;
  category: 'history' | 'culture' | 'interview' | 'leadership' | 'product';
  source?: string;
  yearRelevant?: string; // e.g., "2024" - for facts that may become outdated
}

// Discriminated union for content blocks
export type ContentBlock =
  | { id: string; type: 'text'; content: TextContent }
  | { id: string; type: 'video'; content: VideoContent }
  | { id: string; type: 'quiz'; content: QuizContent }
  | { id: string; type: 'checklist'; content: ChecklistContent }
  | { id: string; type: 'quote'; content: QuoteContent }
  | { id: string; type: 'tip'; content: TipContent }
  | { id: string; type: 'exercise'; content: ExerciseContent }
  | { id: string; type: 'company-fact'; content: CompanyFactContent };

// =============================================================================
// Journey Step - A single screen in the flow
// =============================================================================

export interface JourneyStep {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  estimatedMinutes: number;
  blocks: ContentBlock[];
}

// =============================================================================
// Module - A collection of steps (composable unit)
// =============================================================================

export type ModuleType = 'company' | 'role' | 'company-role';

export interface Module {
  id: string;
  slug: string;
  name: string;
  type: ModuleType;
  description: string;
  icon?: string; // Emoji or icon identifier
  steps: JourneyStep[];
  isFree: boolean;
}

// =============================================================================
// Journey - Composed of modules
// =============================================================================

export interface Journey {
  id: string;
  slug: string; // e.g., 'amazon-sde'
  company: string;
  role: string;
  title: string; // e.g., "Amazon Software Engineer Interview Prep"
  description: string;
  color: string; // Brand color
  modules: Module[];
  totalSteps: number;
  estimatedHours: number;
}

// =============================================================================
// Progress Tracking
// =============================================================================

export interface ModuleProgress {
  completedSteps: string[]; // Step IDs
  quizAnswers: Record<string, string>; // stepId-blockId -> selected option ID
  exerciseResponses: Record<string, string>; // blockId -> response text
  checklistProgress: Record<string, string[]>; // blockId -> checked item IDs
}

export interface JourneyProgressData {
  currentStepId: string;
  currentModuleId: string;
  completedSteps: string[]; // All completed step IDs across all modules
  startedAt: string; // ISO date
  lastAccessedAt: string; // ISO date
  isFirstRun: boolean; // When true, enforces linear progression
  moduleProgress: Record<string, ModuleProgress>; // moduleId -> progress
}

export interface AllJourneyProgress {
  [journeySlug: string]: JourneyProgressData;
}

// =============================================================================
// Helper Types
// =============================================================================

// For the step renderer to know the current context
export interface StepContext {
  journey: Journey;
  module: Module;
  step: JourneyStep;
  stepIndex: number; // Index within the entire journey
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLastFreeStep: boolean; // True if next step is behind paywall
  nextStep: JourneyStep | null;
  prevStep: JourneyStep | null;
  progress: JourneyProgressData;
}

// For building the progress sidebar
export interface ProgressStep {
  id: string;
  slug: string;
  title: string;
  moduleId: string;
  moduleName: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean; // Behind paywall or not yet reached in first-run
  stepNumber: number;
}

// =============================================================================
// Module Registry Types
// =============================================================================

export interface ModuleRegistry {
  company: Record<string, Module>;
  role: Record<string, Module>;
  'company-role': Record<string, Module>;
}

// Journey builder helper
export interface JourneyConfig {
  slug: string;
  company: string;
  role: string;
  title: string;
  description: string;
  color: string;
  companyModuleSlug: string;
  roleModuleSlug: string;
  companyRoleModuleSlug?: string; // Optional - not all journeys have this
}
