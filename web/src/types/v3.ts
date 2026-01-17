/**
 * Interview Prep Platform v3 - Type Definitions
 *
 * Core types for:
 * - Interview Stages (Epic 6)
 * - Set Piece Response System (Epic 7)
 * - Practice-Debrief System (Epic 8)
 * - Hidden Intent System (Epic 9)
 */

// =============================================================================
// INTERVIEW STAGES (Epic 6)
// =============================================================================

export type StageStatus = 'not_started' | 'in_progress' | 'complete';

export interface InterviewStage {
  id: string;
  name: string;
  slug: string;
  format: string;              // e.g., "45 min video call"
  duration: string;            // e.g., "45-60 minutes"
  whoYouMeet: string;          // e.g., "Recruiter or Hiring Manager"
  order: number;

  // Content sections
  overview: string;            // What happens in this stage
  hiddenIntent: string;        // What they're really testing
  assessments: string[];       // List of things being assessed
  howToPrepare: string[];      // Specific preparation actions
  commonMistakes: string[];    // What to avoid
  checklist: ChecklistItem[];  // Self-assessment items

  // Optional
  companySpecific?: Record<string, string>; // Company-specific notes
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface StageProgress {
  stageId: string;
  sectionsViewed: string[];    // Which sections user has opened
  checklistCompleted: string[]; // Which checklist items are done
  percentComplete: number;
  isComplete: boolean;
  completedAt?: string;        // ISO date string
}

// =============================================================================
// SET PIECE RESPONSE SYSTEM (Epic 7)
// =============================================================================

export type SetPieceCategory =
  | 'leadership'
  | 'teamwork'
  | 'challenges'
  | 'technical'
  | 'conflict'
  | 'achievement'
  | 'growth';

export interface SetPieceCategoryInfo {
  id: SetPieceCategory;
  name: string;
  description: string;
  questionTypes: string[];     // Types of questions this answers
  exampleQuestions: string[];  // 5+ example questions
  framework: string;           // STAR variation for this category
  exampleSetPiece: SetPiece;   // Model example
}

export interface SetPiece {
  id: string;
  category: SetPieceCategory;
  title: string;               // User's name for this story

  // STAR structure
  situation: string;
  task: string;
  action: string;
  result: string;

  // Metadata
  wordCount: number;
  createdAt: string;           // ISO date string
  lastEditedAt: string;        // ISO date string
  isDraft: boolean;
}

export interface SetPieceCoverage {
  category: SetPieceCategory;
  hasSetPiece: boolean;
  setPieceCount: number;
  isDraft: boolean;            // True if only drafts exist
}

// =============================================================================
// PRACTICE-DEBRIEF SYSTEM (Epic 8)
// =============================================================================

export type PracticeMode =
  | 'by_stage'
  | 'by_category'
  | 'by_setpiece_category'
  | 'mixed'
  | 'quick_drill'
  | 'weak_points';

export interface PracticeFilters {
  mode: PracticeMode;
  stageIds?: string[];
  questionCategories?: string[];
  setPieceCategories?: SetPieceCategory[];
  difficulty?: QuestionDifficulty[];
  companies?: string[];
}

export interface PracticeSession {
  id: string;
  mode: PracticeMode;
  filters: PracticeFilters;
  questionIds: string[];
  currentIndex: number;

  // User responses
  answers: PracticeAnswer[];

  // Timing
  startedAt: string;
  pausedAt?: string;
  completedAt?: string;
  timedMode: boolean;
  timeLimitSeconds?: number;

  // Status
  status: 'in_progress' | 'paused' | 'completed';
}

export interface PracticeAnswer {
  questionId: string;
  userAnswer: string;
  timeSpentSeconds: number;
  skipped: boolean;
  answeredAt: string;
}

export interface DebriefResult {
  sessionId: string;
  completedAt: string;

  // Summary metrics
  totalQuestions: number;
  questionsAnswered: number;
  questionsSkipped: number;
  totalTimeSeconds: number;

  // Per-question analysis
  questionResults: QuestionResult[];

  // Pattern analysis
  patterns: DebriefPattern[];

  // Recommendations
  recommendations: DebriefRecommendation[];
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string;
  idealAnswer: string;
  gapAnalysis: string;         // What was missing
  relevantSetPieceCategory?: SetPieceCategory;
  score: 'strong' | 'adequate' | 'needs_work' | 'skipped';
}

export interface DebriefPattern {
  type: 'strength' | 'weakness';
  description: string;         // e.g., "You struggled with conflict questions"
  affectedQuestionIds: string[];
  category?: string;
}

export interface DebriefRecommendation {
  type: 'review_questions' | 'strengthen_setpiece' | 'complete_stage' | 'practice_more';
  description: string;
  actionLabel: string;         // Button text
  actionLink: string;          // Where to navigate
  priority: 'high' | 'medium' | 'low';
}

// =============================================================================
// HIDDEN INTENT SYSTEM (Epic 9)
// =============================================================================

export interface QuestionIntent {
  hiddenIntent: string;        // What they're really testing (1 sentence)
  strongAnswersDemonstrate: string[];  // What good answers show
  weakAnswersReveal: string[]; // What bad answers expose
}

export interface InterviewerLesson {
  id: string;
  title: string;
  slug: string;
  description: string;         // 1-2 sentence summary
  content: string;             // Full lesson content (markdown)
  readTimeMinutes: number;
  relatedStageIds?: string[];  // Which stages this applies to
  order: number;
}

export interface ReframingScenario {
  id: string;
  question: string;            // The difficult question
  commonBadApproach: string;   // What most people do wrong
  reframingStrategy: string;   // How to turn it positive
  exampleResponse: string;     // Full answer showing the turn
  keyPhrases: string[];        // Useful phrases to use
  practicePrompt: string;      // Exercise for user to try
}

// =============================================================================
// QUESTIONS (Extended from existing)
// =============================================================================

export type QuestionDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuestionType =
  | 'behavioral'
  | 'technical'
  | 'case_study'
  | 'situational'
  | 'culture_fit'
  | 'company_specific';

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  company?: string;
  tags: string[];

  // Answer content
  sampleAnswer: string;
  framework?: string;          // e.g., "STAR", "CAR"
  commonMistakes?: string[];

  // Hidden intent (Epic 9)
  intent: QuestionIntent;

  // Set piece mapping (Epic 7)
  setPieceCategories: SetPieceCategory[];  // Which categories can answer this

  // Stage mapping (Epic 6)
  applicableStageIds: string[];

  // Premium flag
  isPremiumAnswer: boolean;
}

// =============================================================================
// EXCELLENCE TRANSCRIPTS (J3)
// =============================================================================

export type TranscriptType =
  | 'behavioral'
  | 'technical_explanation'
  | 'case_study'
  | 'culture_fit'
  | 'difficult_question';

export interface Transcript {
  id: string;
  type: TranscriptType;
  title: string;
  question: string;

  // The excellent response
  response: string;
  annotations: TranscriptAnnotation[];

  // Optional weak response for contrast
  weakResponse?: string;
  weakResponseNotes?: string;

  // Metadata
  company?: string;
  role?: string;
  relatedStageIds: string[];
  relatedSetPieceCategories: SetPieceCategory[];
}

export interface TranscriptAnnotation {
  startIndex: number;          // Character index in response
  endIndex: number;
  note: string;                // Why this part works
}

// =============================================================================
// USER PROGRESS (Aggregate)
// =============================================================================

export interface UserProgress {
  // Stage progress
  stages: Record<string, StageProgress>;
  stageOrder: string[];        // Custom order if user reordered
  customStages: InterviewStage[]; // User-added stages

  // Set pieces
  setPieces: SetPiece[];

  // Practice history
  practiceSessions: PracticeSession[];
  debriefResults: DebriefResult[];

  // Weak points (calculated)
  weakPoints: WeakPoint[];

  // Lessons
  lessonsCompleted: string[];  // Lesson IDs

  // Timestamps
  lastUpdatedAt: string;
}

export interface WeakPoint {
  id: string;
  type: 'question_category' | 'specific_question' | 'setpiece_gap' | 'incomplete_stage';
  description: string;

  // What's affected
  categoryId?: string;
  questionIds?: string[];
  stageId?: string;
  setPieceCategory?: SetPieceCategory;

  // Priority scoring
  priorityScore: number;       // Higher = more urgent
  frequency: number;           // How often this came up
  lastOccurred: string;        // ISO date

  // Remediation
  remediationAction: string;   // What to do
  remediationLink: string;     // Where to go
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const SET_PIECE_CATEGORIES: SetPieceCategoryInfo[] = [
  {
    id: 'leadership',
    name: 'Leadership / Taking Initiative',
    description: 'Stories about leading projects, stepping up without being asked, or taking ownership of outcomes.',
    questionTypes: ['Tell me about a time you led...', 'Describe when you took initiative...', 'How do you motivate others?'],
    exampleQuestions: [
      'Tell me about a time you led a team through a difficult situation.',
      'Describe a situation where you took initiative without being asked.',
      'How do you motivate team members who are struggling?',
      'Tell me about a time you had to make a decision without all the information.',
      'Describe a project where you were responsible for the outcome.',
    ],
    framework: 'STAR with emphasis on YOUR specific actions and decisions',
    exampleSetPiece: {} as SetPiece, // Populated in data file
  },
  {
    id: 'teamwork',
    name: 'Teamwork / Collaboration',
    description: 'Stories about working effectively with others, cross-functional collaboration, or supporting teammates.',
    questionTypes: ['Tell me about working with a team...', 'Describe collaboration...', 'How do you handle different working styles?'],
    exampleQuestions: [
      'Tell me about a successful team project you contributed to.',
      'Describe a time you had to work with someone difficult.',
      'How do you handle disagreements with teammates?',
      'Tell me about a time you helped a struggling colleague.',
      'Describe your role in a cross-functional project.',
    ],
    framework: 'STAR with emphasis on collaboration and shared success',
    exampleSetPiece: {} as SetPiece,
  },
  {
    id: 'challenges',
    name: 'Overcoming Challenges / Failure',
    description: 'Stories about setbacks, failures, and what you learned from difficult experiences.',
    questionTypes: ['Tell me about a failure...', 'Describe a challenge...', 'What did you learn from a mistake?'],
    exampleQuestions: [
      'Tell me about a time you failed.',
      'Describe your biggest professional challenge.',
      'What\'s a mistake you made and how did you handle it?',
      'Tell me about a project that didn\'t go as planned.',
      'How do you handle setbacks?',
    ],
    framework: 'STAR with emphasis on learning and growth',
    exampleSetPiece: {} as SetPiece,
  },
  {
    id: 'technical',
    name: 'Technical Problem-Solving',
    description: 'Stories about debugging, architecture decisions, or solving complex technical problems.',
    questionTypes: ['Tell me about a technical challenge...', 'Describe a bug you fixed...', 'How did you design...'],
    exampleQuestions: [
      'Tell me about a difficult bug you solved.',
      'Describe a system you designed or architected.',
      'How do you approach debugging complex issues?',
      'Tell me about a technical decision you made and its trade-offs.',
      'Describe a time you had to learn a new technology quickly.',
    ],
    framework: 'STAR with technical context and problem-solving approach',
    exampleSetPiece: {} as SetPiece,
  },
  {
    id: 'conflict',
    name: 'Conflict Resolution',
    description: 'Stories about disagreements, difficult conversations, or navigating interpersonal tension.',
    questionTypes: ['Tell me about a conflict...', 'Describe a disagreement...', 'How do you handle difficult conversations?'],
    exampleQuestions: [
      'Tell me about a conflict with a coworker.',
      'Describe a disagreement with your manager.',
      'How do you handle receiving critical feedback?',
      'Tell me about a time you had to push back on something.',
      'Describe a difficult conversation you had to have.',
    ],
    framework: 'STAR with emphasis on professional resolution and relationship preservation',
    exampleSetPiece: {} as SetPiece,
  },
  {
    id: 'achievement',
    name: 'Achievement / Impact',
    description: 'Stories about accomplishments, measurable results, and significant contributions.',
    questionTypes: ['What\'s your greatest achievement?', 'Tell me about an impact you made...', 'Describe a successful project...'],
    exampleQuestions: [
      'What\'s your greatest professional achievement?',
      'Tell me about a time you exceeded expectations.',
      'Describe your most impactful project.',
      'What are you most proud of in your career?',
      'Tell me about a time you delivered significant results.',
    ],
    framework: 'STAR with specific metrics and quantified impact',
    exampleSetPiece: {} as SetPiece,
  },
  {
    id: 'growth',
    name: 'Growth / Learning',
    description: 'Stories about feedback, skill development, adaptability, and continuous improvement.',
    questionTypes: ['How do you learn?', 'Tell me about feedback...', 'Describe how you\'ve grown...'],
    exampleQuestions: [
      'Tell me about feedback that changed how you work.',
      'How do you stay current in your field?',
      'Describe a time you had to adapt to a major change.',
      'What skill have you developed recently?',
      'Tell me about a time you were outside your comfort zone.',
    ],
    framework: 'STAR with emphasis on self-awareness and improvement',
    exampleSetPiece: {} as SetPiece,
  },
];

export const DEFAULT_STAGES: Omit<InterviewStage, 'checklist'>[] = [
  {
    id: 'phone-screen',
    name: 'Phone Screen',
    slug: 'phone-screen',
    format: '30-45 min video or phone call',
    duration: '30-45 minutes',
    whoYouMeet: 'Recruiter or Hiring Manager',
    order: 1,
    overview: '',
    hiddenIntent: '',
    assessments: [],
    howToPrepare: [],
    commonMistakes: [],
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
  },
];
