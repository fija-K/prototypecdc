import React from 'react';
import { useApp } from '../../context/AppContext';
import { Award, ArrowLeft, LogOut, Code, GitCommit, Target, CheckCircle2, TrendingUp } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user, logout, setCurrentScreen, students } = useApp();
  const student = students[0]; // Aarav Sharma demo data

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col select-none">
      {/* Student Header */}
      <header className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#008ca5] rounded-lg text-white font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-wide">GLBITM STUDENT PORTAL</h1>
            <p className="text-[11px] text-teal-400 font-medium">Technical Intelligence  Student Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-100">{user?.name || student?.name || 'Aarav Sharma'}</p>
            <p className="text-[10px] text-slate-400 font-medium">B.Tech CSE  Batch 2026</p>
          </div>

          <button
            onClick={() => setCurrentScreen('overview')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to CDC Portal</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Student Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-6">
        {/* Profile Score Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-[#008ca5] rounded-2xl text-white font-black text-2xl flex items-center justify-center shadow-lg">
              {student.techScore}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-wide">{student.name}</h2>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-[10px] font-bold uppercase">
                  High Potential
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">Roll No: {student.rollNo}  Section A</p>
              <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-teal-300">
                <span>Inst Rank: #{student.percentiles.inst} percentile</span>
                <span></span>
                <span>Dept Rank: Top {student.percentiles.dept}%</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setCurrentScreen('student-my-profile')}
              className="px-4 py-2.5 bg-[#008ca5] hover:bg-[#00798f] text-white font-bold text-xs rounded-lg transition-colors shadow-md"
            >
              View Full Technical Dossier
            </button>
          </div>
        </div>

        {/* Platform Verification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4 h-4 text-amber-500" /> LeetCode Sync
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Verified
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-black text-slate-900">342 Solved</span>
              <span className="text-xs font-semibold text-slate-500">Rating: 1840</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full w-[78%]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-purple-600" /> GitHub Activity
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Verified
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-black text-slate-900">412 Commits</span>
              <span className="text-xs font-semibold text-slate-500">30-Day Activity</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full w-[85%]" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-[#008ca5]" /> Opportunity Match
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Strong Fit
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-black text-slate-900">94% Amazon SDE</span>
              <span className="text-xs font-semibold text-[#008ca5]">Recommended</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-[#008ca5] h-full rounded-full w-[94%]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
