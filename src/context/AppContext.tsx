import React, { createContext, useContext, useState } from 'react';
import { 
  Student, Group, Mentor, Opportunity, Intervention, 
  Department, AcademicYear, Batch, StudentStatus, AssignmentHistoryItem,
  UserRole, AuthUser
} from '../types';
import { 
  INITIAL_STUDENTS, INITIAL_GROUPS, INITIAL_MENTORS, 
  INITIAL_OPPORTUNITIES, INITIAL_INTERVENTIONS, INITIAL_ASSIGNMENT_HISTORY 
} from '../data/mockData';

export type ScreenId = 
  | 'login'                // Login Screen
  | 'overview'             // Screen 1
  | 'talent-pool'          // Screen 2
  | 'student-profile'      // Screen 3
  | 'groups'               // Screen 4 (Groups Dashboard)
  | 'group-detail'         // Screen 4b (Group Detail Page)
  | 'group-intelligence'   // Screen 5
  | 'skills-intelligence'  // Screen 6
  | 'opportunities'        // Screen 7 (Opportunities Landing Page)
  | 'opportunity-detail'   // Screen 7b (Opportunity Detail Page)
  | 'interventions'        // Screen 8 (Interventions Landing Page)
  | 'intervention-detail'  // Screen 8b (Intervention Detail Page)
  | 'mentor-management'    // Screen 9 (Global Mentor Management)
  | 'mentor-dashboard'     // Mentor Role Experience
  | 'student-dashboard'
  | 'student-my-profile';   // Student Role Experience

interface AppContextType {
  currentScreen: ScreenId;
  setCurrentScreen: (screen: ScreenId) => void;
  
  // Auth state
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => { success: boolean; message?: string };
  logout: () => void;

  // Selection states
  selectedStudentId: string;
  setSelectedStudentId: (id: string) => void;
  selectedGroupId: string;
  setSelectedGroupId: (id: string) => void;
  selectedOpportunityId: string;
  setSelectedOpportunityId: (id: string) => void;
  selectedInterventionId: string;
  setSelectedInterventionId: (id: string) => void;
  selectedMentorId: string;
  setSelectedMentorId: (id: string) => void;
  
  // Filter states
  deptFilter: Department | 'ALL';
  setDeptFilter: (dept: Department | 'ALL') => void;
  yearFilter: AcademicYear | 'ALL';
  setYearFilter: (year: AcademicYear | 'ALL') => void;
  batchFilter: Batch | 'ALL';
  setBatchFilter: (batch: Batch | 'ALL') => void;
  statusFilter: StudentStatus | 'ALL';
  setStatusFilter: (status: StudentStatus | 'ALL') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  nlQuery: string;
  setNlQuery: (query: string) => void;
  
  // Data Collections & Handlers
  students: Student[];
  groups: Group[];
  mentors: Mentor[];
  opportunities: Opportunity[];
  interventions: Intervention[];
  assignmentHistory: AssignmentHistoryItem[];
  
  // Actions
  assignStudentToMentor: (studentId: string, mentorId: string) => void;
  assignStudentToGroup: (studentId: string, groupId: string) => void;
  createGroup: (newGroup: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => void;
  createIntervention: (newInt: Omit<Intervention, 'id' | 'progressPercent' | 'status'>) => void;
  addStudentNote: (studentId: string, text: string) => void;
  addMentor: (newMentor: Omit<Mentor, 'id'>) => void;
  reassignStudents: (sourceMentorId: string, targetMentorId: string, count: number) => void;
  
  // Quick Navigators
  navigateToStudent: (studentId: string) => void;
  navigateToGroup: (groupId: string) => void;
  navigateToOpportunity: (oppId: string) => void;
  navigateToIntervention: (intId: string) => void;
  filterTalentPool: (status: StudentStatus | 'ALL', dept?: Department | 'ALL') => void;
  clearFilters: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('login');
  
  // Auth state
  const [user, setUser] = useState<AuthUser | null>({
    id: 'u-cdc',
    username: 'cdc',
    name: 'GLBITM CDC Admin',
    role: 'CDC',
    email: 'cdc@glbitm.ac.in',
    dept: 'CSE'
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('s1');
  const [selectedGroupId, setSelectedGroupId] = useState<string>('g1');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string>('opp1');
  const [selectedInterventionId, setSelectedInterventionId] = useState<string>('int1');
  const [selectedMentorId, setSelectedMentorId] = useState<string>('m1');

  const [deptFilter, setDeptFilter] = useState<Department | 'ALL'>('ALL');
  const [yearFilter, setYearFilter] = useState<AcademicYear | 'ALL'>('ALL');
  const [batchFilter, setBatchFilter] = useState<Batch | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<StudentStatus | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [nlQuery, setNlQuery] = useState<string>('');

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
  const [mentors, setMentors] = useState<Mentor[]>(INITIAL_MENTORS);
  const [opportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [interventions, setInterventions] = useState<Intervention[]>(INITIAL_INTERVENTIONS);
  const [assignmentHistory, setAssignmentHistory] = useState<AssignmentHistoryItem[]>(INITIAL_ASSIGNMENT_HISTORY);

  const assignStudentToMentor = (studentId: string, mentorId: string) => {
    setStudents((prev: Student[]) => prev.map((s: Student) => s.id === studentId ? { ...s, assignedMentorId: mentorId } : s));
    setMentors((prev: Mentor[]) => prev.map((m: Mentor) => {
      if (m.id === mentorId) {
        const updatedIds = Array.from(new Set([...m.assignedStudentIds, studentId]));
        const count = updatedIds.length;
        const pct = Math.round((count / 30) * 100);
        return {
          ...m,
          assignedStudentIds: updatedIds,
          studentCount: count,
          workloadPct: pct,
          workloadStatus: count < 15 ? 'Low' : count <= 30 ? 'Optimal' : 'High'
        };
      }
      return m;
    }));
  };

  const addMentor = (newMentor: Omit<Mentor, 'id'>) => {
    const id = `m${mentors.length + 1}`;
    const count = newMentor.assignedStudentIds.length || newMentor.studentCount || 0;
    const pct = Math.round((count / 30) * 100);
    const fullMentor: Mentor = {
      ...newMentor,
      id,
      studentCount: count,
      workloadPct: pct,
      workloadStatus: count < 15 ? (count === 0 ? 'None' as any : 'Low') : count <= 30 ? 'Optimal' : 'High'
    };
    setMentors((prev: Mentor[]) => [fullMentor, ...prev]);
    setAssignmentHistory((prev: AssignmentHistoryItem[]) => [
      {
        id: `h${prev.length + 1}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        action: 'Mentor Added',
        mentorName: fullMentor.name,
        details: `${fullMentor.name} added as mentor for ${fullMentor.dept} Department`,
        targetCount: 0
      },
      ...prev
    ]);
  };

  const reassignStudents = (sourceMentorId: string, targetMentorId: string, count: number) => {
    const sourceMentor = mentors.find((m: Mentor) => m.id === sourceMentorId);
    const targetMentor = mentors.find((m: Mentor) => m.id === targetMentorId);

    if (!sourceMentor || !targetMentor) return;

    setMentors((prev: Mentor[]) => prev.map((m: Mentor) => {
      if (m.id === sourceMentorId) {
        const newCount = Math.max(0, (m.studentCount || m.assignedStudentIds.length) - count);
        const newPct = Math.round((newCount / 30) * 100);
        return {
          ...m,
          studentCount: newCount,
          workloadPct: newPct,
          workloadStatus: newCount < 15 ? (newCount === 0 ? 'None' as any : 'Low') : newCount <= 30 ? 'Optimal' : 'High'
        };
      }
      if (m.id === targetMentorId) {
        const newCount = (m.studentCount || m.assignedStudentIds.length) + count;
        const newPct = Math.round((newCount / 30) * 100);
        return {
          ...m,
          studentCount: newCount,
          workloadPct: newPct,
          workloadStatus: newCount < 15 ? 'Low' : newCount <= 30 ? 'Optimal' : 'High'
        };
      }
      return m;
    }));

    setAssignmentHistory((prev: AssignmentHistoryItem[]) => [
      {
        id: `h${prev.length + 1}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        action: 'Student Reassignment',
        mentorName: targetMentor.name,
        details: `${count} students reassigned from ${sourceMentor.name} to ${targetMentor.name}`,
        targetCount: count
      },
      ...prev
    ]);
  };

  const assignStudentToGroup = (studentId: string, groupId: string) => {
    setStudents((prev: Student[]) => prev.map((s: Student) => {
      if (s.id === studentId) {
        return { ...s, assignedGroupIds: Array.from(new Set([...s.assignedGroupIds, groupId])) };
      }
      return s;
    }));
    setGroups((prev: Group[]) => prev.map((g: Group) => {
      if (g.id === groupId) {
        return { ...g, studentIds: Array.from(new Set([...g.studentIds, studentId])) };
      }
      return g;
    }));
  };

  const createGroup = (newGroup: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = `g${groups.length + 1}`;
    const fullGroup: Group = {
      ...newGroup,
      id,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setGroups((prev: Group[]) => [fullGroup, ...prev]);
  };

  const createIntervention = (newInt: Omit<Intervention, 'id' | 'progressPercent' | 'status'>) => {
    const id = `int${interventions.length + 1}`;
    const fullInt: Intervention = {
      ...newInt,
      id,
      progressPercent: 0,
      status: 'Active',
      outcomeEffectiveness: 'Initiated - baseline tracking active'
    };
    setInterventions((prev: Intervention[]) => [fullInt, ...prev]);
  };

  const addStudentNote = (studentId: string, text: string) => {
    setStudents((prev: Student[]) => prev.map((s: Student) => {
      if (s.id === studentId) {
        return {
          ...s,
          notes: [{ date: new Date().toISOString().split('T')[0], author: 'CDC Officer', text }, ...s.notes]
        };
      }
      return s;
    }));
  };

  const navigateToStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setCurrentScreen('student-profile');
  };

  const navigateToGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setCurrentScreen('group-detail');
  };

  const navigateToOpportunity = (oppId: string) => {
    setSelectedOpportunityId(oppId);
    setCurrentScreen('opportunity-detail');
  };

  const navigateToIntervention = (intId: string) => {
    setSelectedInterventionId(intId);
    setCurrentScreen('intervention-detail');
  };

  const filterTalentPool = (status: StudentStatus | 'ALL', dept: Department | 'ALL' = 'ALL') => {
    setStatusFilter(status);
    setDeptFilter(dept);
    setCurrentScreen('talent-pool');
  };

  const clearFilters = () => {
    setDeptFilter('ALL');
    setYearFilter('ALL');
    setBatchFilter('ALL');
    setStatusFilter('ALL');
    setSearchQuery('');
    setNlQuery('');
  };

  const login = (username: string, password: string, role: UserRole) => {
    // Demo credentials matching logic
    let newUser: AuthUser;
    
    if (role === 'CDC') {
      newUser = {
        id: 'u-cdc',
        username: username || 'cdc',
        name: 'GLBITM CDC Admin',
        role: 'CDC',
        email: `${username || 'cdc'}@glbitm.ac.in`,
        dept: 'CSE'
      };
      setUser(newUser);
      setIsAuthenticated(true);
      setCurrentScreen('overview');
      return { success: true };
    } else if (role === 'Mentor') {
      newUser = {
        id: 'u-mentor',
        username: username || 'mentor',
        name: 'Dr. Rajesh Sharma',
        role: 'Mentor',
        email: `${username || 'mentor'}@glbitm.ac.in`,
        dept: 'CSE'
      };
      setUser(newUser);
      setIsAuthenticated(true);
      setCurrentScreen('mentor-dashboard');
      return { success: true };
    } else {
      newUser = {
        id: 'u-student',
        username: username || 'student',
        name: 'Aarav Sharma',
        role: 'Student',
        email: `${username || 'student'}@glbitm.ac.in`,
        dept: 'CSE'
      };
      setUser(newUser);
      setIsAuthenticated(true);
      setCurrentScreen('student-dashboard');
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  return (
    <AppContext.Provider value={{
      currentScreen, setCurrentScreen,
      user, isAuthenticated, login, logout,
      selectedStudentId, setSelectedStudentId,
      selectedGroupId, setSelectedGroupId,
      selectedOpportunityId, setSelectedOpportunityId,
      selectedInterventionId, setSelectedInterventionId,
      selectedMentorId, setSelectedMentorId,
      deptFilter, setDeptFilter,
      yearFilter, setYearFilter,
      batchFilter, setBatchFilter,
      statusFilter, setStatusFilter,
      searchQuery, setSearchQuery,
      nlQuery, setNlQuery,
      students, groups, mentors, opportunities, interventions, assignmentHistory,
      assignStudentToMentor, assignStudentToGroup, createGroup, createIntervention, addStudentNote, addMentor, reassignStudents,
      navigateToStudent, navigateToGroup, navigateToOpportunity, navigateToIntervention, filterTalentPool, clearFilters
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
