import os

mentor_content = """import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, CheckCircle2, Clock, ArrowLeft, LogOut, Award, FileText } from 'lucide-react';

export const MentorDashboard: React.FC = () => {
  const { user, logout, setCurrentScreen, students } = useApp();

  const assignedCount = 28;
  const pendingReviews = 4;
  const activeInterventions = 2;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col select-none">
      {/* Mentor Top Navigation */}
      <header className="bg-slate-900 text-white px-8 py-4 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#008ca5] rounded-lg text-white font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-wide">GLBITM MENTOR PORTAL</h1>
            <p className="text-[11px] text-teal-400 font-medium">Technical Intelligence • Faculty Workspace</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-100">{user?.name || 'Dr. Rajesh Sharma'}</p>
            <p className="text-[10px] text-slate-400 font-medium">Associate Professor (CSE)</p>
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

      {/* Main Mentor Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-6">
        {/* Welcome Banner */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Welcome back, Dr. Sharma</h2>
            <p className="text-xs text-slate-500 mt-1">
              You are assigned <span className="font-semibold text-slate-800">28 SDE & AI/ML Candidates</span> in the CSE Department. 4 reviews pending action today.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Workload: Optimal (93%)
            </span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Students</p>
              <h3 className="text-2xl font-black text-slate-900">{assignedCount}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Reviews</p>
              <h3 className="text-2xl font-black text-slate-900">{pendingReviews}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Interventions</p>
              <h3 className="text-2xl font-black text-slate-900">{activeInterventions}</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Target Achieved</p>
              <h3 className="text-2xl font-black text-slate-900">82%</h3>
            </div>
          </div>
        </div>

        {/* Assigned Mentees Table Preview */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Assigned Mentees & Progress</h3>
            <span className="text-xs text-[#008ca5] font-semibold cursor-pointer hover:underline">View All Mentees</span>
          </div>
          <div className="divide-y divide-slate-100">
            {students.slice(0, 5).map((student) => (
              <div key={student.id} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-900 text-white font-bold text-xs rounded-full flex items-center justify-center">
                    {student.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{student.name}</h4>
                    <p className="text-[11px] text-slate-500">{student.rollNo} • {student.dept} ({student.batch})</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900">{student.techScore} / 1000</span>
                    <p className="text-[10px] text-emerald-600 font-semibold">{student.growthPercent > 0 ? `+${student.growthPercent}% growth` : 'Stable'}</p>
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {student.status}
                  </span>
                  <button 
                    onClick={() => {
                      setCurrentScreen('student-profile');
                    }}
                    className="px-3 py-1 text-xs font-semibold text-[#008ca5] bg-teal-50 hover:bg-teal-100 rounded transition-colors"
                  >
                    View Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
"""

with open('src/components/screens/MentorDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(mentor_content)

print("MentorDashboard written cleanly!")
