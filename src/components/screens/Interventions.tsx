import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Target, Users, AlertTriangle, CheckCircle2, TrendingUp, Award,
  Plus, Search, Filter, ArrowUpDown, MoreHorizontal, ChevronRight,
  Sparkles, Calendar, Download, UserPlus, BookOpen, ExternalLink,
  ChevronLeft, X, Layers, Check
} from 'lucide-react';
import { Intervention } from '../../types';

export const Interventions: React.FC = () => {
  const { 
    interventions, mentors, groups, students, setCurrentScreen, 
    navigateToIntervention, navigateToStudent, createIntervention 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'updated' | 'students' | 'progress'>('updated');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  // Create Intervention Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProgramName, setNewProgramName] = useState('');
  const [newType, setNewType] = useState<Intervention['type']>('Skill');
  const [newTargetSkill, setNewTargetSkill] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newMentorId, setNewMentorId] = useState(mentors[0]?.id || 'm1');
  const [newGroupId, setNewGroupId] = useState(groups[0]?.id || 'g1');
  const [newBaselineScore, setNewBaselineScore] = useState('520');
  const [newTargetScore, setNewTargetScore] = useState('780');
  const [newDeadline, setNewDeadline] = useState('2026-11-15');

  // Filter interventions
  const filteredInterventions = interventions.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.targetSkill && item.targetSkill.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          item.problemIdentified.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatusFilter === 'All' ? true : 
                          selectedStatusFilter === 'Active' ? (item.status === 'Active' || item.status === 'In Progress') :
                          selectedStatusFilter === 'Planning' ? item.status === 'Planning' :
                          selectedStatusFilter === 'In Progress' ? item.status === 'In Progress' :
                          selectedStatusFilter === 'Completed' ? item.status === 'Completed' :
                          selectedStatusFilter === 'Needs Attention' ? item.status === 'Needs Attention' : true;

    const matchesType = selectedTypeFilter === 'ALL' ? true : item.type === selectedTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRowIds(filteredInterventions.map(i => i.id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedRowIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgramName.trim()) return;

    createIntervention({
      name: newProgramName,
      subtitle: `Target Skill: ${newTargetSkill || 'General Remediation'}`,
      type: newType,
      targetSkill: newTargetSkill || 'System Architecture',
      studentIds: students.slice(0, 18).map(s => s.id),
      studentCount: 18,
      groupId: newGroupId,
      problemIdentified: newProblem || 'Skill gap identified in evaluation',
      mentorId: newMentorId,
      targetDescription: `Raise average score from ${newBaselineScore} to ${newTargetScore}`,
      baselineAvgScore: parseInt(newBaselineScore) || 520,
      currentAvgScore: parseInt(newBaselineScore) || 520,
      targetAvgScore: parseInt(newTargetScore) || 780,
      startDate: new Date().toISOString().split('T')[0],
      deadline: newDeadline,
      outcomeDelta: '+0 pts (Baseline)'
    });

    setIsModalOpen(false);
    setNewProgramName('');
    setNewTargetSkill('');
    setNewProblem('');
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-[#F8FAFC] text-slate-800 font-sans">
      
      {/* 1. Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Interventions & Outcomes</h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Institution Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Targeted skill improvement programs, candidate cohort remediation & outcome metrics tracking
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-2xs transition-all flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            Saved Views
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Create Intervention
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 border border-slate-200 bg-white">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Active Interventions</span>
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">12</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+3 active</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Enrolled Students</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">428</span>
            <span className="text-[11px] text-slate-500">18.4% of batch</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Needs Attention</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-amber-600">67</span>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">High gap</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">31</span>
            <span className="text-[11px] text-slate-500">Last 90 days</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Success Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">74%</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">↑ 12%</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Avg Improvement</span>
            <Award className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-blue-600">+14%</span>
            <span className="text-[11px] text-slate-500">Tech score</span>
          </div>
        </div>
      </div>

      {/* 3. Status Filter Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            { label: 'All', count: 43 },
            { label: 'Active', count: 12 },
            { label: 'Planning', count: 6 },
            { label: 'In Progress', count: 15 },
            { label: 'Completed', count: 8 },
            { label: 'Needs Attention', count: 2 },
            { label: 'Drafts', count: 0 }
          ].map(tab => (
            <button
              key={tab.label}
              onClick={() => setSelectedStatusFilter(tab.label)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedStatusFilter === tab.label
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                selectedStatusFilter === tab.label ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
          View Calendar <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 4. Intelligence & Distribution Cards (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Card 1: Status Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              Intervention Status Distribution
            </h3>
            <span className="text-[11px] font-medium text-slate-500">43 Total</span>
          </div>

          <div className="flex items-center gap-4 py-1">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-600" strokeDasharray="35, 100" strokeWidth="4.2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-emerald-500" strokeDasharray="25, 100" strokeDashoffset="-35" strokeWidth="4.2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-purple-500" strokeDasharray="18, 100" strokeDashoffset="-60" strokeWidth="4.2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-amber-500" strokeDasharray="14, 100" strokeDashoffset="-78" strokeWidth="4.2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-rose-500" strokeDasharray="8, 100" strokeDashoffset="-92" strokeWidth="4.2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-slate-900 leading-none">43</span>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Programs</span>
              </div>
            </div>

            <div className="space-y-2 text-xs w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="text-slate-700 font-medium">Active</span>
                </div>
                <span className="font-bold text-slate-900">12 (27.9%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-700 font-medium">In Progress</span>
                </div>
                <span className="font-bold text-slate-900">15 (34.9%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-slate-700 font-medium">Completed</span>
                </div>
                <span className="font-bold text-slate-900">8 (18.6%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-700 font-medium">Planning</span>
                </div>
                <span className="font-bold text-slate-900">6 (14.0%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-slate-700 font-medium">Needs Attention</span>
                </div>
                <span className="font-bold text-rose-600">2 (4.6%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Skill Focus Areas */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Skill Focus Areas
            </h3>
            <span className="text-[11px] font-medium text-slate-500">By Cohorts</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { skill: 'System Design & Distributed', cohorts: 18, pct: 38, color: 'bg-blue-600' },
              { skill: 'Backend & Microservices', cohorts: 14, pct: 29, color: 'bg-indigo-600' },
              { skill: 'DSA & Core Algorithms', cohorts: 12, pct: 25, color: 'bg-purple-600' },
              { skill: 'Web Dev & Frontend Stack', cohorts: 9, pct: 19, color: 'bg-emerald-600' },
              { skill: 'Machine Learning & Data AI', cohorts: 6, pct: 13, color: 'bg-amber-600' },
              { skill: 'Competitive Programming', cohorts: 5, pct: 10, color: 'bg-rose-600' }
            ].map(item => (
              <div key={item.skill} className="space-y-1">
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span>{item.skill}</span>
                  <span className="text-slate-500 font-semibold text-[11px]">{item.cohorts} cohorts ({item.pct}%)</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Outcomes Overview */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Outcomes Overview
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Verified</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-3 rounded-lg border border-slate-200/60">
            <div>
              <div className="text-base font-bold text-emerald-600">+18%</div>
              <div className="text-[10px] text-slate-500 leading-tight font-medium">Avg Skill Delta</div>
            </div>
            <div className="border-x border-slate-200/80 px-1">
              <div className="text-base font-bold text-blue-600">84%</div>
              <div className="text-[10px] text-slate-500 leading-tight font-medium">Met Target</div>
            </div>
            <div>
              <div className="text-base font-bold text-slate-900">4.6 / 5</div>
              <div className="text-[10px] text-slate-500 leading-tight font-medium">Rating Score</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>Monthly Technical Score Trend</span>
              <span className="text-emerald-600 font-semibold text-[11px]">Mar - Aug</span>
            </div>
            <div className="h-20 w-full pt-2">
              <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
                <path d="M0,50 L50,42 L100,35 L150,28 L200,20 L250,15 L300,8" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M0,50 L50,42 L100,35 L150,28 L200,20 L250,15 L300,8 L300,60 L0,60 Z" fill="url(#blueGradient)" opacity="0.15" />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Main Content Workspace: Table (Left 2/3) + Auxiliary Cards (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Interventions Data Table (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Search & Filter Header inside Table Box */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            
            <div className="p-4 border-b border-slate-200 space-y-3 bg-slate-50/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search intervention program, target skill, mentor or problem..."
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
                    value={selectedTypeFilter}
                    onChange={e => setSelectedTypeFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-blue-500"
                  >
                    <option value="ALL">All Types</option>
                    <option value="Skill">Skill Remediation</option>
                    <option value="Competitive Programming">Competitive Prog</option>
                    <option value="Development">Development</option>
                    <option value="Activity">Activity & Projects</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-blue-500"
                  >
                    <option value="updated">Sort: Updated</option>
                    <option value="students">Sort: Students Count</option>
                    <option value="progress">Sort: Progress %</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3.5 w-8">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedRowIds.length > 0 && selectedRowIds.length === filteredInterventions.length}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                      />
                    </th>
                    <th className="py-3 px-4">Intervention Program</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Target Skill</th>
                    <th className="py-3 px-3 text-center">Students</th>
                    <th className="py-3 px-3">Assigned Mentor</th>
                    <th className="py-3 px-3">Progress / Target</th>
                    <th className="py-3 px-3 text-right">Outcome Delta</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 bg-white">
                  {filteredInterventions.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-500">
                        No interventions match your current filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInterventions.map((item) => {
                      const assignedMentor = mentors.find(m => m.id === item.mentorId);
                      const isSelected = selectedRowIds.includes(item.id);

                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-blue-50/40 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/60' : ''}`}
                          onClick={() => {
                            navigateToIntervention(item.id);
                            setCurrentScreen('intervention-detail');
                          }}
                        >
                          <td className="py-3.5 px-3.5" onClick={e => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleRow(item.id)}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                            />
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {item.problemIdentified}
                            </div>
                          </td>

                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              {item.type}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              {item.targetSkill || 'System Design'}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-center whitespace-nowrap">
                            <span className="font-bold text-slate-800">
                              {item.studentCount || item.studentIds.length || 18}
                            </span>
                            <span className="text-[10px] text-slate-400 block">students</span>
                          </td>

                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
                                {assignedMentor ? assignedMentor.name.charAt(0) : 'M'}
                              </div>
                              <span className="font-medium text-slate-800 text-xs">
                                {assignedMentor ? assignedMentor.name : 'Dr. S. Kumar'}
                              </span>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 w-36 whitespace-nowrap">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px]">
                                <span className="font-bold text-slate-900">{item.progressPercent}%</span>
                                <span className="text-slate-400 font-medium">Target: {item.targetAvgScore}</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${
                                    item.progressPercent >= 80 ? 'bg-emerald-500' :
                                    item.progressPercent >= 50 ? 'bg-blue-600' : 'bg-amber-500'
                                  }`} 
                                  style={{ width: `${item.progressPercent}%` }} 
                                />
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 text-right whitespace-nowrap">
                            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                              {item.outcomeDelta || `+${item.currentAvgScore - item.baselineAvgScore} pts`}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-center whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              item.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                              item.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-300' :
                              item.status === 'Completed' ? 'bg-purple-50 text-purple-700 border-purple-300' :
                              item.status === 'Needs Attention' ? 'bg-rose-50 text-rose-700 border-rose-300' :
                              'bg-amber-50 text-amber-700 border-amber-300'
                            }`}>
                              {item.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-center" onClick={e => e.stopPropagation()}>
                            <button className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-3.5 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing <span className="font-bold text-slate-800">1</span> to <span className="font-bold text-slate-800">{filteredInterventions.length}</span> of <span className="font-bold text-slate-800">43</span> interventions
              </div>

              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5" /> Prev
                </button>
                <button className="px-2.5 py-1 bg-blue-600 text-white rounded font-medium shadow-2xs">1</button>
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">2</button>
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50">3</button>
                <button className="px-2.5 py-1 bg-white border border-slate-300 rounded text-slate-600 hover:bg-slate-50 flex items-center gap-1">
                  Next <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: 3 Auxiliary Cards (1 col) */}
        <div className="space-y-5">
          
          {/* Card 1: Students Needing Attention */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Students Needing Attention
              </h3>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">4 Flagged</span>
            </div>

            <div className="space-y-3">
              {[
                { id: 's1', name: 'Rahul Verma', roll: '21CS042', dept: 'CSE', score: 580, gap: 'DSA Score 48 (-22 below target)', mentor: 'Dr. A. Sharma' },
                { id: 's2', name: 'Priya Sharma', roll: '21IT019', dept: 'IT', score: 610, gap: 'System Design gap', mentor: 'Prof. R. Gupta' },
                { id: 's3', name: 'Ananya Gupta', roll: '21CS088', dept: 'CSE', score: 595, gap: 'Inactive on GitHub 18 days', mentor: 'Dr. S. Kumar' },
                { id: 's4', name: 'Vikram Singh', roll: '21ECE014', dept: 'ECE', score: 560, gap: 'Low practice score', mentor: 'Dr. M. Patel' }
              ].map(st => (
                <div 
                  key={st.id} 
                  className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all flex items-center justify-between gap-2 cursor-pointer"
                  onClick={() => navigateToStudent(st.id)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {st.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-xs truncate">{st.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{st.roll} • {st.dept}</div>
                      <div className="text-[10px] text-amber-700 font-semibold truncate mt-0.5">{st.gap}</div>
                    </div>
                  </div>
                  <button className="px-2 py-1 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 shrink-0">
                    Intervene
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Quick Actions
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => setCurrentScreen('mentor-management')}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-left space-y-1"
              >
                <UserPlus className="w-4 h-4 text-blue-600" />
                <div>Assign Mentors</div>
              </button>

              <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-left space-y-1">
                <Download className="w-4 h-4 text-indigo-600" />
                <div>Export Reports</div>
              </button>

              <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-left space-y-1">
                <Calendar className="w-4 h-4 text-purple-600" />
                <div>Schedule Review</div>
              </button>

              <button 
                onClick={() => setCurrentScreen('groups')}
                className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-left space-y-1"
              >
                <Layers className="w-4 h-4 text-emerald-600" />
                <div>Create Cohort</div>
              </button>

              <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-left space-y-1">
                <Users className="w-4 h-4 text-amber-600" />
                <div>Notify Students</div>
              </button>

              <button className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-left space-y-1">
                <Award className="w-4 h-4 text-rose-600" />
                <div>Benchmarks</div>
              </button>
            </div>
          </div>

          {/* Card 3: Learn About Interventions */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl border border-blue-200 p-4 space-y-3">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
              <BookOpen className="w-4 h-4 text-blue-600" />
              CDC Remediation Playbook
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Targeted interventions raise placement eligibility by an average of 24%. Learn how to group students by skill gap and assign specialized faculty mentors.
            </p>
            <a 
              href="#" 
              onClick={e => e.preventDefault()}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              Read Intervention Guidelines <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

      {/* 6. Modal: Create Intervention */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Create New Intervention Program</h2>
                <p className="text-xs text-slate-500">Define target skill, cohort criteria & faculty lead</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Program Name *</label>
                <input
                  type="text"
                  required
                  value={newProgramName}
                  onChange={e => setNewProgramName(e.target.value)}
                  placeholder="e.g. Advanced System Architecture Remediation Cohort 3"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Intervention Type</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Skill">Skill Remediation</option>
                    <option value="Competitive Programming">Competitive Programming</option>
                    <option value="Development">Development Project</option>
                    <option value="Activity">Activity / Assessment</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Target Skill Focus</label>
                  <input
                    type="text"
                    value={newTargetSkill}
                    onChange={e => setNewTargetSkill(e.target.value)}
                    placeholder="e.g. System Design, DSA, Docker"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Assigned Mentor Lead</label>
                  <select
                    value={newMentorId}
                    onChange={e => setNewMentorId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    {mentors.map(m => (
                      <option key={m.id} value={m.id}>{m.name} ({m.dept})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Target Student Group</label>
                  <select
                    value={newGroupId}
                    onChange={e => setNewGroupId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Baseline Avg</label>
                  <input
                    type="number"
                    value={newBaselineScore}
                    onChange={e => setNewBaselineScore(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Target Avg</label>
                  <input
                    type="number"
                    value={newTargetScore}
                    onChange={e => setNewTargetScore(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Deadline Date</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={e => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Identified Skill Gap / Rationale</label>
                <textarea
                  rows={2}
                  value={newProblem}
                  onChange={e => setNewProblem(e.target.value)}
                  placeholder="Describe the core deficiency or goal..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Launch Program
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
