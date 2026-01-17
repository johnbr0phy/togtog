/**
 * C2: Position-Module Bundle Generator
 *
 * Auto-generates interview prep bundles based on position tags.
 * Position = Company + Role + Level
 */

// ============================================================================
// Type Definitions
// ============================================================================

export type CompanyCategory =
  | 'faang' | 'big-tech' | 'ai-native'
  | 'finance-ib' | 'finance-quant'
  | 'consulting-mbb' | 'consulting-big4'
  | 'defense' | 'growth-tech' | 'consumer-tech';

export type RoleCategory =
  | 'swe' | 'ml-engineer' | 'data-scientist' | 'data-engineer'
  | 'pm' | 'product-designer' | 'ux-designer'
  | 'consultant' | 'business-analyst'
  | 'ib-analyst' | 'quant-analyst' | 'quant-trader';

export type Level = 'entry' | 'mid' | 'senior' | 'staff' | 'principal' | 'director';

export interface Position {
  id: string;
  company: string;
  companyCategory: CompanyCategory;
  role: string;
  roleCategory: RoleCategory;
  level: Level;
  tags: string[];
  searchVolume?: number;
  hiringPriority?: number;
}

export interface Module {
  id: string;
  name: string;
  category: 'Technical' | 'Behavioral' | 'Company' | 'Role' | 'Intensifier';
  difficulty: 'All' | 'Entry' | 'Mid+' | 'Senior+';
  minHours: number;
  maxHours: number;
  avgHours: number;
  tags: string[];
}

export interface ModuleSelection {
  moduleId: string;
  priority: 1 | 2 | 3 | 4 | 5;
  weight: number;
  sequence: number;
  conditions?: string[];
}

export interface TriggerCondition {
  companyTags?: string[];
  roleTags?: string[];
  levelTags?: string[];
  requireAll?: string[];
}

export interface BundleRule {
  id: string;
  name: string;
  trigger: TriggerCondition;
  modules: ModuleSelection[];
  priority: number;
}

export interface Bundle {
  positionId: string;
  modules: ModuleSelection[];
  estimatedHours: number;
  coverage: number;
  gaps: string[];
}

// ============================================================================
// Module Registry
// ============================================================================

export const MODULE_REGISTRY: Record<string, Module> = {
  // Core Technical Modules
  'M001': { id: 'M001', name: 'Data Structures & Algorithms', category: 'Technical', difficulty: 'All', minHours: 40, maxHours: 120, avgHours: 80, tags: ['coding', 'dsa', 'algorithms'] },
  'M002': { id: 'M002', name: 'System Design Fundamentals', category: 'Technical', difficulty: 'Mid+', minHours: 30, maxHours: 60, avgHours: 45, tags: ['system-design', 'architecture'] },
  'M003': { id: 'M003', name: 'Object-Oriented Design', category: 'Technical', difficulty: 'All', minHours: 15, maxHours: 25, avgHours: 20, tags: ['ood', 'design-patterns'] },
  'M004': { id: 'M004', name: 'Behavioral Interview Prep', category: 'Behavioral', difficulty: 'All', minHours: 10, maxHours: 20, avgHours: 15, tags: ['behavioral', 'star-method'] },
  'M005': { id: 'M005', name: 'SQL & Database Design', category: 'Technical', difficulty: 'All', minHours: 15, maxHours: 30, avgHours: 22, tags: ['sql', 'databases', 'data'] },
  'M006': { id: 'M006', name: 'Machine Learning Fundamentals', category: 'Technical', difficulty: 'Mid+', minHours: 30, maxHours: 50, avgHours: 40, tags: ['ml', 'ai', 'data-science'] },
  'M007': { id: 'M007', name: 'Statistics & Probability', category: 'Technical', difficulty: 'All', minHours: 20, maxHours: 35, avgHours: 27, tags: ['statistics', 'probability', 'quant'] },
  'M008': { id: 'M008', name: 'Product Sense & Strategy', category: 'Technical', difficulty: 'All', minHours: 20, maxHours: 40, avgHours: 30, tags: ['product', 'strategy', 'pm'] },
  'M009': { id: 'M009', name: 'Case Interview Frameworks', category: 'Technical', difficulty: 'All', minHours: 30, maxHours: 60, avgHours: 45, tags: ['case', 'frameworks', 'consulting'] },
  'M010': { id: 'M010', name: 'Financial Modeling', category: 'Technical', difficulty: 'All', minHours: 25, maxHours: 50, avgHours: 37, tags: ['finance', 'modeling', 'valuation'] },

  // Company-Specific Modules
  'C001': { id: 'C001', name: 'Amazon Leadership Principles', category: 'Company', difficulty: 'All', minHours: 15, maxHours: 25, avgHours: 20, tags: ['amazon', 'lp', 'behavioral'] },
  'C002': { id: 'C002', name: 'Google Interview Deep Dive', category: 'Company', difficulty: 'All', minHours: 20, maxHours: 30, avgHours: 25, tags: ['google', 'coding', 'system-design'] },
  'C003': { id: 'C003', name: 'Meta Interview Patterns', category: 'Company', difficulty: 'All', minHours: 15, maxHours: 25, avgHours: 20, tags: ['meta', 'coding', 'ninja-pirate'] },
  'C004': { id: 'C004', name: 'Apple Design Philosophy', category: 'Company', difficulty: 'All', minHours: 10, maxHours: 15, avgHours: 12, tags: ['apple', 'design', 'culture'] },
  'C005': { id: 'C005', name: 'McKinsey PEI Mastery', category: 'Company', difficulty: 'All', minHours: 15, maxHours: 25, avgHours: 20, tags: ['mckinsey', 'pei', 'behavioral'] },
  'C006': { id: 'C006', name: 'Goldman Sachs Technical', category: 'Company', difficulty: 'All', minHours: 20, maxHours: 30, avgHours: 25, tags: ['goldman', 'finance', 'technical'] },
  'C007': { id: 'C007', name: 'NVIDIA GPU/AI Systems', category: 'Company', difficulty: 'Mid+', minHours: 15, maxHours: 25, avgHours: 20, tags: ['nvidia', 'gpu', 'ai-systems'] },
  'C008': { id: 'C008', name: 'OpenAI Safety & Alignment', category: 'Company', difficulty: 'All', minHours: 15, maxHours: 20, avgHours: 17, tags: ['openai', 'ai-safety', 'alignment'] },
  'C009': { id: 'C009', name: 'Defense Clearance Prep', category: 'Company', difficulty: 'All', minHours: 10, maxHours: 15, avgHours: 12, tags: ['defense', 'clearance', 'process'] },
  'C010': { id: 'C010', name: 'Microsoft STAR+ Method', category: 'Company', difficulty: 'All', minHours: 10, maxHours: 15, avgHours: 12, tags: ['microsoft', 'behavioral', 'star'] },

  // Role-Specific Modules
  'R001': { id: 'R001', name: 'Frontend Interview Prep', category: 'Role', difficulty: 'All', minHours: 25, maxHours: 40, avgHours: 32, tags: ['frontend', 'react', 'javascript'] },
  'R002': { id: 'R002', name: 'Backend System Design', category: 'Role', difficulty: 'Mid+', minHours: 30, maxHours: 50, avgHours: 40, tags: ['backend', 'distributed', 'api'] },
  'R003': { id: 'R003', name: 'ML System Design', category: 'Role', difficulty: 'Mid+', minHours: 25, maxHours: 40, avgHours: 32, tags: ['ml-systems', 'mlops', 'deployment'] },
  'R004': { id: 'R004', name: 'Data Pipeline Architecture', category: 'Role', difficulty: 'Mid+', minHours: 20, maxHours: 35, avgHours: 27, tags: ['data-engineering', 'pipelines', 'etl'] },
  'R005': { id: 'R005', name: 'PM Execution Deep Dive', category: 'Role', difficulty: 'All', minHours: 15, maxHours: 25, avgHours: 20, tags: ['execution', 'metrics', 'roadmap'] },
  'R006': { id: 'R006', name: 'UX Portfolio Review Prep', category: 'Role', difficulty: 'All', minHours: 15, maxHours: 20, avgHours: 17, tags: ['portfolio', 'ux', 'design-critique'] },
  'R007': { id: 'R007', name: 'Quantitative Brain Teasers', category: 'Role', difficulty: 'All', minHours: 20, maxHours: 35, avgHours: 27, tags: ['quant', 'probability', 'puzzles'] },
  'R008': { id: 'R008', name: 'Investment Banking Technicals', category: 'Role', difficulty: 'All', minHours: 25, maxHours: 40, avgHours: 32, tags: ['ib', 'dcf', 'lbo', 'accretion'] },
  'R009': { id: 'R009', name: 'Consulting Math Drills', category: 'Role', difficulty: 'All', minHours: 15, maxHours: 25, avgHours: 20, tags: ['math', 'estimation', 'consulting'] },
  'R010': { id: 'R010', name: 'Senior/Staff Scope & Impact', category: 'Role', difficulty: 'Senior+', minHours: 15, maxHours: 25, avgHours: 20, tags: ['staff', 'impact', 'scope'] },

  // Skill Intensifiers
  'I001': { id: 'I001', name: 'LeetCode Patterns Deep Dive', category: 'Intensifier', difficulty: 'All', minHours: 40, maxHours: 80, avgHours: 60, tags: ['leetcode', 'patterns', 'hard'] },
  'I002': { id: 'I002', name: 'Distributed Systems Advanced', category: 'Intensifier', difficulty: 'Senior+', minHours: 25, maxHours: 40, avgHours: 32, tags: ['distributed', 'consensus', 'advanced'] },
  'I003': { id: 'I003', name: 'ML Research Paper Review', category: 'Intensifier', difficulty: 'Senior+', minHours: 20, maxHours: 35, avgHours: 27, tags: ['papers', 'research', 'ml-theory'] },
  'I004': { id: 'I004', name: 'Trading Strategies', category: 'Intensifier', difficulty: 'All', minHours: 20, maxHours: 30, avgHours: 25, tags: ['trading', 'strategies', 'markets'] },
  'I005': { id: 'I005', name: 'M&A Case Studies', category: 'Intensifier', difficulty: 'All', minHours: 20, maxHours: 30, avgHours: 25, tags: ['ma', 'case-studies', 'deals'] },
  'I006': { id: 'I006', name: 'API Design Patterns', category: 'Intensifier', difficulty: 'Mid+', minHours: 15, maxHours: 25, avgHours: 20, tags: ['api', 'rest', 'graphql'] },
};

// ============================================================================
// Bundle Rules
// ============================================================================

export const BUNDLE_RULES: BundleRule[] = [
  // Rule 1: Tech SWE Base Bundle
  {
    id: 'tech-swe-base',
    name: 'Tech Software Engineer Base',
    priority: 50,
    trigger: {
      roleTags: ['swe', 'software-engineer', 'backend', 'frontend', 'fullstack'],
      companyTags: ['faang', 'big-tech', 'growth-tech', 'consumer-tech'],
    },
    modules: [
      { moduleId: 'M001', priority: 1, weight: 35, sequence: 1 },
      { moduleId: 'M002', priority: 1, weight: 25, sequence: 2, conditions: ['level != entry'] },
      { moduleId: 'M004', priority: 2, weight: 15, sequence: 3 },
      { moduleId: 'M003', priority: 3, weight: 10, sequence: 4 },
    ],
  },

  // Rule 2: Amazon LP Override
  {
    id: 'amazon-lp-override',
    name: 'Amazon Leadership Principles',
    priority: 100,
    trigger: { companyTags: ['amazon'] },
    modules: [
      { moduleId: 'C001', priority: 1, weight: 30, sequence: 2 },
    ],
  },

  // Rule 3: Google Deep Dive
  {
    id: 'google-deep-dive',
    name: 'Google Interview Focus',
    priority: 100,
    trigger: { companyTags: ['google'] },
    modules: [
      { moduleId: 'C002', priority: 2, weight: 15, sequence: 3 },
    ],
  },

  // Rule 4: Meta Patterns
  {
    id: 'meta-patterns',
    name: 'Meta Interview Focus',
    priority: 100,
    trigger: { companyTags: ['meta'] },
    modules: [
      { moduleId: 'C003', priority: 2, weight: 10, sequence: 3 },
    ],
  },

  // Rule 5: MBB Consulting Bundle
  {
    id: 'mbb-consulting',
    name: 'MBB Consulting Interview',
    priority: 50,
    trigger: {
      companyTags: ['mbb', 'mckinsey', 'bcg', 'bain', 'consulting-mbb'],
      roleTags: ['consultant', 'business-analyst'],
    },
    modules: [
      { moduleId: 'M009', priority: 1, weight: 40, sequence: 1 },
      { moduleId: 'R009', priority: 2, weight: 20, sequence: 2 },
      { moduleId: 'M004', priority: 2, weight: 15, sequence: 3 },
      { moduleId: 'M007', priority: 3, weight: 10, sequence: 4 },
    ],
  },

  // Rule 6: McKinsey PEI Addition
  {
    id: 'mckinsey-pei',
    name: 'McKinsey PEI Module',
    priority: 100,
    trigger: { companyTags: ['mckinsey'] },
    modules: [
      { moduleId: 'C005', priority: 1, weight: 25, sequence: 2 },
    ],
  },

  // Rule 7: Big 4 Consulting Bundle
  {
    id: 'big4-consulting',
    name: 'Big 4 Consulting Interview',
    priority: 50,
    trigger: {
      companyTags: ['consulting-big4', 'deloitte', 'pwc', 'ey', 'kpmg'],
      roleTags: ['consultant', 'business-analyst'],
    },
    modules: [
      { moduleId: 'M009', priority: 1, weight: 35, sequence: 1 },
      { moduleId: 'M004', priority: 2, weight: 25, sequence: 2 },
      { moduleId: 'R009', priority: 2, weight: 20, sequence: 3 },
      { moduleId: 'M007', priority: 3, weight: 10, sequence: 4 },
    ],
  },

  // Rule 8: ML/AI Role Additions
  {
    id: 'ml-role-additions',
    name: 'ML Engineer Additions',
    priority: 50,
    trigger: { roleTags: ['ml-engineer', 'data-scientist', 'ai-engineer', 'research-scientist'] },
    modules: [
      { moduleId: 'M001', priority: 1, weight: 25, sequence: 1 },
      { moduleId: 'M006', priority: 1, weight: 25, sequence: 2 },
      { moduleId: 'R003', priority: 1, weight: 20, sequence: 3, conditions: ['level != entry'] },
      { moduleId: 'M007', priority: 2, weight: 15, sequence: 4 },
      { moduleId: 'M004', priority: 2, weight: 10, sequence: 5 },
    ],
  },

  // Rule 9: IB Analyst Bundle
  {
    id: 'ib-analyst',
    name: 'Investment Banking Analyst',
    priority: 50,
    trigger: {
      roleTags: ['ib-analyst', 'investment-banking'],
      companyTags: ['finance-ib', 'goldman', 'jpmorgan', 'morgan-stanley'],
    },
    modules: [
      { moduleId: 'M010', priority: 1, weight: 35, sequence: 1 },
      { moduleId: 'R008', priority: 1, weight: 30, sequence: 2 },
      { moduleId: 'M004', priority: 2, weight: 15, sequence: 3 },
      { moduleId: 'I005', priority: 3, weight: 10, sequence: 4 },
    ],
  },

  // Rule 10: Goldman Sachs Addition
  {
    id: 'goldman-addition',
    name: 'Goldman Sachs Focus',
    priority: 100,
    trigger: { companyTags: ['goldman', 'goldman-sachs'] },
    modules: [
      { moduleId: 'C006', priority: 2, weight: 15, sequence: 3 },
    ],
  },

  // Rule 11: Quant Trading Bundle
  {
    id: 'quant-trading',
    name: 'Quantitative Trading',
    priority: 50,
    trigger: {
      companyTags: ['finance-quant', 'quant', 'hft', 'citadel', 'two-sigma', 'jane-street'],
      roleTags: ['quant-analyst', 'quant-trader', 'quant-researcher'],
    },
    modules: [
      { moduleId: 'R007', priority: 1, weight: 30, sequence: 1 },
      { moduleId: 'M007', priority: 1, weight: 25, sequence: 2 },
      { moduleId: 'I004', priority: 2, weight: 20, sequence: 3 },
      { moduleId: 'M001', priority: 2, weight: 15, sequence: 4 },
      { moduleId: 'M004', priority: 3, weight: 10, sequence: 5 },
    ],
  },

  // Rule 12: PM Bundle
  {
    id: 'pm-bundle',
    name: 'Product Manager Interview',
    priority: 50,
    trigger: { roleTags: ['pm', 'product-manager', 'technical-pm'] },
    modules: [
      { moduleId: 'M008', priority: 1, weight: 35, sequence: 1 },
      { moduleId: 'R005', priority: 1, weight: 20, sequence: 2 },
      { moduleId: 'M004', priority: 2, weight: 15, sequence: 3 },
      { moduleId: 'M002', priority: 3, weight: 15, sequence: 4, conditions: ['level != entry'] },
      { moduleId: 'M001', priority: 4, weight: 10, sequence: 5 },
    ],
  },

  // Rule 13: Apple Addition
  {
    id: 'apple-addition',
    name: 'Apple Focus',
    priority: 100,
    trigger: { companyTags: ['apple'] },
    modules: [
      { moduleId: 'C004', priority: 2, weight: 10, sequence: 3 },
    ],
  },

  // Rule 14: Senior/Staff Level Additions
  {
    id: 'senior-staff-additions',
    name: 'Senior+ Level Modules',
    priority: 40,
    trigger: { levelTags: ['senior', 'staff', 'principal', 'director'] },
    modules: [
      { moduleId: 'R010', priority: 2, weight: 10, sequence: 5 },
      { moduleId: 'I002', priority: 3, weight: 10, sequence: 6, conditions: ['roleCategory in swe,backend'] },
    ],
  },

  // Rule 15: Defense Contractor Additions
  {
    id: 'defense-additions',
    name: 'Defense Contractor Modules',
    priority: 80,
    trigger: { companyTags: ['defense', 'lockheed', 'raytheon', 'northrop', 'boeing'] },
    modules: [
      { moduleId: 'C009', priority: 1, weight: 15, sequence: 2 },
    ],
  },

  // Rule 16: AI Native Company Additions
  {
    id: 'ai-native-additions',
    name: 'AI Native Company Focus',
    priority: 60,
    trigger: { companyTags: ['ai-native', 'openai', 'anthropic', 'deepmind', 'xai'] },
    modules: [
      { moduleId: 'C008', priority: 2, weight: 15, sequence: 4 },
      { moduleId: 'I003', priority: 2, weight: 15, sequence: 5, conditions: ['roleCategory in research,ml-engineer'] },
    ],
  },

  // Rule 17: NVIDIA Addition
  {
    id: 'nvidia-addition',
    name: 'NVIDIA Focus',
    priority: 100,
    trigger: { companyTags: ['nvidia'] },
    modules: [
      { moduleId: 'C007', priority: 2, weight: 15, sequence: 3 },
    ],
  },

  // Rule 18: Microsoft Addition
  {
    id: 'microsoft-addition',
    name: 'Microsoft Focus',
    priority: 100,
    trigger: { companyTags: ['microsoft'] },
    modules: [
      { moduleId: 'C010', priority: 2, weight: 10, sequence: 3 },
    ],
  },
];

// ============================================================================
// Bundle Generator Functions
// ============================================================================

/**
 * Check if a position matches a trigger condition
 */
function matchesTrigger(position: Position, trigger: TriggerCondition): boolean {
  // Check companyTags - match any
  if (trigger.companyTags && trigger.companyTags.length > 0) {
    const hasMatch = trigger.companyTags.some(tag =>
      position.tags.includes(tag) ||
      position.tags.includes(tag.toLowerCase()) ||
      position.company.toLowerCase().includes(tag.toLowerCase()) ||
      position.companyCategory === tag
    );
    if (!hasMatch) return false;
  }

  // Check roleTags - match any
  if (trigger.roleTags && trigger.roleTags.length > 0) {
    const hasMatch = trigger.roleTags.some(tag =>
      position.tags.includes(tag) ||
      position.tags.includes(tag.toLowerCase()) ||
      position.role.toLowerCase().includes(tag.toLowerCase()) ||
      position.roleCategory === tag
    );
    if (!hasMatch) return false;
  }

  // Check levelTags - match any
  if (trigger.levelTags && trigger.levelTags.length > 0) {
    const hasMatch = trigger.levelTags.includes(position.level);
    if (!hasMatch) return false;
  }

  // Check requireAll - must match all
  if (trigger.requireAll && trigger.requireAll.length > 0) {
    const hasAll = trigger.requireAll.every(tag => position.tags.includes(tag));
    if (!hasAll) return false;
  }

  return true;
}

/**
 * Evaluate module conditions against position
 */
function evaluateConditions(conditions: string[], position: Position): boolean {
  for (const condition of conditions) {
    // Parse condition: "level != entry"
    if (condition.includes('!=')) {
      const [field, value] = condition.split('!=').map(s => s.trim());
      if (field === 'level' && position.level === value) return false;
    }

    // Parse condition: "level == senior"
    if (condition.includes('==')) {
      const [field, value] = condition.split('==').map(s => s.trim());
      if (field === 'level' && position.level !== value) return false;
    }

    // Parse condition: "roleCategory in swe,backend"
    if (condition.includes(' in ')) {
      const [field, values] = condition.split(' in ').map(s => s.trim());
      const allowedValues = values.split(',').map(s => s.trim());
      if (field === 'roleCategory' && !allowedValues.includes(position.roleCategory)) return false;
    }
  }
  return true;
}

/**
 * Generate a bundle for a given position
 */
export function generateBundle(position: Position): Bundle {
  // Step 1: Find all matching rules
  const matchingRules = BUNDLE_RULES.filter(rule => matchesTrigger(position, rule.trigger));

  // Step 2: Sort by priority (higher priority wins conflicts)
  matchingRules.sort((a, b) => b.priority - a.priority);

  // Step 3: Merge modules, resolving conflicts
  const moduleMap = new Map<string, ModuleSelection & { rulePriority: number }>();

  for (const rule of matchingRules) {
    for (const module of rule.modules) {
      // Skip if conditions not met
      if (module.conditions && !evaluateConditions(module.conditions, position)) {
        continue;
      }

      const existing = moduleMap.get(module.moduleId);
      if (!existing) {
        moduleMap.set(module.moduleId, { ...module, rulePriority: rule.priority });
      } else if (rule.priority > existing.rulePriority) {
        // Higher priority rule wins
        moduleMap.set(module.moduleId, { ...module, rulePriority: rule.priority });
      }
    }
  }

  // Step 4: Convert to array and normalize weights
  const modules = Array.from(moduleMap.values()).map(({ rulePriority, ...mod }) => mod);
  const totalWeight = modules.reduce((sum, m) => sum + m.weight, 0);

  if (totalWeight > 0) {
    modules.forEach(m => m.weight = Math.round((m.weight / totalWeight) * 100));
  }

  // Step 5: Sort by sequence
  modules.sort((a, b) => a.sequence - b.sequence);

  // Step 6: Calculate estimated prep time
  const estimatedHours = modules.reduce((sum, m) => {
    const moduleData = MODULE_REGISTRY[m.moduleId];
    if (!moduleData) return sum;
    return sum + moduleData.avgHours * (m.weight / 100);
  }, 0);

  // Step 7: Calculate coverage and identify gaps
  const { coverage, gaps } = calculateCoverage(modules, position);

  return {
    positionId: position.id,
    modules,
    estimatedHours: Math.round(estimatedHours),
    coverage,
    gaps,
  };
}

/**
 * Calculate content coverage for a bundle
 */
function calculateCoverage(modules: ModuleSelection[], position: Position): { coverage: number; gaps: string[] } {
  const gaps: string[] = [];
  let baseCoverage = 100;

  // Check for known gaps based on position type
  const positionType = `${position.companyCategory}-${position.roleCategory}`;

  const knownGaps: Record<string, { gap: string; penalty: number }[]> = {
    'ai-native-research-scientist': [
      { gap: 'Research presentation prep module', penalty: 15 },
    ],
    'finance-quant-quant-trader': [
      { gap: 'Mental math speed drills', penalty: 10 },
      { gap: 'Market microstructure module', penalty: 10 },
    ],
    'finance-quant-quant-analyst': [
      { gap: 'Mental math speed drills', penalty: 10 },
    ],
    'consulting-mbb-consultant': [
      { gap: 'Live case practice simulations', penalty: 10 },
    ],
    'finance-ib-ib-analyst': [
      { gap: 'Deal experience simulations', penalty: 15 },
    ],
    'defense-swe': [
      { gap: 'Defense tech stack module (Ada/VHDL)', penalty: 10 },
    ],
  };

  const posGaps = knownGaps[positionType] || [];
  for (const g of posGaps) {
    gaps.push(g.gap);
    baseCoverage -= g.penalty;
  }

  // Adjust for module completeness
  const hasCore = modules.some(m => ['M001', 'M009', 'M010', 'M008'].includes(m.moduleId));
  if (!hasCore) {
    baseCoverage -= 20;
    gaps.push('Missing core interview module');
  }

  return { coverage: Math.max(baseCoverage, 0), gaps };
}

/**
 * Generate position tags from components
 */
export function generatePositionTags(position: Omit<Position, 'tags'>): string[] {
  const tags: string[] = [];

  // Add company category
  tags.push(position.companyCategory);

  // Add company name (normalized)
  tags.push(position.company.toLowerCase().replace(/\s+/g, '-'));

  // Add role category
  tags.push(position.roleCategory);

  // Add role name (normalized)
  const roleNormalized = position.role.toLowerCase().replace(/\s+/g, '-');
  tags.push(roleNormalized);

  // Add level
  tags.push(position.level);

  // Add common aliases
  if (position.roleCategory === 'swe') {
    tags.push('software-engineer', 'engineer');
  }
  if (['entry', 'mid'].includes(position.level)) {
    tags.push('ic');
  }
  if (['staff', 'principal', 'director'].includes(position.level)) {
    tags.push('senior+', 'leadership');
  }

  return [...new Set(tags)];
}

/**
 * Create a position object with auto-generated tags
 */
export function createPosition(
  id: string,
  company: string,
  companyCategory: CompanyCategory,
  role: string,
  roleCategory: RoleCategory,
  level: Level,
  searchVolume?: number,
  hiringPriority?: number
): Position {
  const basePosition = { id, company, companyCategory, role, roleCategory, level, searchVolume, hiringPriority };
  return {
    ...basePosition,
    tags: generatePositionTags(basePosition),
  };
}

// ============================================================================
// Example Usage
// ============================================================================

// Example positions
const examplePositions: Position[] = [
  createPosition('google-swe-mid', 'Google', 'faang', 'Software Engineer', 'swe', 'mid', 49500, 88),
  createPosition('amazon-swe-entry', 'Amazon', 'faang', 'Software Engineer', 'swe', 'entry', 40500, 90),
  createPosition('mckinsey-consultant-entry', 'McKinsey', 'consulting-mbb', 'Consultant', 'consultant', 'entry', 22200),
  createPosition('gs-ib-analyst-entry', 'Goldman Sachs', 'finance-ib', 'Investment Banking Analyst', 'ib-analyst', 'entry', 14800, 78),
  createPosition('meta-mle-mid', 'Meta', 'faang', 'Machine Learning Engineer', 'ml-engineer', 'mid', 5400, 85),
  createPosition('openai-research-senior', 'OpenAI', 'ai-native', 'Research Scientist', 'research-scientist' as RoleCategory, 'senior', 5400, 90),
  createPosition('janestreet-quant-entry', 'Jane Street', 'finance-quant', 'Quantitative Trader', 'quant-trader', 'entry', 4400),
  createPosition('deloitte-consultant-entry', 'Deloitte', 'consulting-big4', 'Consultant', 'consultant', 'entry', 9900, 82),
  createPosition('apple-pm-mid', 'Apple', 'faang', 'Product Manager', 'pm', 'mid', 8100, 95),
  createPosition('lockheed-swe-mid', 'Lockheed Martin', 'defense', 'Software Engineer', 'swe', 'mid', 2900, 85),
];

// Generate bundles for all example positions
export function generateAllBundles(): Map<string, Bundle> {
  const bundles = new Map<string, Bundle>();
  for (const position of examplePositions) {
    bundles.set(position.id, generateBundle(position));
  }
  return bundles;
}

// Export for testing
export { examplePositions };
