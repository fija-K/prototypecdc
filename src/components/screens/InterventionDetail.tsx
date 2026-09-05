import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, Target, Users, Calendar, Clock, CheckCircle2, 
  AlertTriangle, TrendingUp, ShieldCheck, FileText, Plus, 
  UserCheck, Download, MoreHorizontal, ChevronRight, Award, 
  BarChart2, Search, ExternalLink, Sparkles, Check, Play, Edit
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
      <div className="p-6 text-slate-600 bg-[#F8FAFC]">
        Intervention not found. <button onClick={() => setCurrentScreen('interventions')} className="text-blue-600 font-semibold underline">Back to list</button>
      </div>
    );
  }

  const scoreDelta = currentIntervention.currentAvgScore - currentIntervention.baselineAvgScore;
  const targetGap = currentIntervention.targetAvgScore - currentIntervention.currentAvgScore;

  // Enrolled students list
  const enrolledStudents = students.filter(s => 
    currentIntervention.studentIds.includes(s.id) || 
    (studentSearch ? s.name.toLowerCase().includes(studentSearch.toLowerCase()) : true)
  );

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)] bg-[#F8FAFC] text-slate-800 font-sans">
      
      {/* Back Button & Header */}
      <div className="space-y-4">
        <button
          onClick={() => setCurrentScreen('interventions')}
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Interventions
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                {currentIntervention.type} Action
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${
                currentIntervention.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' :
                currentIntervention.status === 'Completed' ? 'bg-purple-50 text-purple-700 border-purple-300' :
                currentIntervention.status === 'Needs Attention' ? 'bg-rose-50 text-rose-700 border-rose-300' :
                'bg-amber-50 text-amber-700 border-amber-300'
              }`}>
                {currentIntervention.status}
              </span>
              <span className="text-xs font-semibold text-slate-500">ID: {currentIntervention.id}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{currentIntervention.name}</h1>
            <p className="text-xs text-slate-600 flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-semibold text-slate-700">Problem Focus:</span> {currentIntervention.problemIdentified}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-2xs flex items-center gap-1.5">
              <Edit className="w-3.5 h-3.5 text-slate-500" />
              Edit Program
            </button>
            <button className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-2xs flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export Report
            </button>
            <button className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Log Activity
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Progress Metric */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Program Progress</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">{currentIntervention.progressPercent}%</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">On Track</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${currentIntervention.progressPercent}%` }} />
          </div>
        </div>

        {/* Score Improvement */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Current vs Baseline</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">{currentIntervention.currentAvgScore} pts</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              +{scoreDelta} pts ({currentIntervention.baselineAvgScore} initial)
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            Target Score: <span className="font-bold text-slate-800">{currentIntervention.targetAvgScore} pts</span> ({targetGap > 0 ? `${targetGap} pts remaining` : 'Target Met!'})
          </div>
        </div>

        {/* Enrolled Students & Group */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Enrolled Cohort</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">{currentIntervention.studentCount || enrolledStudents.length || 18}</span>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
              {assignedGroup ? assignedGroup.name : 'Target Group'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500">
            Active tracking since {currentIntervention.startDate}
          </div>
        </div>

        {/* Lead Mentor */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Faculty Mentor Lead</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-center gap-2.5 pt-1">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
              {assignedMentor ? assignedMentor.name.charAt(0) : 'M'}
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs">{assignedMentor ? assignedMentor.name : 'Dr. S. Kumar'}</div>
              <div className="text-[10px] text-slate-500">{assignedMentor ? assignedMentor.dept : 'CSE'} Department</div>
            </div>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-medium">
        {[
          { id: 'overview', label: 'Program Overview' },
          { id: 'students', label: `Enrolled Cohort (${enrolledStudents.length || 18})` },
          { id: 'milestones', label: 'Milestones & Schedule' },
          { id: 'outcomes', label: 'Outcomes & Metrics' },
          { id: 'activity', label: 'Activity Log' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-3 transition-colors whitespace-nowrap font-semibold ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Description Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Program Rationale & Objectives</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentIntervention.targetDescription || 'This intervention program targets specific skill deficits identified during recent institutional evaluations. Designed to boost candidate eligibility and performance ahead of placement drives.'}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Start Date:</span>
                  <span className="ml-2 font-semibold text-slate-800">{currentIntervention.startDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Target Deadline:</span>
                  <span className="ml-2 font-semibold text-slate-800">{currentIntervention.deadline}</span>
                </div>
              </div>
            </div>

            {/* Key Focus Areas */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Curriculum & Technical Modules</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { title: 'System Architecture & Scalability', status: 'Completed', date: 'Week 1 - 2' },
                  { title: 'Database Optimization & SQL Tuning', status: 'In Progress', date: 'Week 3 - 4' },
                  { title: 'Concurrent Programming & Threads', status: 'Upcoming', date: 'Week 5' },
                  { title: 'Mock Technical Interview Simulations', status: 'Upcoming', date: 'Week 6' }
                ].map((mod, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{mod.title}</span>
                      <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded ${
                        mod.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        mod.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {mod.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500">{mod.date}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Side Info Panel */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Assigned Group</h3>
              <div className="text-xs space-y-2">
                <div className="font-bold text-blue-600">{assignedGroup ? assignedGroup.name : 'CSE Final Year Placement Remediation'}</div>
                <div className="text-slate-600 text-[11px]">{assignedGroup ? assignedGroup.subtitle : 'System static segment'}</div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-500 text-[11px]">
                  <span>Group Avg Score:</span>
                  <span className="font-bold text-slate-900">{assignedGroup ? assignedGroup.avgScore : 680} pts</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Faculty Lead Contacts</h3>
              <div className="text-xs space-y-2">
                <div className="font-bold text-slate-900">{assignedMentor ? assignedMentor.name : 'Dr. S. Kumar'}</div>
                <div className="text-slate-500 text-[11px]">{assignedMentor ? assignedMentor.email : 'skumar@glbitm.ac.in'}</div>
                <div className="text-slate-500 text-[11px]">{assignedMentor ? assignedMentor.phone : '+91 98765 43210'}</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Students */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-4">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                placeholder="Search student in cohort..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs flex items-center gap-1.5 shrink-0">
              <Plus className="w-3.5 h-3.5" /> Enroll More Students
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-3">Roll No</th>
                  <th className="py-3 px-3">Dept</th>
                  <th className="py-3 px-3 text-right">Baseline Score</th>
                  <th className="py-3 px-3 text-right">Current Score</th>
                  <th className="py-3 px-3 text-right">Delta</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {enrolledStudents.map(st => {
                  const delta = st.techScore - st.previousTechScore;
                  return (
                    <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{st.name}</div>
                        <div className="text-[10px] text-slate-500">{st.email}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-medium">{st.rollNo}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {st.dept}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-medium text-slate-600">{st.previousTechScore}</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-900">{st.techScore}</td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-600">+{delta} pts</td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Active Progress
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button 
                          onClick={() => navigateToStudent(st.id)}
                          className="px-2.5 py-1 text-[10px] font-semibold text-blue-600 bg-blue-50 rounded hover:bg-blue-100"
                        >
                          View Profile
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
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Program Milestones Checklist</h3>
          <div className="space-y-3">
            {[
              { title: 'Baseline Diagnostic Assessment', date: 'Mar 15, 2026', done: true },
              { title: 'Core Algorithms Workshop', date: 'Apr 02, 2026', done: true },
              { title: 'Mid-Intervention Evaluation Drive', date: 'May 20, 2026', done: true },
              { title: 'System Design Mock Interviews', date: 'Jun 10, 2026', done: false },
              { title: 'Final Placement Benchmark Test', date: 'Jul 28, 2026', done: false }
            ].map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    m.done ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold ${m.done ? 'text-slate-900' : 'text-slate-600'}`}>{m.title}</div>
                    <div className="text-[10px] text-slate-400">{m.date}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  m.done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {m.done ? 'Completed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Outcomes */}
      {activeTab === 'outcomes' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Verified Impact & Skill Deltas</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-2xl font-bold text-emerald-700">+{scoreDelta} pts</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Avg Score Growth</div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">89%</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Students Reached Threshold</div>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">4.8 / 5</div>
              <div className="text-xs text-slate-600 font-medium mt-1">Mentor Feedback Score</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Activity */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Recent Timeline Logs</h3>
          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">Mid-term score update synced:</span> Average cohort score increased by +28 points.
                <div className="text-[10px] text-slate-400">2 days ago by CDC Automated Assessment Engine</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">Mentor Review Completed:</span> Dr. S. Kumar conducted System Architecture Review #2.
                <div className="text-[10px] text-slate-400">5 days ago by Dr. S. Kumar</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
