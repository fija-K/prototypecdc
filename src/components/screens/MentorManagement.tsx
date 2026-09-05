import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mentor, Department } from '../../types';
import { 
  AssignMentorModal, AddMentorModal 
} from '../layout/ActionModals';
import { ReassignStudentsModal } from '../common/ReassignStudentsModal';
import { 
  Users, UserCheck, GraduationCap, AlertTriangle, Calendar, 
  BarChart3, Plus, ChevronDown, MoreHorizontal, Search, Filter, 
  RotateCcw, ShieldAlert, FolderGit2, LifeBuoy, ArrowRight, 
  ChevronLeft, ChevronRight, CheckCircle2, Phone, Mail, UserPlus, 
  Award, Clock, ExternalLink, HelpCircle, Layers, FileText, Target
} from 'lucide-react';

export const MentorManagement: React.FC = () => {
  const { 
    mentors, students, groups, interventions, assignmentHistory, 
    selectedMentorId, setSelectedMentorId, 
    navigateToStudent, navigateToGroup, navigateToIntervention, filterTalentPool 
  } = useApp();

  // Local Modal States
  const [isAddMentorOpen, setIsAddMentorOpen] = useState(false);
  const [isAssignMentorOpen, setIsAssignMentorOpen] = useState(false);
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  const [reassignSourceId, setReassignSourceId] = useState<string>('m4');

  // Navigation & Filtering States
  const [activeTab, setActiveTab] = useState<'mentors' | 'groups' | 'interventions' | 'unassigned' | 'history'>('mentors');
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('ALL');
  const [workloadFilter, setWorkloadFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Row Action Dropdown Menu state
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // Detail Section Sub-Tab
  const [detailTab, setDetailTab] = useState<'students' | 'groups' | 'interventions' | 'activity'>('students');

  // Dynamic Metrics Calculations
  const totalMentors = mentors.length || 42;
  const activeMentorsList = mentors.filter((m: Mentor) => m.status === 'Active');
  const activeMentorsCount = activeMentorsList.length;
  const activePct = Math.round((activeMentorsCount / totalMentors) * 100);

  const totalAssignedStudents = mentors.reduce((acc: number, m: Mentor) => acc + (m.studentCount || m.assignedStudentIds.length), 0);
  const unassignedStudentsCount = 64; // Institution unassigned pool
  const pendingReviewsTotal = mentors.reduce((acc: number, m: Mentor) => acc + m.pendingReviewsCount, 0);

  const avgStudentsPerMentor = (totalAssignedStudents / (activeMentorsCount || 1)).toFixed(1);

  // Selected Mentor
  const selectedMentor = mentors.find((m: Mentor) => m.id === selectedMentorId) || mentors[0];

  // Filtering Logic
  const filteredMentors = mentors.filter((m: Mentor) => {
    // Tab filter
    if (activeTab === 'unassigned') return false; // Handled separately or filtered

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = m.name.toLowerCase().includes(q);
      const deptMatch = m.dept.toLowerCase().includes(q);
      const titleMatch = m.title.toLowerCase().includes(q);
      if (!nameMatch && !deptMatch && !titleMatch) return false;
    }

    // Dept filter
    if (deptFilter !== 'ALL' && m.dept !== deptFilter) return false;

    // Workload filter
    if (workloadFilter !== 'ALL') {
      const count = m.studentCount || m.assignedStudentIds.length;
      if (workloadFilter === 'Low' && count >= 15) return false;
      if (workloadFilter === 'Optimal' && (count < 15 || count > 30)) return false;
      if (workloadFilter === 'High' && count <= 30) return false;
      if (workloadFilter === 'Overloaded' && count <= 35) return false;
    }

    // Status filter
    if (statusFilter !== 'ALL' && m.status !== statusFilter) return false;

    return true;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredMentors.length / itemsPerPage);
  const paginatedMentors = filteredMentors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Workload Distribution counts
  const lowWorkloadCount = mentors.filter((m: Mentor) => (m.studentCount || m.assignedStudentIds.length) < 15).length;
  const optimalWorkloadCount = mentors.filter((m: Mentor) => {
    const c = m.studentCount || m.assignedStudentIds.length;
    return c >= 15 && c <= 30;
  }).length;
  const highWorkloadCount = mentors.filter((m: Mentor) => (m.studentCount || m.assignedStudentIds.length) > 30).length;

  const lowPct = Math.round((lowWorkloadCount / mentors.length) * 100);
  const optimalPct = Math.round((optimalWorkloadCount / mentors.length) * 100);
  const highPct = Math.round((highWorkloadCount / mentors.length) * 100);

  // Sample Assigned Students for Selected Mentor
  const sampleAssignedStudents = [
    { id: 'ts1', name: 'Aarav Sharma', dept: 'CSE', year: '3rd Year', score: 892, growth: '+18%', status: 'High Potential', lastReview: '2 days ago' },
    { id: 'ts6', name: 'Neha Reddy', dept: 'CSE', year: '3rd Year', score: 846, growth: '+21%', status: 'High Growth', lastReview: '1 day ago' },
    { id: 'ts10', name: 'Rohan Mehta', dept: 'CSE', year: '3rd Year', score: 812, growth: '+12%', status: 'Strong', lastReview: '3 days ago' },
    { id: 'ts4', name: 'Ishita Verma', dept: 'CSE', year: '3rd Year', score: 768, growth: '+9%', status: 'Developing', lastReview: '5 days ago' },
    { id: 'ts5', name: 'Karan Singh', dept: 'CSE', year: '3rd Year', score: 732, growth: '+14%', status: 'Strong', lastReview: '2 days ago' },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 font-sans select-none">
      
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>Mentor Management</span>
            <span>&gt;</span>
            <span className="text-blue-400 font-medium">Overview</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Mentor Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage mentors, assign responsibilities, and ensure effective mentoring coverage across students and groups.
          </p>
        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddMentorOpen(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-950 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Mentor
          </button>

          <button
            onClick={() => setIsAssignMentorOpen(true)}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-indigo-400" />
            Assign Mentor
          </button>

          <button
            onClick={() => alert("Generating institution mentor allocation report...")}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            Export Report
          </button>

          <button className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-slate-400 hover:text-slate-200">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards Row (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Card 1: Total Mentors */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Total Mentors</span>
            <div className="p-1 rounded-full bg-purple-950 text-purple-400 border border-purple-800/60">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100">{totalMentors}</div>
          <div className="text-[11px] text-slate-400">Across all departments</div>
        </div>

        {/* Card 2: Active Mentors */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Active Mentors</span>
            <div className="p-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100">{activeMentorsCount}</div>
          <div className="text-[11px] text-emerald-400 font-medium">{activePct}% active</div>
        </div>

        {/* Card 3: Students Assigned */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Students Assigned</span>
            <div className="p-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100">1,842</div>
          <div className="text-[11px] text-slate-400">Across all mentors</div>
        </div>

        {/* Card 4: Unassigned Students */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Unassigned Students</span>
            <div className="p-1 rounded-full bg-amber-950 text-amber-400 border border-amber-800/60">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-400">{unassignedStudentsCount}</div>
          <div className="text-[11px] text-amber-400 font-medium">18 need immediate attention</div>
        </div>

        {/* Card 5: Pending Reviews */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Pending Reviews</span>
            <div className="p-1 rounded-full bg-rose-950 text-rose-400 border border-rose-800/60">
              <Calendar className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100">{pendingReviewsTotal || 27}</div>
          <div className="text-[11px] text-slate-400">Across all mentors</div>
        </div>

        {/* Card 6: Avg. Students per Mentor */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1 border-rose-900/50">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Avg. Students per Mentor</span>
            <div className="p-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-400">48.5</div>
          <div className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
            <span>Recommended: 15–30</span>
            <span title="48.5 is above recommended capacity (15-30)">🛈</span>
          </div>
        </div>

      </div>

      {/* 3. Horizontal Main Tabs */}
      <div className="flex border-b border-slate-800/80 text-xs font-semibold">
        {[
          { id: 'mentors', label: `Mentors (${activeMentorsCount})` },
          { id: 'groups', label: 'Groups' },
          { id: 'interventions', label: 'Interventions' },
          { id: 'unassigned', label: `Unassigned Students (${unassignedStudentsCount})` },
          { id: 'history', label: 'Assignment History' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-400 font-bold bg-blue-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800/80 rounded-xl p-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search mentor name, department..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Department Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Department</span>
            <select
              value={deptFilter}
              onChange={(e) => { setDeptFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All</option>
              <option value="CSE">CSE</option>
              <option value="AI_DS">AIML</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="ME">MECH</option>
            </select>
          </div>

          {/* Workload Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Workload</span>
            <select
              value={workloadFilter}
              onChange={(e) => { setWorkloadFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All</option>
              <option value="Low">Low (0-15)</option>
              <option value="Optimal">Optimal (15-30)</option>
              <option value="High">High (31+)</option>
              <option value="Overloaded">Overloaded</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        {(deptFilter !== 'ALL' || workloadFilter !== 'ALL' || statusFilter !== 'ALL' || searchQuery !== '') && (
          <button
            onClick={() => {
              setDeptFilter('ALL');
              setWorkloadFilter('ALL');
              setStatusFilter('ALL');
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Filters
          </button>
        )}
      </div>

      {/* 5. Main Split Section: Table (Left ~65%) & Stacked Panels (Right ~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Main Enterprise Mentor Table (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-4 shadow-xl">
            
            {/* Table Header / View Title */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wider">Institution Mentor Directory</span>
              <span className="text-slate-400">{filteredMentors.length} Mentors Found</span>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Mentor</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Students Assigned ⇅</th>
                    <th className="py-2.5 px-3 text-center">Groups</th>
                    <th className="py-2.5 px-3 text-center">Interventions</th>
                    <th className="py-2.5 px-3 text-center">Pending Reviews</th>
                    <th className="py-2.5 px-3">Workload</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {paginatedMentors.map((m: Mentor) => {
                    const count = m.studentCount || m.assignedStudentIds.length;
                    const isSelected = m.id === selectedMentorId;
                    const pct = m.workloadPct || Math.round((count / 30) * 100);

                    return (
                      <tr 
                        key={m.id}
                        onClick={() => setSelectedMentorId(m.id)}
                        className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                          isSelected ? 'bg-indigo-950/40 border-l-2 border-l-blue-500' : ''
                        }`}
                      >
                        {/* Mentor Avatar & Name */}
                        <td className="py-3 px-3 min-w-[180px]">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-indigo-900/80 border border-indigo-700 flex items-center justify-center font-bold text-xs text-indigo-200 shrink-0">
                              {m.name.split(' ').map((n: string) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-bold text-slate-100 flex items-center gap-1.5">
                                {m.name}
                                {m.isPrimary && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-950 text-blue-300 border border-blue-800">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {m.designation || m.title}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Department Badge */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-300">
                            {m.dept}
                          </span>
                        </td>

                        {/* Students Assigned & Workload Tag */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-100 font-mono">{count}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              count === 0 ? 'bg-slate-800 text-slate-400' :
                              count < 15 ? 'text-blue-400 bg-blue-950/60' :
                              count <= 30 ? 'text-emerald-400 bg-emerald-950/60' :
                              'text-amber-400 bg-amber-950/60'
                            }`}>
                              ({count === 0 ? 'None' : count < 15 ? 'Low' : count <= 30 ? 'Optimal' : 'High'})
                            </span>
                          </div>
                        </td>

                        {/* Groups */}
                        <td className="py-3 px-3 text-center whitespace-nowrap font-mono font-semibold text-slate-200">
                          {m.assignedGroupIds.length}
                        </td>

                        {/* Interventions */}
                        <td className="py-3 px-3 text-center whitespace-nowrap font-mono font-semibold text-slate-200">
                          {m.assignedInterventionIds.length}
                        </td>

                        {/* Pending Reviews */}
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                            m.pendingReviewsCount > 0 ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60' : 'text-slate-500'
                          }`}>
                            {m.pendingReviewsCount}
                          </span>
                        </td>

                        {/* Workload Progress % */}
                        <td className="py-3 px-3 whitespace-nowrap min-w-[100px]">
                          <div className="space-y-1 font-mono text-[10px]">
                            <div className="flex justify-between">
                              <span className={`font-bold ${pct > 100 ? 'text-rose-400' : pct > 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {pct}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                              <div 
                                className={`h-full rounded-full ${pct > 100 ? 'bg-rose-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        {/* Actions Status & Menu */}
                        <td className="py-3 px-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              m.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-slate-900 text-slate-500 border-slate-800'
                            }`}>
                              {m.status}
                            </span>

                            <div className="relative">
                              <button
                                onClick={() => setOpenActionMenuId(openActionMenuId === m.id ? null : m.id)}
                                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>

                              {openActionMenuId === m.id && (
                                <div className="absolute right-0 top-6 w-44 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl py-1 z-30 text-left text-xs font-sans">
                                  <button
                                    onClick={() => { setSelectedMentorId(m.id); setOpenActionMenuId(null); }}
                                    className="w-full px-3 py-1.5 text-left text-slate-200 hover:bg-slate-800"
                                  >
                                    View Mentor Dossier
                                  </button>
                                  <button
                                    onClick={() => { setIsAssignMentorOpen(true); setOpenActionMenuId(null); }}
                                    className="w-full px-3 py-1.5 text-left text-slate-200 hover:bg-slate-800"
                                  >
                                    Assign Students
                                  </button>
                                  <button
                                    onClick={() => { setReassignSourceId(m.id); setIsReassignOpen(true); setOpenActionMenuId(null); }}
                                    className="w-full px-3 py-1.5 text-left text-slate-200 hover:bg-slate-800"
                                  >
                                    Reassign Students
                                  </button>
                                  <button
                                    onClick={() => { setOpenActionMenuId(null); }}
                                    className="w-full px-3 py-1.5 text-left text-rose-400 hover:bg-slate-800"
                                  >
                                    {m.status === 'Active' ? 'Deactivate Mentor' : 'Activate Mentor'}
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800/80 pt-3 text-xs text-slate-400">
              <div>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredMentors.length)} of {filteredMentors.length} mentors
              </div>

              <div className="flex items-center gap-1 font-mono">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-300 disabled:opacity-40"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  const pNum = i + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`px-2.5 py-1 rounded text-xs font-bold ${
                        currentPage === pNum ? 'bg-blue-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="px-1 text-slate-500">...</span>}
                {totalPages > 5 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      currentPage === totalPages ? 'bg-blue-600 text-white' : 'bg-slate-950 border border-slate-800 text-slate-400'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="p-1 rounded bg-slate-950 border border-slate-800 text-slate-300 disabled:opacity-40"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Stacked Side Panels (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Panel 1: Workload Distribution Donut Panel */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Workload Distribution</h3>
              <span className="text-[11px] font-semibold text-slate-400">{activeMentorsCount} Active</span>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              {/* Donut graphic */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-800" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-500" strokeDasharray={`${lowPct}, 100`} strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-emerald-500" strokeDasharray={`${optimalPct}, 100`} strokeDashoffset={`-${lowPct}`} strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-amber-500" strokeDasharray={`${highPct}, 100`} strokeDashoffset={`-${lowPct + optimalPct}`} strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-lg font-bold text-slate-100">{activeMentorsCount}</span>
                  <span className="text-[9px] text-slate-400 block uppercase">Mentors</span>
                </div>
              </div>

              {/* Legend List (Clicking filters main table) */}
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => setWorkloadFilter('Low')}
                  className="w-full flex justify-between items-center text-left hover:bg-slate-800/60 p-1 rounded transition-colors"
                >
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded bg-blue-500"></span> Low (0–15)
                  </span>
                  <span className="font-semibold text-slate-200">{lowWorkloadCount} ({lowPct}%)</span>
                </button>

                <button
                  onClick={() => setWorkloadFilter('Optimal')}
                  className="w-full flex justify-between items-center text-left hover:bg-slate-800/60 p-1 rounded transition-colors"
                >
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Optimal (16–30)
                  </span>
                  <span className="font-semibold text-slate-200">{optimalWorkloadCount} ({optimalPct}%)</span>
                </button>

                <button
                  onClick={() => setWorkloadFilter('High')}
                  className="w-full flex justify-between items-center text-left hover:bg-slate-800/60 p-1 rounded transition-colors"
                >
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> High (31+)
                  </span>
                  <span className="font-semibold text-slate-200">{highWorkloadCount} ({highPct}%)</span>
                </button>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Goal: Keep students per mentor between 15–30 for effective mentoring.</span>
            </div>
          </div>

          {/* Panel 2: Unassigned Students Panel */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Unassigned Students</h3>
              <button onClick={() => filterTalentPool('Needs Attention')} className="text-[11px] text-blue-400 hover:underline font-medium">
                View all
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-400">64</span>
              <span className="text-xs text-slate-400">Students without a mentor</span>
            </div>

            {/* Department Breakdown list */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg flex justify-between">
                <span className="text-slate-400">CSE</span>
                <span className="font-bold text-slate-200">31 (48%)</span>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg flex justify-between">
                <span className="text-slate-400">IT</span>
                <span className="font-bold text-slate-200">18 (28%)</span>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg flex justify-between">
                <span className="text-slate-400">ECE</span>
                <span className="font-bold text-slate-200">9 (14%)</span>
              </div>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded-lg flex justify-between">
                <span className="text-slate-400">AIML</span>
                <span className="font-bold text-slate-200">6 (9%)</span>
              </div>
            </div>

            <button
              onClick={() => setIsAssignMentorOpen(true)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-colors"
            >
              Assign Mentors
            </button>
          </div>

          {/* Panel 3: Responsibilities & Top Overloaded Mentors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Responsibilities Overview */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5">
              <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800/60 pb-1.5">
                Responsibilities Overview
              </h4>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Groups Managed</span>
                  <span className="font-bold text-slate-200">46</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Interventions Owned</span>
                  <span className="font-bold text-slate-200">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Needs Attention</span>
                  <span className="font-bold text-amber-400">87</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Upcoming Reviews</span>
                  <span className="font-bold text-indigo-400">27</span>
                </div>
              </div>
            </div>

            {/* Top Overloaded Mentors */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-2.5">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-1.5">
                <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Top Overloaded Mentors</h4>
                <button onClick={() => setWorkloadFilter('High')} className="text-[10px] text-blue-400 hover:underline">View all</button>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { rank: 1, name: 'Prof. Karan Verma', count: 38, pct: '127%', color: 'text-rose-400' },
                  { rank: 2, name: 'Prof. Neha Sharma', count: 31, pct: '103%', color: 'text-rose-400' },
                  { rank: 3, name: 'Dr. Rahul Mehta', count: 22, pct: '73%', color: 'text-emerald-400' },
                ].map((item) => (
                  <div key={item.rank} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 text-slate-500 font-mono font-bold">{item.rank}</span>
                      <span className="font-medium text-slate-200">{item.name}</span>
                    </div>
                    <div className="font-mono">
                      <span className="text-slate-400">{item.count} stds </span>
                      <span className={`font-bold ${item.color}`}>({item.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 6. Selected Mentor Details Section (Bottom Section) */}
      <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-5 space-y-5 shadow-xl">
        
        {/* Section Header */}
        <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
          <h2 className="text-base font-bold text-slate-100">
            Mentor Details: <span className="text-blue-400">{selectedMentor.name}</span>
          </h2>
          <button 
            onClick={() => setSelectedMentorId('m1')} 
            className="text-xs text-slate-400 hover:text-slate-200 font-medium"
          >
            Back to list
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Profile Card (3 Cols) */}
          <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center font-bold text-base text-indigo-200 shrink-0">
                {selectedMentor.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <div className="font-bold text-slate-100 text-sm">{selectedMentor.name}</div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {selectedMentor.isPrimary ? 'Primary Mentor' : 'Mentor'}
                </span>
                <div className="text-[11px] text-slate-400 mt-1">{selectedMentor.title}</div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-300">{selectedMentor.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-300">{selectedMentor.phone}</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono pt-2 border-t border-slate-800">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Students Assigned</span>
                <span className="font-bold text-slate-100 text-sm">{selectedMentor.studentCount || selectedMentor.assignedStudentIds.length}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Groups Managed</span>
                <span className="font-bold text-slate-100 text-sm">{selectedMentor.assignedGroupIds.length}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Interventions Owned</span>
                <span className="font-bold text-slate-100 text-sm">{selectedMentor.assignedInterventionIds.length}</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Pending Reviews</span>
                <span className="font-bold text-amber-400 text-sm">{selectedMentor.pendingReviewsCount}</span>
              </div>
            </div>

            <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-xs font-semibold text-slate-200 transition-colors">
              View Full Profile
            </button>
          </div>

          {/* Center Panel: Selected Mentor Sub-Tabs & Assigned Students Table (6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex border-b border-slate-800 text-xs font-semibold">
              {[
                { id: 'students', label: `Assigned Students (${selectedMentor.studentCount || selectedMentor.assignedStudentIds.length})` },
                { id: 'groups', label: `Groups (${selectedMentor.assignedGroupIds.length})` },
                { id: 'interventions', label: `Interventions (${selectedMentor.assignedInterventionIds.length})` },
                { id: 'activity', label: 'Recent Activity' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setDetailTab(t.id as any)}
                  className={`px-3 py-2 border-b-2 transition-colors ${
                    detailTab === t.id
                      ? 'border-blue-500 text-blue-400 font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {detailTab === 'students' && (
              <div className="space-y-3">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase text-[9px] tracking-wider">
                        <th className="py-2 px-2">Student</th>
                        <th className="py-2 px-2">Department</th>
                        <th className="py-2 px-2">Year</th>
                        <th className="py-2 px-2">Technical Score</th>
                        <th className="py-2 px-2">Growth (30D)</th>
                        <th className="py-2 px-2">Status</th>
                        <th className="py-2 px-2">Last Review</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {sampleAssignedStudents.map(s => (
                        <tr key={s.id} onClick={() => navigateToStudent('s1')} className="hover:bg-slate-800/40 cursor-pointer">
                          <td className="py-2.5 px-2 font-sans font-bold text-slate-200 hover:text-blue-400">
                            {s.name}
                          </td>
                          <td className="py-2.5 px-2 text-slate-400">{s.dept}</td>
                          <td className="py-2.5 px-2 text-slate-400">{s.year}</td>
                          <td className="py-2.5 px-2 font-bold text-indigo-400">{s.score}</td>
                          <td className="py-2.5 px-2 font-bold text-emerald-400">{s.growth}</td>
                          <td className="py-2.5 px-2 font-sans">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                              {s.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-slate-400 text-[10px]">{s.lastReview}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-right">
                  <button onClick={() => filterTalentPool('ALL')} className="text-xs text-blue-400 hover:underline font-semibold">
                    View all {selectedMentor.studentCount || 22} students →
                  </button>
                </div>
              </div>
            )}

            {detailTab === 'groups' && (
              <div className="space-y-2 text-xs">
                {groups.slice(0, 2).map((g: any) => (
                  <div key={g.id} onClick={() => navigateToGroup(g.id)} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-500">
                    <div>
                      <div className="font-bold text-slate-200">{g.name}</div>
                      <div className="text-slate-400 text-[11px]">{g.purpose} Group • {g.studentCount || g.studentIds.length} Students</div>
                    </div>
                    <span className="text-xs text-blue-400 font-semibold">View Group →</span>
                  </div>
                ))}
              </div>
            )}

            {detailTab === 'interventions' && (
              <div className="space-y-2 text-xs">
                {interventions.slice(0, 1).map((i: any) => (
                  <div key={i.id} onClick={() => navigateToIntervention(i.id)} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-500">
                    <div>
                      <div className="font-bold text-slate-200">{i.name}</div>
                      <div className="text-slate-400 text-[11px]">{i.type} Action • {i.progressPercent}% Completed</div>
                    </div>
                    <span className="text-xs text-blue-400 font-semibold">View Intervention →</span>
                  </div>
                ))}
              </div>
            )}

            {detailTab === 'activity' && (
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
                Log: Conducted 1-on-1 code reviews for 5 candidates in Microsoft SDE cohort.
              </div>
            )}
          </div>

          {/* Right Column: Assignment History & Quick Actions (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Assignment History */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-1.5">
                <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Assignment History</h4>
                <span className="text-[10px] text-blue-400 cursor-pointer">View all</span>
              </div>

              <div className="space-y-3 text-xs">
                {assignmentHistory.map((item: any) => (
                  <div key={item.id} className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-500 block">{item.date}</span>
                    <p className="text-slate-300 leading-snug">
                      <span className="font-bold text-indigo-300">{item.mentorName}</span> {item.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
              <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800/60 pb-1.5">
                Quick Actions
              </h4>

              <div className="space-y-1.5 text-xs">
                <button 
                  onClick={() => setIsAssignMentorOpen(true)}
                  className="w-full p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded font-medium text-left flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5 text-blue-400" />
                  Assign Mentor to Group
                </button>
                <button 
                  onClick={() => setIsAssignMentorOpen(true)}
                  className="w-full p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded font-medium text-left flex items-center gap-2"
                >
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                  Assign Mentor to Students
                </button>
                <button 
                  onClick={() => setIsAssignMentorOpen(true)}
                  className="w-full p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded font-medium text-left flex items-center gap-2"
                >
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  Assign Mentor to Intervention
                </button>
                <button 
                  onClick={() => { setReassignSourceId(selectedMentor.id); setIsReassignOpen(true); }}
                  className="w-full p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded font-medium text-left flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  Reassign Students
                </button>
                <button 
                  onClick={() => filterTalentPool('Needs Attention')}
                  className="w-full p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded font-medium text-left flex items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  View Unassigned Students
                </button>
                <button 
                  onClick={() => setWorkloadFilter('High')}
                  className="w-full p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded font-medium text-left flex items-center gap-2"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-rose-400" />
                  View Mentor Workload
                </button>
                <button 
                  onClick={() => alert("Exporting mentor allocation dataset...")}
                  className="w-full p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded font-medium text-left flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  Export Mentor Allocation
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive Modals */}
      <AddMentorModal isOpen={isAddMentorOpen} onClose={() => setIsAddMentorOpen(false)} />
      <AssignMentorModal isOpen={isAssignMentorOpen} onClose={() => setIsAssignMentorOpen(false)} />
      <ReassignStudentsModal
        isOpen={isReassignOpen}
        onClose={() => setIsReassignOpen(false)}
        sourceMentorId={reassignSourceId}
        onReassign={(srcId, targetId, count) => {
          const { reassignStudents } = useApp();
          reassignStudents(srcId, targetId, count);
        }}
      />
    </div>
  );
};
