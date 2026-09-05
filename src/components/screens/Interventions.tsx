import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreateInterventionModal } from '../layout/ActionModals';
import { 
  Target, Plus, Filter, Search, ChevronDown, MoreHorizontal, 
  TrendingUp, AlertTriangle, Calendar, Users, ArrowUpRight, 
  CheckCircle2, Clock, ShieldCheck, FileText, ArrowRight, 
  BarChart3, UserCheck, Layers, ExternalLink, HelpCircle
} from 'lucide-react';

export const Interventions: React.FC = () => {
  const { interventions, mentors, groups, navigateToIntervention, filterTalentPool } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter interventions
  const filteredInterventions = interventions.filter(int => {
    // Tab filter
    if (activeTab === 'Active' && int.status !== 'Active') return false;
    if (activeTab === 'Planning' && int.status !== 'Planning') return false;
    if (activeTab === 'In Progress' && int.status !== 'In Progress') return false;
    if (activeTab === 'Completed' && int.status !== 'Completed') return false;
    if (activeTab === 'Needs Attention' && int.status !== 'Needs Attention') return false;
    if (activeTab === 'Drafts' && int.status !== 'Draft') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = int.name.toLowerCase().includes(q);
      const subMatch = int.subtitle?.toLowerCase().includes(q) || false;
      const skillMatch = int.targetSkill?.toLowerCase().includes(q) || false;
      if (!nameMatch && !subMatch && !skillMatch) return false;
    }

    // Skill filter
    if (skillFilter !== 'ALL' && int.targetSkill !== skillFilter) return false;

    // Status filter
    if (statusFilter !== 'ALL' && int.status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 font-sans">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Interventions & Outcomes</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Closed-Loop Tracking
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track, manage, and measure targeted technical interventions across students and cohorts
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
            Saved Views
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-950 flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Intervention
            <ChevronDown className="w-3 h-3 text-blue-200" />
          </button>

          <button className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-slate-400 hover:text-slate-200">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Active Interventions</span>
            <Target className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">12</div>
          <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <span>+2 this month</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Students Enrolled</span>
            <Users className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">428</div>
          <div className="text-[11px] text-slate-400">18% of total pool</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Needs Attention</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">67</div>
          <div className="text-[11px] text-amber-400/90 font-medium">15% require action</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Completed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">31</div>
          <div className="text-[11px] text-slate-400">This academic year</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Success Rate</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">74%</div>
          <div className="text-[11px] text-emerald-400 font-medium">↑ 12% vs last year</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Avg Improvement</span>
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400">+14%</div>
          <div className="text-[11px] text-slate-400">Technical score delta</div>
        </div>
      </div>

      {/* 3. Filter Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 text-xs">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
          {[
            { id: 'All', label: 'All', count: 43 },
            { id: 'Active', label: 'Active', count: 12 },
            { id: 'Planning', label: 'Planning', count: 6 },
            { id: 'In Progress', label: 'In Progress', count: 15 },
            { id: 'Completed', label: 'Completed', count: 8 },
            { id: 'Needs Attention', label: 'Needs Attention', count: 2 },
            { id: 'Drafts', label: 'Drafts', count: 0 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.id ? 'bg-blue-500/30 text-blue-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 shrink-0 self-end sm:self-center">
          <Calendar className="w-3.5 h-3.5" />
          View Calendar →
        </button>
      </div>

      {/* 4. Top Intelligence Summary Area (3 Panels) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Donut Chart: Intervention Status Distribution */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Intervention Status Distribution</h3>
            <span className="text-[11px] font-semibold text-slate-400">43 Total</span>
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            {/* Visual Bar / Donut representation */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-800" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-indigo-500" strokeDasharray="28, 100" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-500" strokeDasharray="35, 100" strokeDashoffset="-28" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeDasharray="19, 100" strokeDashoffset="-63" strokeWidth="3.8" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-bold text-slate-100">43</span>
                <span className="text-[9px] text-slate-400 block uppercase">Interventions</span>
              </div>
            </div>

            {/* Legend List */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Active
                </span>
                <span className="font-semibold text-slate-200">12 (28%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> In Progress
                </span>
                <span className="font-semibold text-slate-200">15 (35%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed
                </span>
                <span className="font-semibold text-slate-200">8 (19%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Planning
                </span>
                <span className="font-semibold text-slate-200">6 (14%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Attention
                </span>
                <span className="font-semibold text-slate-200">2 (4%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Focus Areas Horizontal Bars */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Skill Focus Areas</h3>
            <span className="text-[11px] font-semibold text-indigo-400">By Interventions</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { skill: 'System Design', count: 9, max: 10, color: 'bg-indigo-500' },
              { skill: 'Backend Development', count: 8, max: 10, color: 'bg-blue-500' },
              { skill: 'Data Structures & Algorithms', count: 7, max: 10, color: 'bg-emerald-500' },
              { skill: 'Web Development', count: 5, max: 10, color: 'bg-purple-500' },
              { skill: 'Machine Learning', count: 5, max: 10, color: 'bg-amber-500' },
              { skill: 'Competitive Programming', count: 4, max: 10, color: 'bg-rose-500' },
            ].map(item => (
              <div key={item.skill} className="space-y-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-300 font-medium">{item.skill}</span>
                  <span className="font-bold text-slate-200">{item.count}</span>
                </div>
                <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / item.max) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes Overview & Before/After Score Chart */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Outcomes Overview</h3>
            <span className="text-[11px] text-emerald-400 font-semibold">+18% Avg Gain</span>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Avg Score Delta</span>
              <span className="text-base font-bold text-emerald-400">+18%</span>
            </div>
            <div className="border-l border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Target Met Rate</span>
              <span className="text-base font-bold text-blue-400">84%</span>
            </div>
            <div className="border-l border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Mentor Rating</span>
              <span className="text-base font-bold text-indigo-400">4.6 / 5</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500"></span> Baseline (520 avg)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Current (640 avg)</span>
            </div>
            <div className="h-12 bg-slate-950 rounded-lg p-2 flex items-end justify-between gap-1 border border-slate-800/80">
              {[
                { month: 'Mar', base: 40, curr: 42 },
                { month: 'Apr', base: 42, curr: 55 },
                { month: 'May', base: 45, curr: 68 },
                { month: 'Jun', base: 48, curr: 75 },
                { month: 'Jul', base: 50, curr: 85 },
                { month: 'Aug', base: 52, curr: 92 },
              ].map(d => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                  <div className="w-full flex items-end justify-center gap-0.5 h-full">
                    <div className="w-1.5 bg-slate-700 rounded-t" style={{ height: `${d.base}%` }}></div>
                    <div className="w-1.5 bg-emerald-500 rounded-t" style={{ height: `${d.curr}%` }}></div>
                  </div>
                  <span className="text-[8px] text-slate-500 font-mono">{d.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 5. Main Split Section: Left Table (~70%), Right Panels (~30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Interventions Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-4 shadow-xl">
            
            {/* Toolbar: Title, Search, Filter Dropdowns */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-100">Interventions ({filteredInterventions.length})</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                  Real-time tracking
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search box */}
                <div className="relative w-44 sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search interventions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Filter Skill Dropdown */}
                <select
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">Skill: All</option>
                  <option value="System Design">System Design</option>
                  <option value="DSA">DSA</option>
                  <option value="Backend">Backend</option>
                  <option value="CP">Competitive Prog</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Web Dev">Web Dev</option>
                  <option value="Machine Learning">Machine Learning</option>
                </select>

                {/* Filter Status Dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">Status: All</option>
                  <option value="Active">Active</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Planning">Planning</option>
                  <option value="Completed">Completed</option>
                  <option value="Needs Attention">Needs Attention</option>
                </select>
              </div>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">
                      <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0" />
                    </th>
                    <th className="py-2.5 px-3">Intervention & Description</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Target Skill</th>
                    <th className="py-2.5 px-3 text-center">Students</th>
                    <th className="py-2.5 px-3">Mentor</th>
                    <th className="py-2.5 px-3">Progress</th>
                    <th className="py-2.5 px-3">Outcome</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredInterventions.map((int) => {
                    const mentor = mentors.find(m => m.id === int.mentorId);
                    
                    return (
                      <tr 
                        key={int.id}
                        onClick={() => navigateToIntervention(int.id)}
                        className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                      >
                        <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                          <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0" />
                        </td>
                        
                        <td className="py-3 px-3 min-w-[220px]">
                          <div className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                            {int.name}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {int.subtitle || int.problemIdentified}
                          </div>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950 border border-slate-800 text-slate-300">
                            {int.type}
                          </span>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-950/60 border border-indigo-800/60 text-indigo-300">
                            {int.targetSkill || 'General'}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <div className="inline-flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-md border border-slate-800 text-slate-200 font-semibold font-mono text-[11px]">
                            <Users className="w-3 h-3 text-slate-400" />
                            {int.studentCount || int.studentIds.length}
                          </div>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center text-[9px] font-bold text-indigo-200">
                              {mentor ? mentor.name.split(' ').map(n=>n[0]).join('') : 'UN'}
                            </div>
                            <span className="text-slate-300 font-medium text-[11px]">
                              {mentor ? mentor.name : 'Unassigned'}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <div className="space-y-1 min-w-[90px]">
                            <div className="flex justify-between text-[10px] font-mono">
                              <span className="text-slate-300">{int.progressPercent}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                              <div 
                                className={`h-full rounded-full ${
                                  int.progressPercent >= 80 ? 'bg-emerald-500' :
                                  int.progressPercent >= 40 ? 'bg-blue-500' :
                                  'bg-amber-500'
                                }`} 
                                style={{ width: `${int.progressPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap font-mono">
                          <span className={`text-[11px] font-bold ${
                            int.outcomeDelta?.includes('+') ? 'text-emerald-400' : 'text-slate-300'
                          }`}>
                            {int.outcomeDelta || '+0% avg'}
                          </span>
                        </td>

                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                            int.status === 'Active' ? 'bg-indigo-950 text-indigo-300 border-indigo-800' :
                            int.status === 'In Progress' ? 'bg-blue-950 text-blue-300 border-blue-800' :
                            int.status === 'Completed' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                            int.status === 'Needs Attention' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                            'bg-slate-950 text-slate-400 border-slate-800'
                          }`}>
                            {int.status}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <button className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Right Column: Stacked Side Panels (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Panel 1: Students Needing Attention */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Students Needing Attention
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                67 Students
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between">
                <span className="text-slate-300 font-medium">No activity in 7+ days</span>
                <span className="font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">22</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between">
                <span className="text-slate-300 font-medium">Below expected progress</span>
                <span className="font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">18</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between">
                <span className="text-slate-300 font-medium">Mentor review pending</span>
                <span className="font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">15</span>
              </div>
              <div className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between">
                <span className="text-slate-300 font-medium">Insufficient evidence submitted</span>
                <span className="font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">12</span>
              </div>
            </div>

            <button
              onClick={() => filterTalentPool('Needs Attention')}
              className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors flex items-center justify-center gap-1.5"
            >
              View All At-Risk Students →
            </button>
          </div>

          {/* Panel 2: Quick Actions */}
          <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800/60 pb-2">
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full p-2.5 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 rounded-lg font-semibold flex items-center gap-2 transition-colors text-left"
              >
                <Plus className="w-4 h-4 text-blue-400 shrink-0" />
                Create New Intervention
              </button>

              <button
                onClick={() => filterTalentPool('ALL')}
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg font-medium flex items-center gap-2 transition-colors text-left"
              >
                <Users className="w-4 h-4 text-indigo-400 shrink-0" />
                View All Students in Interventions
              </button>

              <button
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg font-medium flex items-center gap-2 transition-colors text-left"
              >
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                Assign Mentors to Interventions
              </button>

              <button
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg font-medium flex items-center gap-2 transition-colors text-left"
              >
                <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                Export Intervention Report
              </button>

              <button
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg font-medium flex items-center gap-2 transition-colors text-left"
              >
                <Layers className="w-4 h-4 text-purple-400 shrink-0" />
                Intervention Templates
              </button>

              <button
                className="w-full p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg font-medium flex items-center gap-2 transition-colors text-left"
              >
                <BarChart3 className="w-4 h-4 text-emerald-400 shrink-0" />
                Outcome Analysis
              </button>
            </div>
          </div>

          {/* Panel 3: Learn About Interventions */}
          <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-800/40 rounded-xl p-4 space-y-2">
            <h3 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              Closed-Loop Framework
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Interventions detect institutional skill gaps, assign dedicated mentors, set clear technical score targets, and evaluate empirical outcome deltas before and after completion.
            </p>
          </div>

        </div>

      </div>

      {/* Action Modal */}
      <CreateInterventionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
};
