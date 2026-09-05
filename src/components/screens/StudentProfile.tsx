import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TALENT_STUDENTS_MOCK, ALL_TALENT_STUDENTS, TalentStudent } from '../../data/mockData';
import { AssignMentorModal, CreateGroupModal, CreateInterventionModal } from '../layout/ActionModals';
import { 
  ChevronRight, Plus, Sparkles, TrendingUp, AlertCircle, ShieldCheck, 
  Code, Star, Cpu, Calendar, Check, MoreHorizontal, UserPlus, Target, 
  LifeBuoy, Edit, CheckCircle2, Circle, GitBranch, GitCommit, GitPullRequest, 
  ExternalLink, Info, Award, Clock, ArrowUpRight, ArrowDownRight, Layers, FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell 
} from 'recharts';

const SCORE_HISTORY = [
  { month: 'Apr', score: 620 },
  { month: 'May', score: 654 },
  { month: 'Jun', score: 702 },
  { month: 'Jul', score: 748 },
  { month: 'Aug', score: 812 },
];

const CP_RATING_HISTORY = [
  { month: 'Mar', rating: 1320 },
  { month: 'Apr', rating: 1350 },
  { month: 'May', rating: 1487 },
  { month: 'Jun', rating: 1410 },
  { month: 'Jul', rating: 1395 },
  { month: 'Aug', rating: 1420 },
];

const PROBLEM_DONUT_DATA = [
  { name: 'Easy', value: 142, color: '#10B981' },
  { name: 'Medium', value: 198, color: '#2563EB' },
  { name: 'Hard', value: 42, color: '#8B5CF6' },
];

export const StudentProfile: React.FC = () => {
  const { selectedStudentId, setCurrentScreen, mentors, addStudentNote } = useApp();

  // Find selected student or default to Aarav Sharma
  const student = ALL_TALENT_STUDENTS.find(s => s.id === selectedStudentId) || TALENT_STUDENTS_MOCK[0];

  // Modals
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isNotesEditing, setIsNotesEditing] = useState(false);
  const [notesText, setNotesText] = useState("Strong candidate for upcoming SDE drive. Good problem solver and active developer. Needs system design preparation.");

  const assignedMentor = mentors.find(m => m.assignedStudentIds.includes(student.id));

  return (
    <div className="p-6 space-y-4 bg-[#F8FAFC] min-h-screen font-sans text-slate-800 select-none pb-20">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span 
            onClick={() => setCurrentScreen('talent-pool')} 
            className="text-slate-500 hover:text-blue-600 cursor-pointer"
          >
            Talent Pool
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{student.name}</span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setIsGroupModalOpen(true)}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5 text-blue-600" />
            <span>Add to Group</span>
          </button>

          <button
            onClick={() => setCurrentScreen('opportunities')}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
          >
            <Target className="w-3.5 h-3.5 text-purple-600" />
            <span>Add to Opportunity</span>
          </button>

          <button
            onClick={() => setIsInterventionModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Start Intervention</span>
          </button>

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs"
            >
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
              <span>More</span>
            </button>

            {isMoreMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-xl bg-white border border-slate-200 shadow-xl z-30 p-1.5 text-xs font-sans space-y-0.5">
                <button onClick={() => { setIsMoreMenuOpen(false); setIsMentorModalOpen(true); }} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium">Assign Mentor</button>
                <button onClick={() => { setIsMoreMenuOpen(false); setIsNotesEditing(true); }} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium">Add Internal Note</button>
                <button onClick={() => { setIsMoreMenuOpen(false); alert(`Dossier for ${student.name} shared to CDC Panel`); }} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium">Share Profile</button>
                <button onClick={() => { setIsMoreMenuOpen(false); alert(`Exporting technical dossier PDF for ${student.name}...`); }} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium">Export PDF</button>
                <button onClick={() => { setIsMoreMenuOpen(false); alert('Flagged for CDC review'); }} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-rose-600 font-medium border-t border-slate-100">Flag for Review</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 1: Student Header & CTC Intelligence Summary */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column: Student Header + 5 Metrics Strip (7 cols) */}
        <div className="col-span-7 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          {/* Identity Header */}
          <div className="flex items-center gap-3.5">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{student.name}</h1>
                <span className="bg-purple-50 text-purple-700 border border-purple-200 font-semibold px-2 py-0.5 rounded text-[11px]">
                  {student.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {student.dept} <span className="text-slate-300">•</span> {student.year} <span className="text-slate-300">•</span> Batch of {student.batch}
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Roll No: CSE27B045 <span className="text-slate-300">•</span> Email: aarav.sharma@glbitm.ac.in
              </p>
            </div>
          </div>

          {/* 5 Metrics Strip */}
          <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-100 font-sans text-xs">
            {/* Metric 1 */}
            <div className="p-2 bg-slate-50/70 border border-slate-100 rounded-lg">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>Technical Growth Score</span>
                <Info className="w-3 h-3 text-slate-400" />
              </div>
              <p className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                812 <span className="text-xs text-slate-400 font-normal">/ 1000</span>
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-2 bg-slate-50/70 border border-slate-100 rounded-lg">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                <span>Growth (30D)</span>
                <Info className="w-3 h-3 text-slate-400" />
              </div>
              <p className="text-sm font-bold text-emerald-600 font-mono mt-0.5">↑ 18%</p>
              <p className="text-[10px] text-slate-400 font-mono">+124 points</p>
            </div>

            {/* Metric 3 */}
            <div className="p-2 bg-slate-50/70 border border-slate-100 rounded-lg">
              <span className="text-[10px] text-slate-400 font-semibold block">Batch Percentile</span>
              <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">Top 7%</p>
              <p className="text-[10px] text-slate-400">Above 93% of batch</p>
            </div>

            {/* Metric 4 */}
            <div className="p-2 bg-slate-50/70 border border-slate-100 rounded-lg">
              <span className="text-[10px] text-slate-400 font-semibold block">Department Percentile</span>
              <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">Top 9%</p>
              <p className="text-[10px] text-slate-400">Above 91% of dept.</p>
            </div>

            {/* Metric 5 */}
            <div className="p-2 bg-slate-50/70 border border-slate-100 rounded-lg">
              <span className="text-[10px] text-slate-400 font-semibold block">Institution Percentile</span>
              <p className="text-sm font-bold text-slate-900 font-mono mt-0.5">Top 12%</p>
              <p className="text-[10px] text-slate-400">Above 88% of inst.</p>
            </div>
          </div>
        </div>

        {/* Right Column: CTC Intelligence Summary (5 cols) */}
        <div className="col-span-5 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-2.5">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs uppercase tracking-tight mb-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>CTC Intelligence Summary</span>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
              "Strong technical profile with above-average problem solving and development activity. Consistent learner with rapid growth in the last two months. Primary area of improvement: System Design."
            </p>

            {/* 3 Summary Columns */}
            <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-slate-100">
              {/* Strengths */}
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">🌱 Strengths</span>
                <ul className="space-y-0.5 text-[11px] text-slate-700 font-medium">
                  <li className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500 shrink-0" /> Problem Solving (DSA)</li>
                  <li className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500 shrink-0" /> React Development</li>
                  <li className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500 shrink-0" /> Backend Development</li>
                  <li className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500 shrink-0" /> Consistency</li>
                </ul>
              </div>

              {/* Developing */}
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase block mb-1">🛠 Developing</span>
                <ul className="space-y-0.5 text-[11px] text-slate-700 font-medium">
                  <li className="flex items-center gap-1"><Circle className="w-2 h-2 text-amber-500 shrink-0" /> System Design</li>
                  <li className="flex items-center gap-1"><Circle className="w-2 h-2 text-amber-500 shrink-0" /> Competitive Prog.</li>
                  <li className="flex items-center gap-1"><Circle className="w-2 h-2 text-amber-500 shrink-0" /> Advanced Algorithms</li>
                </ul>
              </div>

              {/* Recent Signal */}
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">⚡ Recent Signal</span>
                <p className="text-[11px] text-slate-600 font-medium leading-tight">
                  Activity increased <strong className="text-emerald-600 font-mono font-bold">24%</strong> over the last 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Technical Capability, Growth Trajectory, and Opportunity Fit */}
      <div className="grid grid-cols-12 gap-4">
        {/* Card 1: Technical Capability (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Technical Capability</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">View all details →</span>
            </div>

            {/* 4 Score Rings */}
            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              {/* Problem Solving */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-500 block">Problem Solving</span>
                <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-emerald-500 stroke-current" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute font-mono font-bold text-xs text-slate-900">85<span className="text-[9px] text-slate-400 font-normal">/100</span></span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 block">Strong</span>
                <span className="text-[9px] text-slate-400 block font-mono">382 problems solved</span>
              </div>

              {/* Development */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-500 block">Development</span>
                <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-blue-600 stroke-current" strokeWidth="3" strokeDasharray="78, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute font-mono font-bold text-xs text-slate-900">78<span className="text-[9px] text-slate-400 font-normal">/100</span></span>
                </div>
                <span className="text-[10px] font-bold text-blue-600 block">Good</span>
                <span className="text-[9px] text-slate-400 block font-mono">5 projects • 4 repos</span>
              </div>

              {/* Competitive Programming */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-500 block">Competitive Prog.</span>
                <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-purple-600 stroke-current" strokeWidth="3" strokeDasharray="71, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute font-mono font-bold text-xs text-slate-900">71<span className="text-[9px] text-slate-400 font-normal">/100</span></span>
                </div>
                <span className="text-[10px] font-bold text-blue-600 block">Good</span>
                <span className="text-[9px] text-slate-400 block font-mono">Rating: 1420 (Max 1487)</span>
              </div>

              {/* Consistency */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-500 block">Consistency</span>
                <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-emerald-500 stroke-current" strokeWidth="3" strokeDasharray="86, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <span className="absolute font-mono font-bold text-xs text-slate-900">86<span className="text-[9px] text-slate-400 font-normal">/100</span></span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 block">Strong</span>
                <span className="text-[9px] text-slate-400 block font-mono">Active 22/30 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Growth & Trajectory (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Growth & Trajectory</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded cursor-pointer">
                <span>Technical Score</span>
                <ChevronRight className="w-3 h-3 transform rotate-90" />
              </div>
            </div>

            {/* Line Chart */}
            <div className="h-36 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SCORE_HISTORY} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreColorGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} domain={[300, 900]} ticks={[300, 450, 600, 750, 900]} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColorGrad)" dot={{ r: 3, fill: '#2563EB' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 2 Bottom Sub-cards */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 font-sans text-xs">
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] text-slate-400 font-semibold block">Growth (Last 90 Days)</span>
                <span className="text-xs font-bold text-emerald-600 font-mono">↑ 18%</span>
                <span className="text-[10px] text-slate-400 block font-mono">+124 points</span>
              </div>

              <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg">
                <span className="text-[10px] text-slate-400 font-semibold block">Compared to Batch</span>
                <span className="text-xs font-bold text-emerald-600 font-mono">↑ 11%</span>
                <span className="text-[10px] text-slate-400 block">Higher than batch avg.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Opportunity Fit (Estimated) & Risk Signals (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <Target className="w-4 h-4 text-purple-600" />
                <span>Opportunity Fit (Estimated)</span>
              </div>
              <span onClick={() => setCurrentScreen('opportunities')} className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">View all →</span>
            </div>

            {/* Role Rows with Progress Bars */}
            <div className="space-y-2 pt-1 text-xs">
              {/* SDE */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-800 text-[11px] w-44 truncate">Software Development Engineer</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91%' }}></div>
                </div>
                <span className="font-mono font-bold text-slate-800 text-[11px]">91%</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-1.5 py-0.5 rounded">Excellent</span>
              </div>

              {/* Backend */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-800 text-[11px] w-44 truncate">Backend Developer</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '83%' }}></div>
                </div>
                <span className="font-mono font-bold text-slate-800 text-[11px]">83%</span>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-1.5 py-0.5 rounded">Strong</span>
              </div>

              {/* Full Stack */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-800 text-[11px] w-44 truncate">Full Stack Developer</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '79%' }}></div>
                </div>
                <span className="font-mono font-bold text-slate-800 text-[11px]">79%</span>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-1.5 py-0.5 rounded">Strong</span>
              </div>

              {/* Data / ML */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-800 text-[11px] w-44 truncate">Data / ML Engineer</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '62%' }}></div>
                </div>
                <span className="font-mono font-bold text-slate-800 text-[11px]">62%</span>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-1.5 py-0.5 rounded">Moderate</span>
              </div>

              {/* Competitive Programmer */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-800 text-[11px] w-44 truncate">Competitive Programmer</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '76%' }}></div>
                </div>
                <span className="font-mono font-bold text-slate-800 text-[11px]">76%</span>
                <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-1.5 py-0.5 rounded">Strong</span>
              </div>
            </div>

            {/* Attention / Risk Signals Section */}
            <div className="pt-2.5 border-t border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Attention / Risk Signals</span>
              </div>
              <p className="text-[11px] font-bold text-emerald-600">No active concerns</p>
              <p className="text-[10px] text-slate-500">"Student is consistent and showing positive progress."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Problem Solving Details, CP Details, and Key Skills */}
      <div className="grid grid-cols-12 gap-4">
        {/* Card 1: Problem Solving Details (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <Code className="w-4 h-4 text-blue-600" />
                <span>Problem Solving Details</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">View full report →</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 items-center">
              {/* Donut Chart */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <PieChart width={112} height={112}>
                  <Pie data={PROBLEM_DONUT_DATA} dataKey="value" innerRadius={34} outerRadius={50} stroke="none">
                    {PROBLEM_DONUT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute text-center font-mono">
                  <span className="text-base font-bold text-slate-900 block leading-tight">382</span>
                  <span className="text-[9px] text-slate-400 font-sans">Total</span>
                </div>
              </div>

              {/* Legend & Topic Strength */}
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Easy: <strong className="font-mono text-slate-800">142 (37%)</strong>
                </div>
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span> Medium: <strong className="font-mono text-slate-800">198 (52%)</strong>
                </div>
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span> Hard: <strong className="font-mono text-slate-800">42 (11%)</strong>
                </div>
              </div>
            </div>

            {/* Topic Strength Bars */}
            <div className="pt-2 space-y-1 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block mb-1">Topic Strength</span>
              <div className="flex items-center justify-between text-[11px]">
                <span className="w-20 font-medium text-slate-700">Arrays</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full mx-2 overflow-hidden"><div className="h-full bg-emerald-500 w-[90%]"></div></div>
                <span className="font-bold text-emerald-600 text-[10px]">Strong</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="w-20 font-medium text-slate-700">Trees</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full mx-2 overflow-hidden"><div className="h-full bg-emerald-500 w-[85%]"></div></div>
                <span className="font-bold text-emerald-600 text-[10px]">Strong</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="w-20 font-medium text-slate-700">Graphs</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full mx-2 overflow-hidden"><div className="h-full bg-emerald-500 w-[80%]"></div></div>
                <span className="font-bold text-emerald-600 text-[10px]">Strong</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="w-20 font-medium text-slate-700">DP</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full mx-2 overflow-hidden"><div className="h-full bg-amber-500 w-[55%]"></div></div>
                <span className="font-bold text-amber-600 text-[10px]">Developing</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="w-20 font-medium text-slate-700">Backtracking</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full mx-2 overflow-hidden"><div className="h-full bg-amber-500 w-[50%]"></div></div>
                <span className="font-bold text-amber-600 text-[10px]">Developing</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-right">
            <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">View all topics →</span>
          </div>
        </div>

        {/* Card 2: Competitive Programming Details (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <Award className="w-4 h-4 text-purple-600" />
                <span>Competitive Programming Details</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">View full report →</span>
            </div>

            {/* Header Stats */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Current Rating</span>
                <span className="font-mono font-bold text-purple-600 text-base">1420</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Max Rating</span>
                <span className="font-mono font-bold text-slate-900 text-sm">1487</span>
                <span className="text-[9px] text-slate-400 block font-mono">May 2024</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Contests</span>
                <span className="font-mono font-bold text-slate-900 text-sm">18</span>
                <span className="text-[9px] text-slate-400 block">Last 6 months</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Global Rank</span>
                <span className="font-mono font-bold text-slate-900 text-xs">#184,562</span>
              </div>
            </div>

            {/* Rating Trend & Recent Contests */}
            <div className="grid grid-cols-2 gap-2 pt-2 items-center text-xs">
              {/* Line Chart */}
              <div className="h-28 w-full">
                <span className="text-[10px] text-slate-400 font-semibold block mb-1">Rating Trend</span>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={CP_RATING_HISTORY} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={9} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={9} domain={[1000, 1600]} tickLine={false} />
                    <Line type="monotone" dataKey="rating" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Contests List */}
              <div className="space-y-1 text-[10px]">
                <span className="font-semibold text-slate-400 uppercase tracking-tight block">Recent Contests</span>
                <div className="flex justify-between items-center"><span className="truncate">Avg Long Contest</span><span className="font-mono font-bold text-slate-800">1487 <span className="text-emerald-600">+87</span></span></div>
                <div className="flex justify-between items-center"><span className="truncate">Codeforces Round 952</span><span className="font-mono font-bold text-slate-800">1412 <span className="text-emerald-600">+56</span></span></div>
                <div className="flex justify-between items-center"><span className="truncate">Div. 3 Round 901</span><span className="font-mono font-bold text-slate-800">1356 <span className="text-emerald-600">+32</span></span></div>
                <div className="flex justify-between items-center"><span className="truncate">EDU Round 156</span><span className="font-mono font-bold text-slate-800">1324 <span className="text-rose-600">-18</span></span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Key Skills & Technologies (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <Star className="w-4 h-4 text-emerald-600" />
                <span>Key Skills & Technologies</span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">View all →</span>
            </div>

            {/* Categorized Skills */}
            <div className="space-y-2 pt-2 text-xs">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">Strong</span>
                <div className="flex flex-wrap gap-1">
                  {['DSA', 'Python', 'React', 'Git', 'Data Structures'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-semibold text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase block mb-1">Good</span>
                <div className="flex flex-wrap gap-1">
                  {['Node.js', 'SQL', 'Java', 'REST APIs'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded font-semibold text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase block mb-1">Developing</span>
                <div className="flex flex-wrap gap-1">
                  {['System Design', 'Cloud (AWS)', 'Docker'].map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded font-semibold text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-slate-400">
            <span>Skills are derived from verified activity and projects.</span>
            <Info className="w-3 h-3 text-slate-400 shrink-0" />
          </div>
        </div>
      </div>

      {/* Row 4: Development (GitHub), Technical Activity, Data Sources, Notes, Mentor */}
      <div className="grid grid-cols-12 gap-4">
        {/* Panel 1: Development (GitHub) (5 cols) */}
        <div className="col-span-5 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                <GitBranch className="w-4 h-4 text-slate-700" />
                <span>Development (GitHub)</span>
              </div>
            </div>

            {/* Top 3 Headline Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-b border-slate-100">
              <div><span className="text-[10px] text-slate-400 font-semibold block">Active Repos</span><span className="font-mono font-bold text-slate-900 text-sm">4</span></div>
              <div><span className="text-[10px] text-slate-400 font-semibold block">Projects</span><span className="font-mono font-bold text-slate-900 text-sm">5</span></div>
              <div><span className="text-[10px] text-slate-400 font-semibold block">Contributions</span><span className="font-mono font-bold text-slate-900 text-sm">486</span><span className="text-[9px] text-slate-400 block font-mono">Last 90 days</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              {/* Top Languages */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block mb-1.5">Top Languages</span>
                <div className="space-y-1.5 font-mono text-[11px]">
                  <div><div className="flex justify-between"><span>JavaScript</span><span>45%</span></div><div className="h-1 bg-amber-400 rounded-full w-[45%]"></div></div>
                  <div><div className="flex justify-between"><span>Python</span><span>30%</span></div><div className="h-1 bg-blue-500 rounded-full w-[30%]"></div></div>
                  <div><div className="flex justify-between"><span>TypeScript</span><span>15%</span></div><div className="h-1 bg-purple-500 rounded-full w-[15%]"></div></div>
                  <div><div className="flex justify-between"><span>SQL</span><span>10%</span></div><div className="h-1 bg-emerald-500 rounded-full w-[10%]"></div></div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block mb-1.5">Recent Activity</span>
                <div className="space-y-1 text-[10px]">
                  <div className="flex items-start gap-1 text-slate-700 font-medium"><GitCommit className="w-3 h-3 text-blue-600 shrink-0 mt-0.5" /><span className="truncate">Pushed 3 commits to e-commerce-api</span></div>
                  <div className="flex items-start gap-1 text-slate-700 font-medium"><GitPullRequest className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" /><span className="truncate">Merged PR #18 in task-manager-app</span></div>
                  <div className="flex items-start gap-1 text-slate-700 font-medium"><FileText className="w-3 h-3 text-purple-600 shrink-0 mt-0.5" /><span className="truncate">Updated README in portfolio-site</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-right">
            <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">View all activity →</span>
          </div>
        </div>

        {/* Panel 2: Technical Activity (Last 30 Days) (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 border-b border-slate-100 pb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Technical Activity (Last 30 Days)</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              {/* Activity Stats */}
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between"><span>Active Days</span><strong className="text-slate-900 font-bold">22 / 30</strong></div>
                <div className="flex justify-between"><span>Problem Solving</span><strong className="text-slate-900 font-bold">18 / 30</strong></div>
                <div className="flex justify-between"><span>Development Days</span><strong className="text-slate-900 font-bold">14 / 30</strong></div>
                <div className="flex justify-between"><span>Contest Participated</span><strong className="text-slate-900 font-bold">2</strong></div>
              </div>

              {/* Activity Heatmap Grid */}
              <div className="space-y-1 text-center">
                <span className="text-[10px] text-slate-400 font-semibold block">Activity Heatmap</span>
                <div className="grid grid-cols-6 gap-1 p-1 bg-slate-50 rounded-lg">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const intensity = (i * 7) % 4;
                    const colors = ['bg-slate-200', 'bg-emerald-200', 'bg-emerald-400', 'bg-emerald-600'];
                    return (
                      <div key={i} className={`w-3 h-3 rounded-xs ${colors[intensity]}`} title={`Day ${i+1}`} />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[8px] text-slate-400 font-mono pt-0.5">
                  <span>Less</span>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3: Data Sources, Notes, and Mentor Assignment (3 cols) */}
        <div className="col-span-3 space-y-4">
          {/* Data Sources */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 font-bold text-slate-900 text-[11px]">
              <span>Data Sources</span>
              <span className="text-blue-600 font-semibold cursor-pointer text-[10px]">View all sources →</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
              <div className="p-1.5 bg-slate-50 border border-slate-100 rounded flex items-center justify-between">
                <span className="font-semibold text-slate-800">LeetCode</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-100 rounded flex items-center justify-between">
                <span className="font-semibold text-slate-800">Codeforces</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-100 rounded flex items-center justify-between">
                <span className="font-semibold text-slate-800">GitHub</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
              <div className="p-1.5 bg-slate-50 border border-slate-100 rounded flex items-center justify-between">
                <span className="font-semibold text-slate-800">GeeksforGeeks</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              </div>
            </div>
          </div>

          {/* CTC Notes */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 text-[11px]">
              <span>CTC Notes (Internal)</span>
              <button onClick={() => setIsNotesEditing(!isNotesEditing)} className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5 text-[10px]">
                <Edit className="w-3 h-3" /> Edit
              </button>
            </div>

            {isNotesEditing ? (
              <div className="space-y-1.5">
                <textarea
                  value={notesText}
                  onChange={e => setNotesText(e.target.value)}
                  className="w-full text-[11px] p-2 bg-slate-50 border border-slate-200 rounded font-medium focus:outline-none focus:border-blue-500"
                  rows={2}
                />
                <button
                  onClick={() => setIsNotesEditing(false)}
                  className="px-2 py-0.5 bg-blue-600 text-white font-semibold rounded text-[10px]"
                >
                  Save Note
                </button>
              </div>
            ) : (
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">
                "{notesText}"
              </p>
            )}
          </div>

          {/* Mentor Assignment */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 text-[11px]">
              <span>Mentor Assignment</span>
              <button onClick={() => setIsMentorModalOpen(true)} className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5 text-[10px]">
                + Assign Mentor
              </button>
            </div>

            {assignedMentor ? (
              <div className="p-2 bg-blue-50/60 border border-blue-100 rounded text-[11px] space-y-0.5">
                <p className="font-bold text-blue-900">{assignedMentor.name}</p>
                <p className="text-[10px] text-slate-500">{assignedMentor.title} ({assignedMentor.dept})</p>
              </div>
            ) : (
              <div>
                <p className="text-[11px] font-bold text-slate-700">Not assigned</p>
                <p className="text-[10px] text-slate-400">Assign a mentor to track and guide this student.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Modals */}
      <CreateGroupModal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} />
      <CreateInterventionModal isOpen={isInterventionModalOpen} onClose={() => setIsInterventionModalOpen(false)} />
      <AssignMentorModal isOpen={isMentorModalOpen} onClose={() => setIsMentorModalOpen(false)} studentId={student.id} />
    </div>
  );
};
