import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { SkillBadge } from '../common/SkillBadge';
import { StatCard } from '../common/StatCard';
import { CreateInterventionModal, AssignMentorModal } from '../layout/ActionModals';
import { 
  Cpu, Users, TrendingUp, AlertTriangle, Sparkles, CheckCircle2, 
  BarChart3, LifeBuoy, UserPlus, Target, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid 
} from 'recharts';

export const GroupIntelligence: React.FC = () => {
  const { 
    groups, selectedGroupId, students, mentors, 
    navigateToStudent, setCurrentScreen 
  } = useApp();

  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);

  const group = groups.find(g => g.id === selectedGroupId) || groups[0];
  const groupStudents = students.filter(s => group.studentIds.includes(s.id));
  const primaryMentor = mentors.find(m => m.id === group.primaryMentorId);

  const benchmarkData = [
    { name: 'Group Avg', score: group.avgScore },
    { name: 'Dept Avg', score: 762 },
    { name: 'Batch Avg', score: 738 },
    { name: 'Inst Avg', score: 715 },
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase">
              {group.purpose} Group
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300">
              {group.type} Cohort
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-2 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            Group Intelligence: {group.name}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Owner: <span className="text-slate-200 font-semibold">{group.owner}</span> • Primary Mentor: <span className="text-indigo-300 font-semibold">{primaryMentor ? primaryMentor.name : 'Unassigned'}</span>
          </p>
        </div>

        {/* Quick Group Action Hub */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setIsInterventionModalOpen(true)}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold shadow-md shadow-indigo-950 flex items-center gap-1.5"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            Create Group Intervention
          </button>
          <button
            onClick={() => setIsMentorModalOpen(true)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
            Assign Mentor
          </button>
        </div>
      </div>

      {/* Purpose-Aware Context Banner */}
      <div className="p-3.5 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs flex items-center justify-between text-indigo-200">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            {group.purpose === 'Placement' && 'Placement Focus Mode: Emphasizing technical drive readiness, candidate score thresholds & opportunity match %.'}
            {group.purpose === 'Training' && 'Training Focus Mode: Emphasizing skill mastery, project quality, and intervention target progress.'}
            {group.purpose === 'Talent Discovery' && 'Talent Focus Mode: Emphasizing growth rate acceleration, recent signals, and emerging high potential candidates.'}
            {group.purpose === 'Intervention' && 'Intervention Focus Mode: Emphasizing risk recovery, activity consistency, and mentor follow-up.'}
          </span>
        </div>
      </div>

      {/* Group Health Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard title="Group Members" value={groupStudents.length} subtext="Enrolled Candidates" icon={<Users className="w-4 h-4 text-indigo-400" />} />
        <StatCard title="Avg Tech Score" value={group.avgScore} change={`+${group.growthRate}%`} changeType="positive" subtext="Group Mean" icon={<TrendingUp className="w-4 h-4 text-emerald-400" />} />
        <StatCard title="Active %" value={`${group.activePercent}%`} subtext="30d Platform Active" icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} />
        <StatCard title="Technical Readiness" value="92%" subtext="Ready for Placement Drives" icon={<ShieldCheck className="w-4 h-4 text-blue-400" />} />
        <StatCard title="Needs Attention" value={group.attentionCount} subtext="Risk Candidates" icon={<AlertTriangle className="w-4 h-4 text-rose-400" />} />
      </div>

      {/* Group Intelligence Summary & Gap Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Landscape & Gap Diagnosis */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              Group Skill Landscape & Identified Institutional Gaps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Group Strengths */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2">
              <h4 className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Group Technical Strengths
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">+</span>
                  <span><strong>Strong DSA Foundation:</strong> 85% of members have solved &gt; 400 LeetCode problems</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold">+</span>
                  <span><strong>Active GitHub Presence:</strong> Continuous 30-day commit streaks across 92% of group</span>
                </li>
              </ul>
            </div>

            {/* Group Skill Gaps */}
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2">
              <h4 className="font-semibold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Identified Skill Gaps (Intervention Suggested)
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">⚠</span>
                  <span><strong>Limited System Design Evidence:</strong> Only 28% of members have distributed systems projects</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">⚠</span>
                  <span><strong>Cloud & DevOps Gap:</strong> Low evidence of Docker/Kubernetes container deployments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benchmark Comparison Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Cohort Benchmark Comparison
          </h3>
          <p className="text-xs text-slate-400">Group average tech score vs batch & institution</p>

          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} domain={[500, 950]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Group Members List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          Enrolled Group Candidates ({groupStudents.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {groupStudents.map(student => (
            <div
              key={student.id}
              onClick={() => navigateToStudent(student.id)}
              className="p-3 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-200 text-xs">{student.name}</p>
                  <StatusBadge status={student.status} size="sm" />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{student.rollNo} • {student.dept} • {student.year}</p>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold font-mono text-indigo-400">{student.techScore}</span>
                <span className="text-[10px] text-slate-500 block font-mono">+{student.growthPercent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Modals */}
      <CreateInterventionModal isOpen={isInterventionModalOpen} onClose={() => setIsInterventionModalOpen(false)} />
      {isMentorModalOpen && (
        <AssignMentorModal isOpen={isMentorModalOpen} onClose={() => setIsMentorModalOpen(false)} groupId={group.id} />
      )}
    </div>
  );
};
