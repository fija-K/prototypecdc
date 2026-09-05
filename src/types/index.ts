export type Department = 'CSE' | 'ECE' | 'IT' | 'AI_DS' | 'ME';
export type AcademicYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
export type Batch = '2024' | '2025' | '2026' | '2027';

export type StudentStatus = 
  | 'High Potential' 
  | 'High Growth' 
  | 'Strong' 
  | 'Developing' 
  | 'Needs Attention' 
  | 'Insufficient Data';

export type SkillLevel = 'Strong' | 'Good' | 'Developing' | 'Weak' | 'Insufficient Evidence';

export type UserRole = 'CDC' | 'Mentor' | 'Student';

export interface AuthUser {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  dept?: Department;
}

export type PlatformName = 
  | 'GitHub' 
  | 'LeetCode' 
  | 'Codeforces' 
  | 'CodeChef' 
  | 'GeeksforGeeks' 
  | 'HackerRank' 
  | 'AtCoder';

export type SkillSource = 'platform_derived' | 'self_declared';

export interface StudentSkill {
  name: string;
  category: 'DSA' | 'Backend' | 'Frontend' | 'Cloud' | 'DevOps' | 'AI/ML' | 'Database' | 'Systems';
  level: SkillLevel;
  source: SkillSource;
  score: number; // 0 - 100
  evidence: string;
}

export interface PlatformAccount {
  platform: PlatformName;
  handle: string;
  syncStatus: 'Synced' | 'Syncing' | 'Failed';
  lastSync: string;
  verified: boolean;
  rating?: number;
  maxRating?: number;
  problemsSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  repos?: number;
  commits30Days?: number;
  prsMerged?: number;
}

export interface TechnicalCapability {
  problemSolving: number;      // 0 - 100
  development: number;         // 0 - 100
  competitiveProgramming: number; // 0 - 100
  projectActivity: number;     // 0 - 100
  consistency: number;         // 0 - 100
}

export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  category: 'contest' | 'project' | 'milestone' | 'intervention' | 'rating';
  impact: 'positive' | 'neutral' | 'warning';
}

export interface OpportunityFit {
  opportunityId: string;
  opportunityName: string;
  company: string;
  fitScore: number; // 0 - 100
  status: 'Strong Match' | 'Potential Match' | 'Low Fit';
  strengths: string[];
  gaps: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  dept: Department;
  year: AcademicYear;
  batch: Batch;
  section: string;
  status: StudentStatus;
  techScore: number;          // 0 - 1000
  previousTechScore: number;  // score 30 days ago
  growthPercent: number;      // e.g. +14.2%
  percentiles: {
    inst: number;
    dept: number;
    batch: number;
  };
  capabilities: TechnicalCapability;
  skills: StudentSkill[];
  platforms: PlatformAccount[];
  recentSignals: string[];
  riskFlags: string[];
  timeline: TimelineMilestone[];
  opportunityFits: OpportunityFit[];
  assignedMentorId?: string;
  assignedGroupIds: string[];
  activeInterventionIds: string[];
  gpa: number;
  placementEligible: boolean;
  notes: { date: string; author: string; text: string }[];
}

export type GroupPurpose = 
  | 'Placement' 
  | 'Training' 
  | 'Mentoring' 
  | 'Intervention' 
  | 'Talent Discovery' 
  | 'Hackathon' 
  | 'Custom';

export interface Group {
  id: string;
  name: string;
  purpose: GroupPurpose | 'System Segment';
  type: 'Static' | 'Dynamic';
  statusBadge?: 'Active' | 'Intervention' | 'Draft' | 'Archived';
  subtitle?: string;
  department?: string;
  year?: string;
  criteria?: {
    dept?: Department[];
    year?: AcademicYear[];
    minScore?: number;
    dsaMin?: number;
    githubActive?: boolean;
    status?: StudentStatus[];
    dynamicRule?: string;
  };
  studentIds: string[];
  studentCount?: number;
  avgScore: number;
  growthRate: number;
  activePercent: number;
  attentionCount: number;
  activeCount?: number;
  stableCount?: number;
  targetScore?: number;
  matchScore?: number;
  readinessPercent?: number;
  devScore?: number;
  progressPercent?: number;
  projectsCount?: number;
  inactiveCount30D?: number;
  riskLevel?: string;
  owner: string;
  mentorIds: string[];
  primaryMentorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  designation?: string;
  isPrimary?: boolean;
  dept: Department;
  email: string;
  phone: string;
  assignedStudentIds: string[];
  studentCount?: number;
  assignedGroupIds: string[];
  assignedInterventionIds: string[];
  pendingReviewsCount: number;
  maxCapacity: number;
  workloadPct?: number;
  workloadStatus?: 'Low' | 'Optimal' | 'High' | 'Overloaded' | 'None';
  status: 'Active' | 'Inactive' | 'On Leave';
  specialization: string[];
}

export interface AssignmentHistoryItem {
  id: string;
  date: string;
  action: string;
  mentorName: string;
  details: string;
  targetCount?: number;
}

export type OpportunityCategory = 'Placement' | 'Internship' | 'Hackathon' | 'Training' | 'Research' | 'Competition';

export interface Opportunity {
  id: string;
  title: string;
  subtitle?: string;
  company: string;
  logo: string;
  type: OpportunityCategory | string;
  status?: 'Active' | 'Draft' | 'Upcoming' | 'Closed' | 'Completed';
  deadline: string;
  relativeDeadline?: string;
  minScore?: number;
  minGPA?: number;
  eligibleDepts?: Department[] | string[];
  eligibleYears?: AcademicYear[] | string[];
  skillRequirements?: { skill: string; minLevel: SkillLevel; weight: number }[];
  matchedCandidatesCount: {
    eligible: number;
    strong: number;
    potential: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Intervention {
  id: string;
  name: string;
  subtitle?: string;
  type: 'Skill' | 'Activity' | 'Development' | 'Competitive Programming' | 'Training' | 'CP';
  targetSkill?: string;
  studentIds: string[];
  studentCount?: number;
  groupId?: string;
  problemIdentified: string;
  mentorId: string;
  targetDescription: string;
  baselineAvgScore: number;
  currentAvgScore: number;
  targetAvgScore: number;
  startDate: string;
  deadline: string;
  progressPercent: number;
  status: 'Active' | 'In Progress' | 'Planning' | 'Needs Attention' | 'Completed' | 'Draft' | 'At Risk';
  outcomeDelta?: string;
  outcomeEffectiveness?: string;
}

export interface ScreenFilterState {
  deptFilter: Department | 'ALL';
  yearFilter: AcademicYear | 'ALL';
  batchFilter: Batch | 'ALL';
  statusFilter: StudentStatus | 'ALL';
  searchQuery: string;
  naturalLanguageQuery: string;
}
