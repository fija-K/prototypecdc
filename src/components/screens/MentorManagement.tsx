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
  Award, Clock, ExternalLink, HelpCircle, Layers, FileText, Target,
  X, Check, Sparkles
} from 'lucide-react';

export const MentorManagement: React.FC = () => {
  const { 
    mentors, students, groups, interventions, assignmentHistory, 
    selectedMentorId, setSelectedMentorId, 
    navigateToStudent, navigateToGroup, navigateToIntervention, filterTalentPool,
    reassignStudents
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

  // Detail Section Sub-Tab
  const [detailTab, setDetailTab] = useState<'students' | 'groups' | 'interventions' | 'activity'>('students');

  // Reference Key KPI Counts
  const totalMentors = 42;
  const activeMentorsCount = 38;
  const totalAssignedStudents = 1842;
  const unassignedStudentsCount = 64;
  const pendingReviewsTotal = 27;
  const avgStudentsPerMentor = "48.5";

  // Selected Mentor logic
  const selectedMentor = mentors.find((m: Mentor) => m.id === selectedMentorId) || mentors[0];

  // Filtering Logic
  const filteredMentors = mentors.filter((m: Mentor) => {
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

  // Sample Assigned Students for Selected Mentor
  const sampleAssignedStudents = [
    { id: 'ts1', name: 'Aarav Sharma', dept: 'CSE', year: '3rd Year', score: 892, growth: '+18%', status: 'High Potential', lastReview: '2 days ago' },
    { id: 'ts6', name: 'Neha Reddy', dept: 'CSE', year: '3rd Year', score: 846, growth: '+21%', status: 'High Growth', lastReview: '1 day ago' },
    { id: 'ts10', name: 'Rohan Mehta', dept: 'CSE', year: '3rd Year', score: 812, growth: '+12%', status: 'Strong', lastReview: '3 days ago' },
    { id: 'ts4', name: 'Ishita Verma', dept: 'CSE', year: '3rd Year', score: 768, growth: '+9%', status: 'Developing', lastReview: '5 days ago' },
    { id: 'ts5', name: 'Karan Singh', dept: 'CSE', year: '3rd Year', score: 732, growth: '+14%', status: 'Strong', lastReview: '2 days ago' },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-[#F8FAFC] text-slate-800 font-sans">
      
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
            <span>Mentor Management</span>
            <span>&gt;</span>
            <span className="text-blue-600 font-semibold">Overview</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Mentor Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage mentors, assign responsibilities, and ensure effective mentoring coverage across students and groups.
          </p>
        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAddMentorOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Mentor
          </button>

          <button
            onClick={() => setIsAssignMentorOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-all"
          >
            <UserCheck className="w-4 h-4 text-blue-600" />
            Assign Mentor
          </button>

          <button
            onClick={() => alert("Generating institution mentor allocation report...")}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-medium shadow-2xs flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            Export Report
          </button>

          <button className="p-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards Row (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Card 1: Total Mentors */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
            <span>Total Mentors</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalMentors}</div>
          <div className="text-[11px] text-slate-500">Across all departments</div>
        </div>

        {/* Card 2: Active Mentors */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
            <span>Active Mentors</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{activeMentorsCount}</div>
          <div className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded w-fit">90% active</div>
        </div>

        {/* Card 3: Students Assigned */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
            <span>Students Assigned</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">1,842</div>
          <div className="text-[11px] text-slate-500">Across all mentors</div>
        </div>

        {/* Card 4: Unassigned Students */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
            <span>Unassigned Students</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600">64</div>
          <div className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded w-fit">18 need immediate attention</div>
        </div>

        {/* Card 5: Pending Reviews */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
            <span>Pending Reviews</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600">27</div>
          <div className="text-[11px] text-slate-500">Across all mentors</div>
        </div>

        {/* Card 6: Avg. Students per Mentor */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
          <div className="flex justify-between items-center text-slate-500 text-xs font-medium">
            <span>Avg. Students per Mentor</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{avgStudentsPerMentor}</div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            Recommended: 15 – 30 <HelpCircle className="w-3 h-3 text-slate-400" />
          </div>
        </div>

      </div>

      {/* 3. Global Tabs Navigation Bar */}
      <div className="border-b border-slate-200 flex items-center gap-6 overflow-x-auto text-xs font-medium">
        {[
          { id: 'mentors', label: 'Mentors (38)' },
          { id: 'groups', label: 'Groups' },
          { id: 'interventions', label: 'Interventions' },
          { id: 'unassigned', label: 'Unassigned Students (64)' },
          { id: 'history', label: 'Assignment History' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 transition-all whitespace-nowrap font-semibold ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Filter Bar & Main Directory Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width): Mentors Directory Table */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Filter Bar Header inside Table Box */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search mentor name, department..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Dropdowns */}
                <div className="flex items-center gap-2">
                  <select
                    value={deptFilter}
                    onChange={e => setDeptFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-blue-500"
                  >
                    <option value="ALL">Department: All</option>
                    <option value="CSE">CSE</option>
                    <option value="AIML">AIML</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                  </select>

                  <select
                    value={workloadFilter}
                    onChange={e => setWorkloadFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-blue-500"
                  >
                    <option value="ALL">Workload: All</option>
                    <option value="Low">Low (0–15)</option>
                    <option value="Optimal">Optimal (16–30)</option>
                    <option value="High">High (31+)</option>
                    <option value="Overloaded">Overloaded</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-blue-500"
                  >
                    <option value="ALL">Status: All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                  </select>

                  {(deptFilter !== 'ALL' || workloadFilter !== 'ALL' || statusFilter !== 'ALL' || searchQuery) && (
                    <button
                      onClick={() => {
                        setDeptFilter('ALL');
                        setWorkloadFilter('ALL');
                        setStatusFilter('ALL');
                        setSearchQuery('');
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap ml-1"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* Mentor Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Mentor</th>
                    <th className="py-3 px-3">Department</th>
                    <th className="py-3 px-3 text-center">Students Assigned</th>
                    <th className="py-3 px-3 text-center">Groups</th>
                    <th className="py-3 px-3 text-center">Interventions</th>
                    <th className="py-3 px-3 text-center">Pending Reviews</th>
                    <th className="py-3 px-3">Workload</th>
                    <th className="py-3 px-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 bg-white">
                  {/* Fixed 7 Representative Rows from Visual Source of Truth */}
                  {[
                    { id: 'm1', name: 'Dr. Rahul Mehta', title: 'Associate Professor', isPrimary: true, dept: 'CSE', count: 22, wlTag: 'Optimal', wlColor: 'text-emerald-600', groups: 2, interventions: 1, pending: 3, pct: 73, status: 'Active' },
                    { id: 'm2', name: 'Prof. Neha Sharma', title: 'Assistant Professor', isPrimary: true, dept: 'CSE', count: 31, wlTag: 'High', wlColor: 'text-rose-600', groups: 3, interventions: 2, pending: 1, pct: 103, status: 'Active' },
                    { id: 'm3', name: 'Prof. Arjun Rao', title: 'Assistant Professor', isPrimary: false, dept: 'IT', count: 18, wlTag: 'Optimal', wlColor: 'text-emerald-600', groups: 1, interventions: 0, pending: 0, pct: 60, status: 'Active' },
                    { id: 'm4', name: 'Prof. Karan Verma', title: 'Assistant Professor', isPrimary: false, dept: 'IT', count: 38, wlTag: 'High', wlColor: 'text-rose-600', groups: 4, interventions: 1, pending: 4, pct: 127, status: 'Active' },
                    { id: 'm5', name: 'Dr. Pooja Iyer', title: 'Associate Professor', isPrimary: false, dept: 'AIML', count: 15, wlTag: 'Optimal', wlColor: 'text-emerald-600', groups: 1, interventions: 1, pending: 0, pct: 50, status: 'Active' },
                    { id: 'm6', name: 'Prof. Sandeep Singh', title: 'Assistant Professor', isPrimary: false, dept: 'ECE', count: 12, wlTag: 'Low', wlColor: 'text-blue-600', groups: 1, interventions: 0, pending: 0, pct: 40, status: 'Active' },
                    { id: 'm7', name: 'Prof. Aisha Khan', title: 'Assistant Professor', isPrimary: false, dept: 'CSE', count: 0, wlTag: 'None', wlColor: 'text-slate-400', groups: 0, interventions: 0, pending: 0, pct: 0, status: 'Inactive' }
                  ].map((row) => {
                    const isSelected = selectedMentor.id === row.id || (selectedMentor.name === row.name);

                    return (
                      <tr
                        key={row.id}
                        onClick={() => setSelectedMentorId(row.id)}
                        className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/60' : ''}`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {row.name.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                                  {row.name}
                                </span>
                                {row.isPrimary && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 font-medium">
                                {row.title}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {row.dept}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                          <span className="font-bold text-slate-900 text-xs">{row.count}</span>
                          <span className={`block text-[10px] font-semibold ${row.wlColor}`}>
                            ({row.wlTag})
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-center font-bold text-slate-800">{row.groups}</td>
                        <td className="py-3.5 px-3 text-center font-bold text-slate-800">{row.interventions}</td>

                        <td className="py-3.5 px-3 text-center">
                          {row.pending > 0 ? (
                            <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-rose-50 text-rose-600 border border-rose-200">
                              {row.pending}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-medium">0</span>
                          )}
                        </td>

                        <td className="py-3.5 px-3 w-36 whitespace-nowrap">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5 mr-2">
                                <div 
                                  className={`h-full rounded-full ${
                                    row.pct > 100 ? 'bg-rose-600' :
                                    row.pct >= 70 ? 'bg-blue-600' : 'bg-emerald-500'
                                  }`} 
                                  style={{ width: `${Math.min(row.pct, 100)}%` }} 
                                />
                              </div>
                              <span className="font-bold text-slate-900 text-[11px]">{row.pct}%</span>
                            </div>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                              row.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                              {row.status}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-center" onClick={e => e.stopPropagation()}>
                          <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-3.5 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing <span className="font-bold text-slate-800">1</span> to <span className="font-bold text-slate-800">7</span> of <span className="font-bold text-slate-800">38</span> mentors
              </div>

              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50 flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button className="px-2.5 py-1 bg-blue-600 text-white rounded font-medium shadow-2xs">1</button>
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">2</button>
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">3</button>
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">4</button>
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">5</button>
                <span className="px-1 text-slate-400">...</span>
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">6</button>
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50 flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (1/3 width): 4 Stacked Auxiliary Cards */}
        <div className="space-y-5">
          
          {/* Card 1: Workload Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Workload Distribution</h3>
            </div>

            <div className="flex items-center gap-4 py-1">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Blue: Low 24% */}
                  <path className="text-blue-600" strokeDasharray="24, 100" strokeWidth="4.2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Green: Optimal 53% */}
                  <path className="text-emerald-500" strokeDasharray="53, 100" strokeDashoffset="-24" strokeWidth="4.2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Orange: High 24% */}
                  <path className="text-amber-500" strokeDasharray="23, 100" strokeDashoffset="-77" strokeWidth="4.2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-slate-900 leading-none">38</span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Active Mentors</span>
                </div>
              </div>

              <div className="space-y-2 text-xs w-full">
                <div 
                  onClick={() => setWorkloadFilter('Low')}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span className="text-slate-700 font-medium">Low (0–15 students)</span>
                  </div>
                  <span className="font-bold text-slate-900">9 mentors (24%)</span>
                </div>
                <div 
                  onClick={() => setWorkloadFilter('Optimal')}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-700 font-medium">Optimal (16–30 students)</span>
                  </div>
                  <span className="font-bold text-slate-900">20 mentors (53%)</span>
                </div>
                <div 
                  onClick={() => setWorkloadFilter('High')}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-slate-700 font-medium">High (31+ students)</span>
                  </div>
                  <span className="font-bold text-slate-900">9 mentors (24%)</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-3 text-[11px] text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Goal:</strong> Keep students per mentor between 15 – 30 for effective mentoring.</span>
            </div>
          </div>

          {/* Card 2: Unassigned Students */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Unassigned Students</h3>
              <button 
                onClick={() => setActiveTab('unassigned')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View all
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-900">64 <span className="text-xs font-normal text-slate-500">Students</span></div>
              <div className="text-xs text-slate-500">Without a mentor</div>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { dept: 'CSE', count: 31, pct: '48%' },
                { dept: 'IT', count: 18, pct: '28%' },
                { dept: 'ECE', count: 9, pct: '14%' },
                { dept: 'AIML', count: 6, pct: '9%' }
              ].map(item => (
                <div key={item.dept} className="flex items-center justify-between py-1 border-b border-slate-100 text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center">{item.dept.substring(0, 2)}</span>
                    <span className="font-semibold">{item.dept}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.count} ({item.pct})</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsAssignMentorOpen(true)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all"
            >
              Assign Mentors
            </button>
          </div>

          {/* Card 3: Mentor Responsibilities Overview */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3.5">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Mentor Responsibilities Overview</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-slate-700">Total Groups Managed</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">46</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-slate-700">Total Interventions Owned</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">18</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="font-medium text-slate-700">Students Needing Attention</span>
                </div>
                <span className="font-bold text-amber-600 text-sm">87</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-slate-700">Upcoming Reviews</span>
                </div>
                <span className="font-bold text-slate-900 text-sm">27</span>
              </div>
            </div>
          </div>

          {/* Card 4: Top Overloaded Mentors */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Top Overloaded Mentors</h3>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View all →</button>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { rank: 1, name: 'Prof. Karan Verma', count: 38, pct: 127 },
                { rank: 2, name: 'Prof. Neha Sharma', count: 31, pct: 103 },
                { rank: 3, name: 'Dr. Rahul Mehta', count: 22, pct: 73 }
              ].map(m => (
                <div key={m.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold text-slate-400">{m.rank}</span>
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center">
                      {m.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-800">{m.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900">{m.count} students</span>
                    <span className={`ml-2 font-bold ${m.pct > 100 ? 'text-rose-600' : 'text-emerald-600'}`}>{m.pct}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              Recommended workload: <span className="font-semibold text-slate-700">15 – 30 students</span>
            </div>
          </div>

        </div>

      </div>

      {/* 5. Lower Section: Selected Mentor Details & History / Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        
        {/* Left Column (2/3 width): Selected Mentor Details Card */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Mentor Details: <span className="text-blue-600">{selectedMentor.name}</span>
              </h2>
              <button onClick={() => setSelectedMentorId('m1')} className="text-xs font-semibold text-slate-500 hover:text-blue-600">
                Back to list
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Profile Card Block */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white font-bold text-base flex items-center justify-center shrink-0">
                    {selectedMentor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{selectedMentor.name}</div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      Primary Mentor
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">{selectedMentor.title || 'Associate Professor, CSE'}</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-y border-slate-200/80 py-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedMentor.email || 'rahul.mehta@college.edu'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedMentor.phone || '+91 98765 43210'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-medium">Students Assigned</div>
                    <div className="font-bold text-slate-900 text-sm">{selectedMentor.studentCount || 22}</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-medium">Groups Managed</div>
                    <div className="font-bold text-slate-900 text-sm">2</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-medium">Interventions Owned</div>
                    <div className="font-bold text-slate-900 text-sm">1</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-medium">Pending Reviews</div>
                    <div className="font-bold text-rose-600 text-sm">{selectedMentor.pendingReviewsCount || 3}</div>
                  </div>
                </div>

                <button className="w-full py-2 border border-blue-200 text-blue-600 bg-blue-50/50 hover:bg-blue-50 rounded-lg text-xs font-bold transition-all">
                  View Full Profile
                </button>
              </div>

              {/* Detail Tabs Area */}
              <div className="md:col-span-2 space-y-4">
                
                <div className="border-b border-slate-200 flex items-center gap-4 text-xs font-medium">
                  <button
                    onClick={() => setDetailTab('students')}
                    className={`pb-2.5 font-bold transition-all ${
                      detailTab === 'students' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Assigned Students ({selectedMentor.studentCount || 22})
                  </button>
                  <button
                    onClick={() => setDetailTab('groups')}
                    className={`pb-2.5 font-bold transition-all ${
                      detailTab === 'groups' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Groups (2)
                  </button>
                  <button
                    onClick={() => setDetailTab('interventions')}
                    className={`pb-2.5 font-bold transition-all ${
                      detailTab === 'interventions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Interventions (1)
                  </button>
                  <button
                    onClick={() => setDetailTab('activity')}
                    className={`pb-2.5 font-bold transition-all ${
                      detailTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Recent Activity
                  </button>
                </div>

                {/* Assigned Students Sub-Table */}
                {detailTab === 'students' && (
                  <div className="space-y-3">
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[10px]">
                            <th className="py-2.5 px-3">Student</th>
                            <th className="py-2.5 px-2">Dept</th>
                            <th className="py-2.5 px-2">Year</th>
                            <th className="py-2.5 px-2 text-right">Technical Score</th>
                            <th className="py-2.5 px-2 text-right">Growth (30D)</th>
                            <th className="py-2.5 px-2 text-center">Status</th>
                            <th className="py-2.5 px-2">Last Review</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {sampleAssignedStudents.map(s => (
                            <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2.5 px-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                                    {s.name.charAt(0)}
                                  </div>
                                  <span 
                                    onClick={() => navigateToStudent(s.id)}
                                    className="font-bold text-slate-900 hover:text-blue-600 cursor-pointer"
                                  >
                                    {s.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-2.5 px-2 text-slate-600 font-medium">{s.dept}</td>
                              <td className="py-2.5 px-2 text-slate-500">{s.year}</td>
                              <td className="py-2.5 px-2 text-right font-bold text-slate-900">{s.score}</td>
                              <td className="py-2.5 px-2 text-right font-bold text-emerald-600">{s.growth}</td>
                              <td className="py-2.5 px-2 text-center">
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                  s.status === 'High Potential' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                  s.status === 'High Growth' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  s.status === 'Strong' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                  'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                  {s.status}
                                </span>
                              </td>
                              <td className="py-2.5 px-2 text-slate-400 text-[11px]">{s.lastReview}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-right">
                      <button 
                        onClick={() => filterTalentPool('ALL', selectedMentor.dept)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View all {selectedMentor.studentCount || 22} students →
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* Right Column (1/3 width): Assignment History & Quick Actions */}
        <div className="space-y-5">
          
          {/* Card 1: Assignment History */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Assignment History</h3>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View all</button>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { date: 'Aug 29, 2024', title: 'Prof. Neha Sharma assigned to', target: 'Microsoft SDE Candidates (63 students)' },
                { date: 'Aug 27, 2024', title: '12 students reassigned from', target: 'Prof. Arjun Rao to Prof. Rahul Mehta' },
                { date: 'Aug 24, 2024', title: 'Backend Development Program assigned to', target: 'Prof. Neha Sharma (43 students)' },
                { date: 'Aug 20, 2024', title: 'Dr. Pooja Iyer added as mentor', target: '' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="p-1 rounded bg-blue-50 text-blue-600 shrink-0 mt-0.5">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold">{item.date}</div>
                    <div className="text-slate-700 font-medium">
                      {item.title} <span className="font-bold text-slate-900">{item.target}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Quick Actions</h3>

            <div className="space-y-2 text-xs">
              <button 
                onClick={() => setIsAssignMentorOpen(true)}
                className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Assign Mentor to Group</span>
              </button>

              <button 
                onClick={() => setIsAssignMentorOpen(true)}
                className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <UserPlus className="w-4 h-4 text-indigo-600" />
                <span>Assign Mentor to Students</span>
              </button>

              <button 
                onClick={() => setIsAssignMentorOpen(true)}
                className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <Target className="w-4 h-4 text-purple-600" />
                <span>Assign Mentor to Intervention</span>
              </button>

              <button 
                onClick={() => setIsReassignOpen(true)}
                className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span>Reassign Students</span>
              </button>

              <button 
                onClick={() => setActiveTab('unassigned')}
                className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>View Unassigned Students</span>
              </button>

              <button 
                onClick={() => setWorkloadFilter('High')}
                className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <BarChart3 className="w-4 h-4 text-rose-600" />
                <span>View Mentor Workload</span>
              </button>

              <button 
                onClick={() => alert("Exporting mentor allocation dataset...")}
                className="w-full p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-lg font-semibold flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Export Mentor Allocation</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Action Modals */}
      <AddMentorModal isOpen={isAddMentorOpen} onClose={() => setIsAddMentorOpen(false)} />
      <AssignMentorModal isOpen={isAssignMentorOpen} onClose={() => setIsAssignMentorOpen(false)} />
      <ReassignStudentsModal 
        isOpen={isReassignOpen} 
        onClose={() => setIsReassignOpen(false)} 
        sourceMentorId={reassignSourceId}
        onReassign={(src, tgt, cnt) => reassignStudents(src, tgt, cnt)}
      />

    </div>
  );
};
