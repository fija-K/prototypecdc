import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, UserCheck, Star, TrendingUp, AlertTriangle, Clock, 
  ChevronRight, ArrowUpRight, ArrowDownRight, Building2, Calendar, 
  Search, Plus, Target, Briefcase, ChevronDown, Info
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip 
} from 'recharts';

const TREND_DATA = [
  { month: 'Apr', score: 580 },
  { month: 'May', score: 610 },
  { month: 'Jun', score: 650 },
  { month: 'Jul', score: 700 },
  { month: 'Aug', score: 745 },
];

export const CDCOverview: React.FC = () => {
  const { setCurrentScreen, filterTalentPool } = useApp();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'ay'>('30d');

  return (
    <div className="p-6 space-y-5 bg-[#F8FAFC] min-h-screen font-sans text-slate-800">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Technical Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">Technical health across 2,846 tracked students.</p>
        </div>

        {/* Time Segmented Control */}
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm text-xs font-medium">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1 rounded-md transition-all ${
              timeRange === '7d' ? 'bg-blue-600 text-white font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1 rounded-md transition-all ${
              timeRange === '30d' ? 'bg-blue-600 text-white font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-3 py-1 rounded-md transition-all ${
              timeRange === '90d' ? 'bg-blue-600 text-white font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            90 Days
          </button>
          <button
            onClick={() => setTimeRange('ay')}
            className={`px-3 py-1 rounded-md transition-all ${
              timeRange === 'ay' ? 'bg-blue-600 text-white font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Academic Year
          </button>
        </div>
      </div>

      {/* 6 KPI Cards Row */}
      <div className="grid grid-cols-6 gap-3.5">
        {/* 1. Students Tracked */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Students Tracked</span>
            <span className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 block font-sans">2,846</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-slate-400 font-medium">—</span>
            <span onClick={() => filterTalentPool('ALL')} className="text-blue-600 text-[11px] font-semibold hover:underline cursor-pointer">
              View details
            </span>
          </div>
        </div>

        {/* 2. Technically Active */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Technically Active</span>
            <span className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 block font-sans">1,972</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-emerald-600 text-[11px] font-bold flex items-center gap-0.5">
              ↑ 8.3%
            </span>
            <span onClick={() => filterTalentPool('ALL')} className="text-blue-600 text-[11px] font-semibold hover:underline cursor-pointer">
              View details
            </span>
          </div>
        </div>

        {/* 3. High Potential */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">High Potential</span>
            <span className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 block font-sans">384</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-emerald-600 text-[11px] font-bold flex items-center gap-0.5">
              ↑ 6.7%
            </span>
            <span onClick={() => filterTalentPool('High Potential')} className="text-blue-600 text-[11px] font-semibold hover:underline cursor-pointer">
              View details
            </span>
          </div>
        </div>

        {/* 4. High Growth */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">High Growth</span>
            <span className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 block font-sans">217</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-emerald-600 text-[11px] font-bold flex items-center gap-0.5">
              ↑ 15.4%
            </span>
            <span onClick={() => filterTalentPool('High Growth')} className="text-blue-600 text-[11px] font-semibold hover:underline cursor-pointer">
              View details
            </span>
          </div>
        </div>

        {/* 5. Needs Attention */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Needs Attention</span>
            <span className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 block font-sans">427</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-rose-600 text-[11px] font-bold flex items-center gap-0.5">
              ↑ 9.1%
            </span>
            <span onClick={() => filterTalentPool('Needs Attention')} className="text-blue-600 text-[11px] font-semibold hover:underline cursor-pointer">
              View details
            </span>
          </div>
        </div>

        {/* 6. Data Coverage */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Data Coverage</span>
            <span className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 block font-sans">82%</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
            <span className="text-emerald-600 text-[11px] font-bold flex items-center gap-0.5">
              ↑ 3.2%
            </span>
            <span onClick={() => setCurrentScreen('skills-intelligence')} className="text-blue-600 text-[11px] font-semibold hover:underline cursor-pointer">
              View details
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Analytics Row (3 Panels) */}
      <div className="grid grid-cols-3 gap-4">
        {/* 7A. Institutional Technical Health */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-3">Institutional Technical Health</h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Problem Solving</span>
                  <span className="font-bold">72%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Development</span>
                  <span className="font-bold">64%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Competitive Programming</span>
                  <span className="font-bold">48%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Project Activity</span>
                  <span className="font-bold">59%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '59%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Consistency</span>
                  <span className="font-bold">67%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span onClick={() => setCurrentScreen('skills-intelligence')} className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1">
              View full analysis →
            </span>
          </div>
        </div>

        {/* 7C. Needs Your Attention */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight mb-3">Needs Your Attention</h3>

            <div className="space-y-2.5 text-xs">
              {/* Activity Decline */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[11px]">Activity Decline</p>
                    <p className="text-[10px] text-slate-500 leading-tight">128 students have shown significant technical activity decline.</p>
                  </div>
                </div>
                <button
                  onClick={() => filterTalentPool('Needs Attention')}
                  className="px-2 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded text-[10px] font-semibold shrink-0"
                >
                  View students
                </button>
              </div>

              {/* Skill Gap */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[11px]">Skill Gap</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Dynamic Programming is significantly below institutional benchmark in 2027.</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentScreen('skills-intelligence')}
                  className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-200 rounded text-[10px] font-semibold shrink-0"
                >
                  Explore gap
                </button>
              </div>

              {/* High Growth */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[11px]">High Growth</p>
                    <p className="text-[10px] text-slate-500 leading-tight">43 students show exceptional recent technical growth.</p>
                  </div>
                </div>
                <button
                  onClick={() => filterTalentPool('High Growth')}
                  className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 rounded text-[10px] font-semibold shrink-0"
                >
                  Explore talent
                </button>
              </div>

              {/* Data Coverage */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[11px]">Data Coverage</p>
                    <p className="text-[10px] text-slate-500 leading-tight">312 students have insufficient technical data.</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentScreen('skills-intelligence')}
                  className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded text-[10px] font-semibold shrink-0"
                >
                  Review coverage
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span onClick={() => filterTalentPool('Needs Attention')} className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1">
              View all signals →
            </span>
          </div>
        </div>

        {/* 7D. Institutional Trend */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Institutional Trend</h3>
              <div className="flex items-center gap-1 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded px-2 py-0.5 font-semibold cursor-pointer">
                <span>Score</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* Recharts Area Line */}
            <div className="h-44 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="scoreTrendColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} domain={[400, 800]} ticks={[400, 500, 600, 700, 800]} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreTrendColor)" dot={{ r: 3, fill: '#2563EB' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span onClick={() => setCurrentScreen('skills-intelligence')} className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1">
              View full trends →
            </span>
          </div>
        </div>
      </div>

      {/* Lower Analytics Row (3 Panels) */}
      <div className="grid grid-cols-12 gap-4">
        {/* 8A. Department Overview (5 cols) */}
        <div className="col-span-5 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Department Overview</h3>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-2">Department</th>
                  <th className="pb-2 text-right">Students</th>
                  <th className="pb-2 text-right">Avg Score</th>
                  <th className="pb-2 text-right">Growth (30D)</th>
                  <th className="pb-2 text-right">Active</th>
                  <th className="pb-2 text-right">Needs Attention</th>
                  <th className="pb-2 w-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                <tr className="hover:bg-slate-50/80 cursor-pointer">
                  <td className="py-2.5 font-bold text-slate-900">CSE</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">1,240</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-800">724</td>
                  <td className="py-2.5 text-right font-mono font-bold text-emerald-600">↑ 11%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">82%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">14%</td>
                  <td className="py-2.5 text-right text-slate-400"><ChevronRight className="w-3.5 h-3.5" /></td>
                </tr>

                <tr className="hover:bg-slate-50/80 cursor-pointer">
                  <td className="py-2.5 font-bold text-slate-900">AIML</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">420</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-800">681</td>
                  <td className="py-2.5 text-right font-mono font-bold text-emerald-600">↑ 16%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">79%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">12%</td>
                  <td className="py-2.5 text-right text-slate-400"><ChevronRight className="w-3.5 h-3.5" /></td>
                </tr>

                <tr className="hover:bg-slate-50/80 cursor-pointer">
                  <td className="py-2.5 font-bold text-slate-900">IT</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">510</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-800">654</td>
                  <td className="py-2.5 text-right font-mono font-bold text-emerald-600">↑ 8%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">74%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">17%</td>
                  <td className="py-2.5 text-right text-slate-400"><ChevronRight className="w-3.5 h-3.5" /></td>
                </tr>

                <tr className="hover:bg-slate-50/80 cursor-pointer">
                  <td className="py-2.5 font-bold text-slate-900">ECE</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">476</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-800">593</td>
                  <td className="py-2.5 text-right font-mono font-bold text-emerald-600">↑ 4%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">61%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">23%</td>
                  <td className="py-2.5 text-right text-slate-400"><ChevronRight className="w-3.5 h-3.5" /></td>
                </tr>

                <tr className="hover:bg-slate-50/80 cursor-pointer">
                  <td className="py-2.5 font-bold text-slate-900">MECH</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">200</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-800">539</td>
                  <td className="py-2.5 text-right font-mono font-bold text-rose-600">↓ 2%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">58%</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">26%</td>
                  <td className="py-2.5 text-right text-slate-400"><ChevronRight className="w-3.5 h-3.5" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span onClick={() => setCurrentScreen('skills-intelligence')} className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1">
              View all departments →
            </span>
          </div>
        </div>

        {/* 8B. Batch Overview (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Batch Overview</h3>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-2">Batch</th>
                  <th className="pb-2 text-right">Students</th>
                  <th className="pb-2 text-right">Avg Score</th>
                  <th className="pb-2 text-right">Active</th>
                  <th className="pb-2 text-right">Growth (30D)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium">
                <tr className="hover:bg-slate-50/80 cursor-pointer">
                  <td className="py-2.5 font-bold text-slate-900">2027</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">982</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-800">712</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">78%</td>
                  <td className="py-2.5 text-right font-mono font-bold text-emerald-600">↑ 12%</td>
                </tr>

                <tr className="hover:bg-slate-50/80 cursor-pointer">
                  <td className="py-2.5 font-bold text-slate-900">2028</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">864</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-800">662</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">74%</td>
                  <td className="py-2.5 text-right font-mono font-bold text-emerald-600">↑ 8%</td>
                </tr>

                <tr className="hover:bg-slate-50/80 cursor-pointer">
                  <td className="py-2.5 font-bold text-slate-900">2029</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">628</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-800">604</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">69%</td>
                  <td className="py-2.5 text-right font-mono font-bold text-emerald-600">↑ 6%</td>
                </tr>

                <tr className="hover:bg-slate-50/80 cursor-pointer">
                  <td className="py-2.5 font-bold text-slate-900">2030</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">372</td>
                  <td className="py-2.5 text-right font-mono font-semibold text-slate-800">541</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">61%</td>
                  <td className="py-2.5 text-right font-mono font-bold text-emerald-600">↑ 3%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span onClick={() => setCurrentScreen('talent-pool')} className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1">
              View all batches →
            </span>
          </div>
        </div>

        {/* 8C. Emerging Talent (High Growth) (3 cols) */}
        <div className="col-span-3 bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Emerging Talent (High Growth)</h3>
              </div>
              <span onClick={() => filterTalentPool('High Growth')} className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">
                View all →
              </span>
            </div>

            {/* List of 5 students */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                    AS
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[11px]">Aarav Sharma</p>
                    <p className="text-[10px] text-slate-500">CSE 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-emerald-600 text-[11px]">+24%</span>
                  {/* Sparkline */}
                  <svg className="w-10 h-4 text-emerald-500 stroke-current fill-none stroke-2" viewBox="0 0 40 16">
                    <path d="M0,14 L8,10 L16,12 L24,6 L32,8 L40,2" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center">
                    RP
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[11px]">Riya Patel</p>
                    <p className="text-[10px] text-slate-500">AIML 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-emerald-600 text-[11px]">+21%</span>
                  <svg className="w-10 h-4 text-emerald-500 stroke-current fill-none stroke-2" viewBox="0 0 40 16">
                    <path d="M0,12 L8,14 L16,8 L24,9 L32,4 L40,1" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                    KV
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[11px]">Kabir Verma</p>
                    <p className="text-[10px] text-slate-500">IT 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-emerald-600 text-[11px]">+19%</span>
                  <svg className="w-10 h-4 text-emerald-500 stroke-current fill-none stroke-2" viewBox="0 0 40 16">
                    <path d="M0,15 L8,11 L16,13 L24,7 L32,5 L40,2" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center">
                    SK
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[11px]">Sara Khan</p>
                    <p className="text-[10px] text-slate-500">CSE 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-emerald-600 text-[11px]">+18%</span>
                  <svg className="w-10 h-4 text-emerald-500 stroke-current fill-none stroke-2" viewBox="0 0 40 16">
                    <path d="M0,14 L8,12 L16,10 L24,8 L32,6 L40,3" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold text-[10px] flex items-center justify-center">
                    AS
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[11px]">Aditya Singh</p>
                    <p className="text-[10px] text-slate-500">ECE 2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold text-emerald-600 text-[11px]">+17%</span>
                  <svg className="w-10 h-4 text-emerald-500 stroke-current fill-none stroke-2" viewBox="0 0 40 16">
                    <path d="M0,13 L8,11 L16,14 L24,9 L32,7 L40,4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic pt-1 border-t border-slate-100">
            Significant improvement in problem solving and development activity.
          </p>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="space-y-2.5 pt-1">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Quick Actions</h3>

        <div className="grid grid-cols-4 gap-3.5">
          {/* Card 1: Find Talent */}
          <div
            onClick={() => setCurrentScreen('talent-pool')}
            className="bg-blue-50/50 border border-blue-200/70 hover:border-blue-400 hover:shadow-sm rounded-xl p-3.5 cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-blue-900">Find Talent</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Search and discover students</p>
            </div>
          </div>

          {/* Card 2: Create Group */}
          <div
            onClick={() => setCurrentScreen('groups')}
            className="bg-emerald-50/50 border border-emerald-200/70 hover:border-emerald-400 hover:shadow-sm rounded-xl p-3.5 cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-emerald-900">Create Group</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Build a group of students</p>
            </div>
          </div>

          {/* Card 3: Create Opportunity */}
          <div
            onClick={() => setCurrentScreen('opportunities')}
            className="bg-purple-50/50 border border-purple-200/70 hover:border-purple-400 hover:shadow-sm rounded-xl p-3.5 cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-purple-900">Create Opportunity</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Match talent to opportunities</p>
            </div>
          </div>

          {/* Card 4: Start Intervention */}
          <div
            onClick={() => setCurrentScreen('interventions')}
            className="bg-amber-50/50 border border-amber-200/70 hover:border-amber-400 hover:shadow-sm rounded-xl p-3.5 cursor-pointer transition-all flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-amber-900">Start Intervention</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Address gaps and improve</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
