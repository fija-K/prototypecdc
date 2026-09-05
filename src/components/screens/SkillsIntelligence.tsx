import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreateInterventionModal } from '../layout/ActionModals';
import { 
  BarChart3, Info, RefreshCw, Download, Users, UserCheck, TrendingUp, 
  Target, AlertTriangle, ChevronDown, CheckCircle2, ArrowUpRight, 
  ExternalLink, Layers, ShieldCheck, Database, Terminal, Code2, Plus,
  ChevronRight, Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

// Mock Data Definitions for Skills Intelligence
interface SkillLandscapeRow {
  skill: string;
  strength: 'Strong' | 'Good' | 'Moderate' | 'Weak' | 'Developing' | 'Very Weak';
  students: number;
  coverage: number;
  change: string;
  trendPath: string; // SVG path d attribute for sparkline
}

const INITIAL_SKILL_LANDSCAPE: SkillLandscapeRow[] = [
  { skill: 'Python', strength: 'Strong', students: 1842, coverage: 64.7, change: '↑ 12%', trendPath: 'M0,12 L8,10 L16,8 L24,9 L32,6 L40,4 L48,2' },
  { skill: 'Java', strength: 'Strong', students: 1293, coverage: 45.4, change: '↑ 8%', trendPath: 'M0,14 L8,12 L16,11 L24,9 L32,7 L40,6 L48,4' },
  { skill: 'C++', strength: 'Strong', students: 1108, coverage: 38.9, change: '↑ 6%', trendPath: 'M0,13 L8,12 L16,10 L24,10 L32,8 L40,7 L48,5' },
  { skill: 'DSA', strength: 'Strong', students: 1976, coverage: 69.4, change: '↑ 9%', trendPath: 'M0,15 L8,13 L16,10 L24,8 L32,6 L40,4 L48,3' },
  { skill: 'React', strength: 'Good', students: 684, coverage: 24.0, change: '↑ 16%', trendPath: 'M0,15 L8,14 L16,11 L24,8 L32,5 L40,3 L48,1' },
  { skill: 'Node.js', strength: 'Good', students: 527, coverage: 18.5, change: '↑ 9%', trendPath: 'M0,14 L8,13 L16,12 L24,10 L32,8 L40,6 L48,5' },
  { skill: 'Machine Learning', strength: 'Moderate', students: 413, coverage: 14.5, change: '↑ 11%', trendPath: 'M0,15 L8,14 L16,12 L24,9 L32,7 L40,5 L48,4' },
  { skill: 'Cloud (AWS/GCP)', strength: 'Weak', students: 287, coverage: 10.1, change: '↑ 7%', trendPath: 'M0,15 L8,14 L16,13 L24,12 L32,10 L40,8 L48,7' },
  { skill: 'Backend Development', strength: 'Developing', students: 523, coverage: 18.4, change: '↑ 9%', trendPath: 'M0,14 L8,13 L16,12 L24,11 L32,9 L40,7 L48,6' },
  { skill: 'System Design', strength: 'Very Weak', students: 192, coverage: 6.7, change: '↑ 2%', trendPath: 'M0,15 L8,15 L16,14 L24,14 L32,13 L40,13 L48,12' },
];

const DONUT_DATA = [
  { name: 'Strong', value: 889, percent: '34.0%', color: '#10B981' },
  { name: 'Good', value: 912, percent: '34.9%', color: '#2563EB' },
  { name: 'Developing', value: 563, percent: '21.5%', color: '#F59E0B' },
  { name: 'Weak', value: 179, percent: '6.8%', color: '#EF4444' },
  { name: 'Insufficient Evidence', value: 71, percent: '2.7%', color: '#94A3B8' },
];

const TREND_LINE_DATA = [
  { month: 'Mar', score: 622 },
  { month: 'Apr', score: 634 },
  { month: 'May', score: 648 },
  { month: 'Jun', score: 665 },
  { month: 'Jul', score: 689 },
  { month: 'Aug', score: 689 },
];

const BATCH_COMPARISON_DATA = [
  { batch: '2026', value: 12.0, color: '#10B981' },
  { batch: '2027', value: 8.0, color: '#2563EB' },
  { batch: '2028', value: 5.2, color: '#F59E0B' },
  { batch: '2029', value: 3.1, color: '#EF4444' },
  { batch: '2030', value: 2.4, color: '#8B5CF6' },
];

const DEPARTMENT_HEATMAP_DATA = [
  { skill: 'DSA', cse: '78%', aiml: '74%', it: '69%', ece: '52%', mech: '41%', overall: '69.4%' },
  { skill: 'Python', cse: '72%', aiml: '81%', it: '64%', ece: '43%', mech: '34%', overall: '64.7%' },
  { skill: 'React', cse: '34%', aiml: '29%', it: '41%', ece: '17%', mech: '12%', overall: '24.0%' },
  { skill: 'Backend', cse: '26%', aiml: '22%', it: '31%', ece: '14%', mech: '10%', overall: '18.4%' },
  { skill: 'Cloud', cse: '12%', aiml: '18%', it: '15%', ece: '7%', mech: '5%', overall: '10.1%' },
  { skill: 'System Design', cse: '9%', aiml: '7%', it: '8%', ece: '3%', mech: '2%', overall: '6.7%' },
];

export const SkillsIntelligence: React.FC = () => {
  const { setCurrentScreen, filterTalentPool } = useApp();
  
  // Filter bar states
  const [analyzeScope, setAnalyzeScope] = useState('Institution');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [batchFilter, setBatchFilter] = useState('All Years');
  const [acadYearFilter, setAcadYearFilter] = useState('2026 - 27');
  
  // Chart Skill Selectors
  const [trendSkill, setTrendSkill] = useState('Technical Score');
  const [batchSkill, setBatchSkill] = useState('System Design');

  // Modals & Action States
  const [isCreateTrainingModalOpen, setIsCreateTrainingModalOpen] = useState(false);
  const [selectedGapDetail, setSelectedGapDetail] = useState<string | null>(null);

  // Dynamic values calculated based on filters
  const totalStudents = deptFilter === 'CSE' ? 982 : deptFilter === 'AIML' ? 614 : 2846;
  const verifiedStudents = Math.round(totalStudents * 0.918);
  const avgTechScore = deptFilter === 'CSE' ? 734 : deptFilter === 'MECH' ? 542 : 689;

  return (
    <div className="p-6 space-y-4 bg-[#F8FAFC] min-h-screen font-sans text-slate-800 select-none pb-24">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Skills & Institutional Intelligence</h1>
            <div className="group relative">
              <Info className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
              <div className="absolute left-0 mt-1 w-72 p-2 bg-slate-900 text-slate-100 text-[11px] rounded-lg shadow-xl z-30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                Institution-wide empirical skill analytics derived from platform activity, projects, and contest data.
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Understand technical capabilities, identify skill gaps, and drive training priorities.
          </p>
        </div>

        {/* Right Header Metadata & Export */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-mono">
            <span>Last updated: 2 hours ago</span>
            <button className="p-1 hover:bg-slate-200/70 rounded-md transition-colors">
              <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>

          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors">
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. Context Filter Bar */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500 uppercase text-[10px]">Analyze</span>
            <select 
              value={analyzeScope} 
              onChange={e => setAnalyzeScope(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="Institution">Institution</option>
              <option value="Department">Department</option>
              <option value="Batch">Batch</option>
              <option value="Group">Group</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500 uppercase text-[10px]">Department</span>
            <select 
              value={deptFilter} 
              onChange={e => setDeptFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All Departments">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="AIML">AIML</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500 uppercase text-[10px]">Batch / Year</span>
            <select 
              value={batchFilter} 
              onChange={e => setBatchFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All Years">All Years</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500 uppercase text-[10px]">Academic Year</span>
            <select 
              value={acadYearFilter} 
              onChange={e => setAcadYearFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="2026 - 27">2026 - 27</option>
              <option value="2025 - 26">2025 - 26</option>
              <option value="2024 - 25">2024 - 25</option>
            </select>
          </div>
        </div>

        {deptFilter !== 'All Departments' && (
          <button 
            onClick={() => { setDeptFilter('All Departments'); setBatchFilter('All Years'); }}
            className="text-[11px] text-blue-600 hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* 3. Top 5 KPI Cards Strip */}
      <div className="grid grid-cols-5 gap-3.5 font-sans">
        {/* Card 1: Total Students */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Total Students</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">{totalStudents.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block font-medium">Tracked in system</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 2: Students with Skill Evidence */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Students with Skill Evidence</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">{verifiedStudents.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 block font-medium">91.8% of total</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 3: Avg Technical Score */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Avg Technical Score</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">{avgTechScore}</span>
            <span className="text-[10px] text-emerald-600 block font-bold">+8% vs last 90 days</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 4: Institutional Readiness */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Institutional Readiness</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">72%</span>
            <span className="text-[10px] text-slate-400 block font-medium">Overall technical readiness</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Target className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 5: Critical Skill Gaps */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Critical Skill Gaps</span>
            <span className="text-2xl font-bold text-rose-600 font-sans block">2</span>
            <span className="text-[10px] text-slate-400 block font-medium">Require immediate focus</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>

      {/* 4. Row 2 Panels: Skill Landscape (Left), Skill Strength Distribution (Middle), Biggest Skill Gaps (Right) */}
      <div className="grid grid-cols-12 gap-4">
        {/* Panel 1: Skill Landscape (5 cols) */}
        <div className="col-span-5 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3 font-sans text-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                  <span>Skill Landscape</span>
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Distribution of skills across the institution</p>
              </div>

              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">View as:</span>
                <select className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-semibold text-slate-800">
                  <option value="table">Table</option>
                  <option value="chart">Chart</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-1.5">Skill</th>
                    <th className="pb-1.5">Strength</th>
                    <th className="pb-1.5 text-right">Students</th>
                    <th className="pb-1.5 text-right">Coverage</th>
                    <th className="pb-1.5 text-center">Trend (90D)</th>
                    <th className="pb-1.5 text-right">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  {INITIAL_SKILL_LANDSCAPE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 cursor-pointer transition-colors">
                      <td className="py-1.5 font-bold text-slate-900">{row.skill}</td>
                      <td className="py-1.5">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-semibold ${
                          row.strength === 'Strong' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          row.strength === 'Good' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          row.strength === 'Moderate' || row.strength === 'Developing' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {row.strength}
                        </span>
                      </td>
                      <td className="py-1.5 text-right font-mono font-bold text-slate-800">{row.students.toLocaleString()}</td>
                      <td className="py-1.5 text-right font-mono text-slate-700">{row.coverage}%</td>
                      <td className="py-1.5 text-center">
                        <svg className="w-12 h-3.5 mx-auto text-emerald-500 overflow-visible" viewBox="0 0 48 16">
                          <path d={row.trendPath} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </td>
                      <td className="py-1.5 text-right font-mono font-bold text-emerald-600">{row.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-right">
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center justify-end gap-1">
              <span>View all skills</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Panel 2: Skill Strength Distribution (3.5 cols) */}
        <div className="col-span-3 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3 font-sans text-xs">
          <div>
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <span>Skill Strength Distribution</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Overall skill strength distribution</p>
            </div>

            {/* Donut Chart */}
            <div className="py-3">
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                <PieChart width={144} height={144}>
                  <Pie data={DONUT_DATA} dataKey="value" innerRadius={42} outerRadius={62} stroke="none">
                    {DONUT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute text-center font-mono">
                  <span className="text-base font-bold text-slate-900 block leading-tight">2,614</span>
                  <span className="text-[9px] text-slate-400 font-sans">Students</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-1.5 pt-3 text-[11px]">
                {DONUT_DATA.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-mono text-slate-900 font-bold">{item.value} <span className="text-slate-400 font-normal">({item.percent})</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 italic text-center">
            Based on strength levels across all tracked skills.
          </div>
        </div>

        {/* Panel 3: Biggest Skill Gaps (3.5 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3 font-sans text-xs">
          <div>
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <span>Biggest Skill Gaps</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Skills needing institutional focus</p>
            </div>

            {/* List of 4 Ranked Gaps */}
            <div className="space-y-2.5 pt-3">
              {/* Gap 1 */}
              <div className="p-2.5 bg-rose-50/50 border border-rose-100 rounded-xl flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs">System Design</h4>
                    <span className="bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded text-[9px]">Critical</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Only 6.7% of students have sufficient evidence in System Design.</p>
                  <span className="text-xs font-mono font-bold text-rose-600 block">6.7% coverage</span>
                </div>
              </div>

              {/* Gap 2 */}
              <div className="p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs">Cloud (AWS/GCP/Azure)</h4>
                    <span className="bg-amber-100 text-amber-700 font-bold px-1.5 py-0.2 rounded text-[9px]">High</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Limited cloud exposure across most departments.</p>
                  <span className="text-xs font-mono font-bold text-amber-600 block">10.1% coverage</span>
                </div>
              </div>

              {/* Gap 3 */}
              <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs">Backend Development</h4>
                    <span className="bg-amber-100 text-amber-700 font-bold px-1.5 py-0.2 rounded text-[9px]">Moderate</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Need stronger backend fundamentals and project experience.</p>
                  <span className="text-xs font-mono font-bold text-slate-700 block">18.4% coverage</span>
                </div>
              </div>

              {/* Gap 4 */}
              <div className="p-2.5 bg-rose-50/50 border border-rose-100 rounded-xl flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-xs">Distributed Systems</h4>
                    <span className="bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded text-[9px]">Critical</span>
                  </div>
                  <p className="text-[10px] text-slate-600">Very limited exposure to distributed systems concepts.</p>
                  <span className="text-xs font-mono font-bold text-rose-600 block">4.2% coverage</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
              <span>View all gaps</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
            <button 
              onClick={() => setIsCreateTrainingModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
              <span>Create Training Program</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Row 3 Grid Panels: Department Matrix (Left), Skill Trend (Middle), Batch Comparison (Right) */}
      <div className="grid grid-cols-12 gap-4 font-sans text-xs">
        {/* Panel 1: Skill Distribution by Department (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <span>Skill Distribution by Department</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">% of students with sufficient evidence</p>
            </div>

            {/* Matrix Heatmap Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-1.5">Skill / Dept.</th>
                    <th className="pb-1.5 text-center">CSE<br/><span className="font-normal text-[9px] text-slate-400">(982)</span></th>
                    <th className="pb-1.5 text-center">AIML<br/><span className="font-normal text-[9px] text-slate-400">(614)</span></th>
                    <th className="pb-1.5 text-center">IT<br/><span className="font-normal text-[9px] text-slate-400">(478)</span></th>
                    <th className="pb-1.5 text-center">ECE<br/><span className="font-normal text-[9px] text-slate-400">(412)</span></th>
                    <th className="pb-1.5 text-center">MECH<br/><span className="font-normal text-[9px] text-slate-400">(194)</span></th>
                    <th className="pb-1.5 text-center font-bold text-slate-700">Overall<br/><span className="font-normal text-[9px] text-slate-400">(2,680)</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-mono font-medium">
                  {DEPARTMENT_HEATMAP_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80">
                      <td className="py-1.5 font-sans font-bold text-slate-900 text-[11px]">{row.skill}</td>
                      <td className="py-1.5 text-center bg-emerald-50/60 text-emerald-800 font-bold">{row.cse}</td>
                      <td className="py-1.5 text-center bg-emerald-50/60 text-emerald-800 font-bold">{row.aiml}</td>
                      <td className="py-1.5 text-center bg-blue-50/60 text-blue-800 font-bold">{row.it}</td>
                      <td className="py-1.5 text-center bg-amber-50/50 text-amber-800">{row.ece}</td>
                      <td className="py-1.5 text-center bg-rose-50/40 text-rose-800">{row.mech}</td>
                      <td className="py-1.5 text-center font-bold text-slate-900 bg-slate-50">{row.overall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
              <span>View department analysis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Panel 2: Skill Trend (Institution Level) (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                  <span>Skill Trend (Institution Level)</span>
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </h3>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Select Skill</span>
                <select 
                  value={trendSkill} 
                  onChange={e => setTrendSkill(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-semibold text-slate-800"
                >
                  <option value="Technical Score">Technical Score</option>
                  <option value="DSA">DSA Mastery</option>
                  <option value="Python">Python</option>
                  <option value="System Design">System Design</option>
                </select>
              </div>
            </div>

            {/* Line Chart */}
            <div className="h-36 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TREND_LINE_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis domain={[550, 720]} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: '#2563EB' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 4 Metric Indicators Strip */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center font-mono">
              <div className="p-1.5 bg-slate-50 rounded-lg">
                <strong className="text-emerald-600 text-xs font-bold block">+8%</strong>
                <span className="text-[9px] text-slate-500 font-sans block">Growth (90 Days)</span>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 text-xs font-bold block">+67</strong>
                <span className="text-[9px] text-slate-500 font-sans block">Score Increase</span>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg">
                <strong className="text-slate-900 text-xs font-bold block">76%</strong>
                <span className="text-[9px] text-slate-500 font-sans block">Students Improved</span>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg">
                <strong className="text-emerald-600 text-xs font-bold block">18%</strong>
                <span className="text-[9px] text-slate-500 font-sans block">Above Inst. Avg</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-right">
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center justify-end gap-1">
              <span>View trends for all skills</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Panel 3: Batch / Year Comparison (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                  <span>Batch / Year Comparison</span>
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Skill strength comparison across batches</p>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <span className="text-slate-500 font-medium">Select Skill</span>
                <select 
                  value={batchSkill} 
                  onChange={e => setBatchSkill(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-semibold text-slate-800"
                >
                  <option value="System Design">System Design</option>
                  <option value="DSA">DSA</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-44 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BATCH_COMPARISON_DATA} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="batch" tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fontSize: 10, fill: '#64748B' }} />
                  <YAxis domain={[0, 15]} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {BATCH_COMPARISON_DATA.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
              <span>View all skills by batch</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* 6. Row 4 Panels: Training Opportunities (Left), Benchmark vs Target (Middle), Data Sources & Methodology (Right) */}
      <div className="grid grid-cols-12 gap-4 font-sans text-xs">
        {/* Panel 1: Training Opportunities (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <span>Training Opportunities</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Recommended training based on gaps</p>
            </div>

            {/* 3 Horizontal Cards */}
            <div className="space-y-2.5 pt-3">
              {/* Card 1 */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">System Design Foundation</h4>
                    <p className="text-[10px] text-slate-500">1,920 students can benefit</p>
                  </div>
                </div>
                <span className="bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded text-[9px]">Critical</span>
              </div>

              {/* Card 2 */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Cloud Practitioner</h4>
                    <p className="text-[10px] text-slate-500">2,217 students can benefit</p>
                  </div>
                </div>
                <span className="bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded text-[9px]">High</span>
              </div>

              {/* Card 3 */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Backend Development</h4>
                    <p className="text-[10px] text-slate-500">1,670 students can benefit</p>
                  </div>
                </div>
                <span className="bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded text-[9px]">Moderate</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
              <span>View all training opportunities</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Panel 2: Benchmark vs Target (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <span>Benchmark vs Target</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Institutional targets vs current state</p>
            </div>

            {/* Benchmark Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="pb-1.5">Skill</th>
                    <th className="pb-1.5 text-right">Target</th>
                    <th className="pb-1.5 text-right">Current</th>
                    <th className="pb-1.5 text-right">Gap</th>
                    <th className="pb-1.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2 font-bold text-slate-900">DSA</td>
                    <td className="py-2 text-right font-mono text-slate-600">80%</td>
                    <td className="py-2 text-right font-mono font-bold text-slate-900">69.4%</td>
                    <td className="py-2 text-right font-mono text-amber-600 font-bold">-10.6%</td>
                    <td className="py-2 text-right"><span className="bg-amber-100 text-amber-700 font-bold px-1.5 py-0.2 rounded text-[9px]">Gap</span></td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2 font-bold text-slate-900">System Design</td>
                    <td className="py-2 text-right font-mono text-slate-600">60%</td>
                    <td className="py-2 text-right font-mono font-bold text-slate-900">6.7%</td>
                    <td className="py-2 text-right font-mono text-rose-600 font-bold">-53.3%</td>
                    <td className="py-2 text-right"><span className="bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded text-[9px]">Critical</span></td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2 font-bold text-slate-900">Cloud</td>
                    <td className="py-2 text-right font-mono text-slate-600">50%</td>
                    <td className="py-2 text-right font-mono font-bold text-slate-900">10.1%</td>
                    <td className="py-2 text-right font-mono text-rose-600 font-bold">-39.9%</td>
                    <td className="py-2 text-right"><span className="bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded text-[9px]">Critical</span></td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-2 font-bold text-slate-900">Backend</td>
                    <td className="py-2 text-right font-mono text-slate-600">60%</td>
                    <td className="py-2 text-right font-mono font-bold text-slate-900">18.4%</td>
                    <td className="py-2 text-right font-mono text-rose-600 font-bold">-41.6%</td>
                    <td className="py-2 text-right"><span className="bg-rose-100 text-rose-700 font-bold px-1.5 py-0.2 rounded text-[9px]">Critical</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
              <span>Manage targets</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Panel 3: Data Sources & Methodology (4 cols) */}
        <div className="col-span-4 space-y-4">
          {/* Data Sources */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight flex items-center gap-1.5">
                <span>Data Sources</span>
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Last synced status</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[10px] font-sans font-medium text-slate-700">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">LeetCode</strong>
                  <span className="text-slate-400">2h ago</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              </div>

              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">Codeforces</strong>
                  <span className="text-slate-400">2h ago</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              </div>

              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">GitHub</strong>
                  <span className="text-slate-400">15m ago</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              </div>

              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">GFG</strong>
                  <span className="text-slate-400">3h ago</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              </div>

              <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">Other Platforms</strong>
                  <span className="text-slate-400">2h ago</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              </div>
            </div>
          </div>

          {/* How Intelligence is Calculated */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-xs">How Intelligence is Calculated</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Skills are derived from verified activity, projects, problem solving, and multiple data sources. Strength levels are based on depth of evidence, consistency, and recency.
            </p>
            <a href="#methodology" className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 pt-0.5">
              <span>Learn more about our methodology</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Intervention Modal */}
      <CreateInterventionModal isOpen={isCreateTrainingModalOpen} onClose={() => setIsCreateTrainingModalOpen(false)} />
    </div>
  );
};
