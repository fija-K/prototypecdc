import { Department, AcademicYear, StudentStatus, Student } from '../types';

export interface ParsedNLQuery {
  rawQuery: string;
  dept?: Department;
  year?: AcademicYear;
  status?: StudentStatus;
  minScore?: number;
  dsaRequired?: boolean;
  githubActiveRequired?: boolean;
  skillName?: string;
  matchedCount: number;
}

export function parseNaturalLanguageQuery(query: string, allStudents: Student[]): { parsed: ParsedNLQuery; filteredStudents: Student[] } {
  const lower = query.toLowerCase();

  let dept: Department | undefined;
  if (lower.includes('cse') || lower.includes('computer science')) dept = 'CSE';
  else if (lower.includes('ece') || lower.includes('electronics')) dept = 'ECE';
  else if (lower.includes('it') || lower.includes('information tech')) dept = 'IT';
  else if (lower.includes('ai') || lower.includes('data science') || lower.includes('aids')) dept = 'AI_DS';
  else if (lower.includes('me') || lower.includes('mechanical')) dept = 'ME';

  let year: AcademicYear | undefined;
  if (lower.includes('3rd') || lower.includes('third') || lower.includes('junior')) year = '3rd Year';
  else if (lower.includes('4th') || lower.includes('fourth') || lower.includes('final') || lower.includes('senior')) year = '4th Year';
  else if (lower.includes('2nd') || lower.includes('second') || lower.includes('sophomore')) year = '2nd Year';
  else if (lower.includes('1st') || lower.includes('first') || lower.includes('freshman')) year = '1st Year';

  let status: StudentStatus | undefined;
  if (lower.includes('high potential')) status = 'High Potential';
  else if (lower.includes('high growth') || lower.includes('fastest growing')) status = 'High Growth';
  else if (lower.includes('needs attention') || lower.includes('at risk') || lower.includes('declining')) status = 'Needs Attention';
  else if (lower.includes('strong')) status = 'Strong';
  else if (lower.includes('developing')) status = 'Developing';

  let minScore: number | undefined;
  const scoreMatch = lower.match(/(?:score|>|above|greater than)\s*(\d{3})/);
  if (scoreMatch) {
    minScore = parseInt(scoreMatch[1], 10);
  }

  const dsaRequired = lower.includes('dsa') || lower.includes('problem solving') || lower.includes('leetcode');
  const githubActiveRequired = lower.includes('github') || lower.includes('developer') || lower.includes('commits') || lower.includes('projects');

  let skillName: string | undefined;
  if (lower.includes('backend') || lower.includes('node') || lower.includes('express')) skillName = 'Node.js / Express';
  else if (lower.includes('cloud') || lower.includes('aws')) skillName = 'AWS & Cloud';
  else if (lower.includes('system design')) skillName = 'System Design';
  else if (lower.includes('react') || lower.includes('frontend')) skillName = 'React / TypeScript';
  else if (lower.includes('python') || lower.includes('ml')) skillName = 'Python / Data Science';

  const filtered = allStudents.filter(s => {
    if (dept && s.dept !== dept) return false;
    if (year && s.year !== year) return false;
    if (status && s.status !== status) return false;
    if (minScore && s.techScore < minScore) return false;
    if (dsaRequired && s.capabilities.problemSolving < 70) return false;
    if (githubActiveRequired && s.capabilities.development < 65) return false;
    if (skillName) {
      const hasSkill = s.skills.some(sk => sk.name.toLowerCase().includes(skillName!.toLowerCase()) && (sk.level === 'Strong' || sk.level === 'Good'));
      if (!hasSkill) return false;
    }
    return true;
  });

  return {
    parsed: {
      rawQuery: query,
      dept,
      year,
      status,
      minScore,
      dsaRequired,
      githubActiveRequired,
      skillName,
      matchedCount: filtered.length
    },
    filteredStudents: filtered
  };
}
