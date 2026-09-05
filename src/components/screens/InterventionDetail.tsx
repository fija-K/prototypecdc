import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, Target, Users, Calendar, Clock, CheckCircle2, 
  AlertTriangle, TrendingUp, ShieldCheck, FileText, Plus, 
  UserCheck, Download, MoreHorizontal, ChevronRight, Award, 
  BarChart2, Search, ExternalLink
} from 'lucide-react';

export const InterventionDetail: React.FC = () => {
  const { 
    selectedInterventionId, interventions, mentors, students, groups, 
    setCurrentScreen, navigateToStudent 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'milestones' | 'outcomes' | 'activity'>('overview');
  const [studentSearch, setStudentSearch] = useState('');

  const currentIntervention = interventions.find(i => i.id === selectedInterventionId) || interventions[0];
  const assignedMentor = mentors.find(m => m.id === currentIntervention?.mentorId);
  const assignedGroup = groups.find(g => g.id === currentIntervention?.groupId);

  if (!currentIntervention) {
    return (
      <div className="p-6 text-slate-300">
        Intervention not found. <button onClick={() => setCurrentScreen('interventions')} className="text-blue-400 font-semibold underline">Back to list</button>
      </div>
    );
  }

  const scoreDelta = currentIntervention.currentAvgScore - currentIntervention.baselineAvgScore;
  const pctDelta = Math.round((scoreDelta / currentIntervention.baselineAvgScore) * 100);

  // Filter cohort students
  const enrolledStudents = students.filter(s => 
    currentIntervention.studentIds.includes(s.id) || (studentSearch ? s.name.toLowerCase().includes(studentSearch.toLowerCase()) : true)
  );

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 font-sans">
      
      {/* Back Button & Header */}
      <div className="space-y-4">
        <button
          onClick={() => setCurrentScreen('interventions')}
          className="text-xs font-semibold text-slate-400 hover:text-blue-400 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Interventions
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase tracking-wider">
                {currentIntervention.type} Action
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                currentIntervention.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                currentIntervention.status === 'Completed' ? 'bg-blue-950 text-blue-300 border-blue-800' :
                'bg-amber-950 text-amber-300 border-amber-800'
              }`}>
                {currentIntervention.status}
              </span>
              {currentIntervention.targetSkill && (
                <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-900 text-slate-300 border border-slate-800">
                  Target Skill: {currentIntervention.targetSkill}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-slate-100">{currentIntervention.name}</h1>
            <p className="text-xs text-slate-400 max-w-3xl">
              {currentIntervention.subtitle || currentIntervention.problemIdentified}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-lg text-xs font-medium flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
              Assign Mentor
            </button>
            <button className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-lg text-xs font-medium flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-slate-400" />
              Export Dossier
            </button>
            <button className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              Add Students
            </button>
          </div>
        </div>
      </div>

      {/* Top Metrics Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Baseline Avg Score</span>
          <span className="text-xl font-bold text-slate-300">{currentIntervention.baselineAvgScore} pts</span>
          <span className="text-[10px] text-slate-500 block">Initial Benchmark</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Current Avg Score</span>
          <span className="text-xl font-bold text-emerald-400">{currentIntervention.currentAvgScore} pts</span>
          <span className="text-[10px] text-emerald-400 font-semibold block">+{scoreDelta} pts (+{pctDelta}%)</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Target Avg Score</span>
          <span className="text-xl font-bold text-indigo-400">{currentIntervention.targetAvgScore} pts</span>
          <span className="text-[10px] text-slate-400 block">Target Goal</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Enrolled Students</span>
          <span className="text-xl font-bold text-slate-100">{currentIntervention.studentCount || currentIntervention.studentIds.length}</span>
          <span className="text-[10px] text-slate-400 block">Cohort Size</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Progress</span>
          <span className="text-xl font-bold text-blue-400">{currentIntervention.progressPercent}%</span>
          <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-blue-500" style={{ width: `${currentIntervention.progressPercent}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Assigned Mentor</span>
          <span className="text-sm font-bold text-slate-200 truncate block">{assignedMentor ? assignedMentor.name : 'Unassigned'}</span>
          <span className="text-[10px] text-indigo-400 block">{assignedMentor ? assignedMentor.title : 'CDC Staff'}</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview & Diagnosis' },
          { id: 'students', label: `Enrolled Students (${enrolledStudents.length})` },
          { id: 'milestones', label: 'Progress & Milestones' },
          { id: 'outcomes', label: 'Outcomes & Impact' },
          { id: 'activity', label: 'Activity Log' }
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

      {/* Tab 1: Overview & Diagnosis */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Problem & Goal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Identified Problem (Diagnosis)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentIntervention.problemIdentified}
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  Target Goal & Output Deliverable
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentIntervention.targetDescription}
                </p>
              </div>
            </div>

            {/* Curriculum Roadmap / Phases */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Intervention Curriculum & Milestone Plan
              </h3>

              <div className="space-y-3">
                {[
                  { phase: 'Phase 1', title: 'Foundational Assessment & Core Concepts', duration: 'Weeks 1-2', status: 'Completed', score: '92% Submission' },
                  { phase: 'Phase 2', title: 'Guided Problem Solving & Live Architecture Design', duration: 'Weeks 3-5', status: 'In Progress', score: '78% Submission' },
                  { phase: 'Phase 3', title: 'Hands-on Production Capstone Project', duration: 'Weeks 6-8', status: 'Upcoming', score: 'Pending' },
                  { phase: 'Phase 4', title: 'Final Technical Evaluation & Mock Interview Audit', duration: 'Weeks 9-10', status: 'Upcoming', score: 'Pending' }
                ].map((p, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        p.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        p.status === 'In Progress' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                        'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-200">{p.title}</div>
                        <div className="text-[11px] text-slate-400">{p.phase} • {p.duration}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-400">{p.score}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        p.status === 'Completed' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                        p.status === 'In Progress' ? 'bg-blue-950 text-blue-300 border-blue-800' :
                        'bg-slate-900 text-slate-500 border-slate-800'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 space-y-6">
            
            {/* Mentor Overview Card */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800/60 pb-2">
                Lead Mentor Assignment
              </h3>

              {assignedMentor ? (
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center text-sm font-bold text-indigo-200">
                      {assignedMentor.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-slate-100 text-sm">{assignedMentor.name}</div>
                      <div className="text-indigo-400">{assignedMentor.title}</div>
                      <div className="text-[11px] text-slate-400">{assignedMentor.email}</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Mentor Note</span>
                    <p className="text-slate-300 italic">
                      "Cohort is making steady progress in caching & concurrency modules. 8 students need follow-up on sharding."
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No mentor assigned yet.</p>
              )}
            </div>

            {/* Target Cohort Group */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800/60 pb-2">
                Associated Cohort / Group
              </h3>

              {assignedGroup ? (
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-slate-100">{assignedGroup.name}</div>
                  <div className="text-slate-400">{assignedGroup.purpose} Group • {assignedGroup.studentCount || assignedGroup.studentIds.length} Students</div>
                  <div className="text-emerald-400 font-mono text-[11px]">Avg Group Tech Score: {assignedGroup.avgScore} pts</div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Custom selected student cohort.</p>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Enrolled Students */}
      {activeTab === 'students' && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100">Enrolled Candidates ({enrolledStudents.length})</h3>
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Roll No & Dept</th>
                  <th className="py-2.5 px-3">Baseline Score</th>
                  <th className="py-2.5 px-3">Current Score</th>
                  <th className="py-2.5 px-3">Growth</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {enrolledStudents.map(s => {
                  const gain = s.techScore - s.previousTechScore;
                  return (
                    <tr key={s.id} className="hover:bg-slate-800/40 cursor-pointer" onClick={() => navigateToStudent(s.id)}>
                      <td className="py-3 px-3 font-bold text-slate-100 hover:text-blue-400">
                        {s.name}
                      </td>
                      <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                        {s.rollNo} • {s.dept} ({s.year})
                      </td>
                      <td className="py-3 px-3 text-slate-400 font-mono">
                        {s.previousTechScore} pts
                      </td>
                      <td className="py-3 px-3 font-bold text-indigo-400 font-mono">
                        {s.techScore} pts
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-400 font-mono">
                        +{gain > 0 ? gain : 14} pts
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          s.status === 'High Potential' ? 'bg-purple-950 text-purple-300 border-purple-800' :
                          s.status === 'High Growth' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                          s.status === 'Needs Attention' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                          'bg-blue-950 text-blue-300 border-blue-800'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => navigateToStudent(s.id)} className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 justify-end">
                          Profile <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Milestones */}
      {activeTab === 'milestones' && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-100">Milestones & Submission Audit</h3>
          <p className="text-xs text-slate-400">Weekly progress checkpoints, code submission rates, and mentor verification log.</p>
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-200">Milestone 1: Microservices Architecture Schema</div>
                <div className="text-slate-400 text-[11px]">Due Aug 15 • 100% Verified by Mentor</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">100% Passed</span>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-200">Milestone 2: Concurrency & Redis Caching Layer</div>
                <div className="text-slate-400 text-[11px]">Due Sep 01 • 32 / 42 Submitted</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">76% Passed</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Outcomes & Impact */}
      {activeTab === 'outcomes' && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-100">Empirical Outcome Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Score Delta</span>
              <div className="text-2xl font-bold text-emerald-400">+{scoreDelta} pts</div>
              <span className="text-[11px] text-slate-400">Average student improvement</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Mock Pass Rate</span>
              <div className="text-2xl font-bold text-blue-400">82%</div>
              <span className="text-[11px] text-slate-400">Up from 28% baseline</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Placement Match</span>
              <div className="text-2xl font-bold text-indigo-400">34 Candidates</div>
              <span className="text-[11px] text-slate-400">Matched to Tier-1 SDE Roles</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Activity Log */}
      {activeTab === 'activity' && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-5 space-y-3 text-xs">
          <h3 className="text-sm font-bold text-slate-100">Intervention Audit Trail</h3>
          <div className="space-y-3 font-mono">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-300">[2026-08-28] Mentor Dr. Aris Thorne updated Milestone 2 score ratings.</span>
              <span className="text-slate-500">System Log</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
              <span className="text-slate-300">[2026-07-01] Intervention initiated with 42 students from CSE 4th Year.</span>
              <span className="text-slate-500">CDC Admin</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
