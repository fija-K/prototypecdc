import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TALENT_STUDENTS_MOCK, TalentStudent } from '../../data/mockData';
import { ReassignStudentsModal } from '../common/ReassignStudentsModal';
import { AssignMentorModal, CreateInterventionModal } from '../layout/ActionModals';
import { 
  ChevronRight, ChevronDown, ChevronUp, Plus, Users, UserCheck, 
  UserPlus, Calendar, Clock, AlertTriangle, CheckCircle2, Search, 
  Filter, MoreVertical, Edit, ShieldCheck, PieChart as PieIcon, 
  MessageSquare, Star, ArrowUpRight, Check, Eye, Layers, Settings, Info
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MentorItem {
  id: string;
  name: string;
  title: string;
  dept: string;
  avatar: string;
  isPrimary: boolean;
  assignedCount: number;
  color: string;
  students: {
    id: string;
    name: string;
    avatar: string;
    dept: string;
    year: string;
    score: number;
    growth: number;
    status: 'High Potential' | 'High Growth' | 'Strong' | 'Developing' | 'Needs Attention';
    lastActive: string;
  }[];
}

const INITIAL_GROUP_MENTORS: MentorItem[] = [
  {
    id: 'gm1',
    name: 'Dr. Rahul Mehta',
    title: 'Associate Professor, CSE',
    dept: 'CSE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isPrimary: true,
    assignedCount: 22,
    color: '#8B5CF6',
    students: [
      { id: 's101', name: 'Aarav Sharma', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', dept: 'CSE', year: '3rd Year', score: 892, growth: 18, status: 'High Potential', lastActive: '2 days ago' },
      { id: 's102', name: 'Neha Reddy', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', dept: 'CSE', year: '3rd Year', score: 846, growth: 21, status: 'High Growth', lastActive: '1 day ago' },
      { id: 's103', name: 'Rohan Mehta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', dept: 'CSE', year: '3rd Year', score: 812, growth: 12, status: 'Strong', lastActive: '3 days ago' },
      { id: 's104', name: 'Ishita Verma', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', dept: 'CSE', year: '3rd Year', score: 768, growth: 9, status: 'Developing', lastActive: '5 days ago' },
      { id: 's105', name: 'Karan Singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', dept: 'CSE', year: '3rd Year', score: 732, growth: 14, status: 'Strong', lastActive: '2 days ago' },
    ]
  },
  {
    id: 'gm2',
    name: 'Prof. Neha Sharma',
    title: 'Assistant Professor, CSE',
    dept: 'CSE',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    isPrimary: false,
    assignedCount: 21,
    color: '#2563EB',
    students: [
      { id: 's106', name: 'Riya Patel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', dept: 'CSE', year: '3rd Year', score: 854, growth: 15, status: 'High Growth', lastActive: '12 hrs ago' },
      { id: 's107', name: 'Kabir Verma', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', dept: 'CSE', year: '3rd Year', score: 792, growth: 11, status: 'Strong', lastActive: '1 day ago' },
    ]
  },
  {
    id: 'gm3',
    name: 'Prof. Arjun Rao',
    title: 'Assistant Professor, IT',
    dept: 'IT',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    isPrimary: false,
    assignedCount: 20,
    color: '#10B981',
    students: [
      { id: 's108', name: 'Sara Khan', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', dept: 'CSE', year: '3rd Year', score: 748, growth: 10, status: 'Developing', lastActive: '3 days ago' },
      { id: 's109', name: 'Aditya Singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', dept: 'ECE', year: '3rd Year', score: 710, growth: 8, status: 'Strong', lastActive: '4 days ago' },
    ]
  }
];

export const GroupMentorManagement: React.FC = () => {
  const { setCurrentScreen, navigateToStudent, mentors } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'mentors' | 'intelligence' | 'interventions' | 'activity'>('mentors');
  const [groupMentors, setGroupMentors] = useState<MentorItem[]>(INITIAL_GROUP_MENTORS);
  const [expandedMentorId, setExpandedMentorId] = useState<string>('gm1');
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [selectedMentorForAssign, setSelectedMentorForAssign] = useState<string>('');

  // Modals & Context Menus
  const [activeMentorMenuId, setActiveMentorMenuId] = useState<string | null>(null);
  const [reassignSourceMentorId, setReassignSourceMentorId] = useState<string | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);

  // Calculated Stats
  const totalStudents = groupMentors.reduce((acc, m) => acc + m.assignedCount, 0); // 63
  const activeMentorsCount = groupMentors.length; // 3
  const avgStudentsPerMentor = Math.round(totalStudents / activeMentorsCount); // 21
  const unassignedCount = 0;

  // Donut chart data
  const donutData = groupMentors.map(m => ({
    name: m.name,
    value: m.assignedCount,
    percent: Math.round((m.assignedCount / totalStudents) * 100),
    color: m.color
  }));

  // Reassignment Handler
  const handleReassignStudents = (sourceId: string, targetId: string, count: number) => {
    setGroupMentors(prev => prev.map(m => {
      if (m.id === sourceId) return { ...m, assignedCount: Math.max(0, m.assignedCount - count) };
      if (m.id === targetId) return { ...m, assignedCount: m.assignedCount + count };
      return m;
    }));
  };

  // Add Mentor Handler
  const handleAssignMentor = () => {
    if (!selectedMentorForAssign) return;
    const mentorToAdd = mentors.find(m => m.id === selectedMentorForAssign);
    if (!mentorToAdd) return;

    if (groupMentors.some(m => m.id === mentorToAdd.id)) return;

    const newMentorItem: MentorItem = {
      id: mentorToAdd.id,
      name: mentorToAdd.name,
      title: mentorToAdd.title,
      dept: mentorToAdd.dept,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isPrimary: false,
      assignedCount: 0,
      color: '#F59E0B',
      students: []
    };

    setGroupMentors(prev => [...prev, newMentorItem]);
    setSelectedMentorForAssign('');
  };

  // Set Primary Mentor
  const handleSetPrimary = (mentorId: string) => {
    setGroupMentors(prev => prev.map(m => ({
      ...m,
      isPrimary: m.id === mentorId
    })));
    setActiveMentorMenuId(null);
  };

  return (
    <div className="p-6 space-y-4 bg-[#F8FAFC] min-h-screen font-sans text-slate-800 select-none pb-20">
      {/* Top Header & Breadcrumb */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span onClick={() => setCurrentScreen('groups')} className="text-slate-500 hover:text-blue-600 cursor-pointer">
            Groups
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Microsoft SDE Candidates</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Microsoft SDE Candidates</h1>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-2.5 py-0.5 rounded text-xs">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Placement Group <span className="text-slate-300">•</span> 63 Students <span className="text-slate-300">•</span> CSE <span className="text-slate-300">•</span> 3rd Year (2027)
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Created on Aug 20, 2024 <span className="text-slate-300">•</span> Owner: CTC <span className="text-slate-300">•</span> Last updated: 2 hours ago
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
              <Edit className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Group</span>
            </button>

            <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
              <UserPlus className="w-3.5 h-3.5 text-slate-500" />
              <span>Add Students</span>
            </button>

            <button onClick={() => setIsAssignModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
              <UserCheck className="w-3.5 h-3.5 text-white" />
              <span>Assign Mentors</span>
            </button>

            <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-2.5 py-1.5 rounded-lg shadow-xs">
              <MoreVertical className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Group Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-xs font-semibold select-none pt-1">
        <button onClick={() => setActiveTab('overview')} className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'overview' ? 'text-blue-600 border-blue-600' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}>
          Overview
        </button>
        <button onClick={() => setActiveTab('students')} className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'students' ? 'text-blue-600 border-blue-600' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}>
          Students (63)
        </button>
        <button onClick={() => setActiveTab('mentors')} className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'mentors' ? 'text-blue-600 border-blue-600' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}>
          Mentors (3)
        </button>
        <button onClick={() => setCurrentScreen('group-intelligence')} className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'intelligence' ? 'text-blue-600 border-blue-600' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}>
          Intelligence
        </button>
        <button onClick={() => setCurrentScreen('interventions')} className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'interventions' ? 'text-blue-600 border-blue-600' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}>
          Interventions
        </button>
        <button onClick={() => setActiveTab('activity')} className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'activity' ? 'text-blue-600 border-blue-600' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}>
          Activity Log
        </button>
      </div>

      {/* Top 5 KPI Cards Strip */}
      <div className="grid grid-cols-5 gap-3.5 font-sans">
        {/* Card 1: Total Students */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Total Students</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">{totalStudents}</span>
            <span className="text-[10px] text-slate-400 block font-medium">In this group</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Users className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 2: Mentors Assigned */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Mentors Assigned</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">{activeMentorsCount}</span>
            <span className="text-[10px] text-slate-400 block font-medium">Active mentors</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 3: Students per Mentor */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Students per Mentor</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">{avgStudentsPerMentor}</span>
            <span className="text-[10px] text-slate-400 block font-medium">Average</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UserPlus className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 4: Needs Attention */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Needs Attention</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">4</span>
            <span className="text-[10px] text-slate-400 block font-medium">Students</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 5: Next Review */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Next Review</span>
            <span className="text-base font-bold text-slate-900 block font-sans">Sep 12, 2024</span>
            <span className="text-[10px] text-slate-400 block font-medium">In 8 days</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Calendar className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>

      {/* Middle Row: Mentor Assignment, Workload Distribution, Unassigned Students */}
      <div className="grid grid-cols-12 gap-4">
        {/* Panel 1: Mentor Assignment (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Mentor Assignment</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Assign mentors to manage and guide students in this group.</p>
            </div>

            {/* Select & Assign Dropdown */}
            <div className="flex items-center gap-2 pt-3">
              <select
                value={selectedMentorForAssign}
                onChange={e => setSelectedMentorForAssign(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Mentor</option>
                {mentors.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.dept})</option>
                ))}
              </select>
              <button
                onClick={handleAssignMentor}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs shadow-xs"
              >
                Assign
              </button>
            </div>

            {/* List of Assigned Mentors */}
            <div className="space-y-2 pt-3">
              {groupMentors.map(mentor => (
                <div key={mentor.id} className="p-2.5 bg-slate-50/80 border border-slate-100 rounded-xl flex items-center justify-between text-xs relative">
                  <div className="flex items-center gap-2.5">
                    <img src={mentor.avatar} alt={mentor.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs">{mentor.name}</span>
                        {mentor.isPrimary && (
                          <span className="bg-purple-100 text-purple-700 font-semibold px-1.5 py-0.2 rounded text-[9px]">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500">{mentor.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right font-mono">
                      <span className="font-bold text-slate-800 text-xs block">{mentor.assignedCount} Students</span>
                      <span className="text-[10px] text-slate-400 block">{Math.round((mentor.assignedCount / totalStudents) * 100)}% of group</span>
                    </div>

                    {/* Three dots menu */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveMentorMenuId(activeMentorMenuId === mentor.id ? null : mentor.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/60"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMentorMenuId === mentor.id && (
                        <div className="origin-top-right absolute right-0 mt-1 w-44 rounded-xl bg-white border border-slate-200 shadow-xl z-30 p-1 text-xs font-sans space-y-0.5">
                          <button onClick={() => { setActiveMentorMenuId(null); setExpandedMentorId(mentor.id); }} className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-50 text-slate-700 font-medium">View Assigned Students</button>
                          <button onClick={() => handleSetPrimary(mentor.id)} className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-50 text-slate-700 font-medium">Change Primary Mentor</button>
                          <button onClick={() => { setActiveMentorMenuId(null); setReassignSourceMentorId(mentor.id); }} className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-50 text-slate-700 font-medium">Reassign Students</button>
                          <button onClick={() => { setActiveMentorMenuId(null); setGroupMentors(prev => prev.filter(m => m.id !== mentor.id)); }} className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-50 text-rose-600 font-medium border-t border-slate-100">Remove from Group</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span onClick={() => setIsAssignModalOpen(true)} className="text-blue-600 text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1">
              + Add Another Mentor
            </span>
          </div>
        </div>

        {/* Panel 2: Workload Distribution (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Workload Distribution</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Student distribution across mentors in this group.</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 items-center">
              {/* Donut Chart */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <PieChart width={112} height={112}>
                  <Pie data={donutData} dataKey="value" innerRadius={34} outerRadius={50} stroke="none">
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute text-center font-mono">
                  <span className="text-base font-bold text-slate-900 block leading-tight">{totalStudents}</span>
                  <span className="text-[9px] text-slate-400 font-sans">Students</span>
                </div>
              </div>

              {/* Legend */}
              <div className="space-y-1.5 text-[11px]">
                {donutData.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                      <span className="truncate">{item.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block font-mono pl-3.5">
                      {item.value} students ({item.percent}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Health Indicator */}
          <div className="p-2 bg-emerald-50/60 border border-emerald-100 rounded-lg text-xs space-y-0.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Workload is well balanced</span>
            </div>
            <p className="text-[10px] text-slate-500 pl-5">
              Ideal range: 15 - 30 students per mentor <Info className="w-3 h-3 text-slate-400 inline ml-0.5" />
            </p>
          </div>
        </div>

        {/* Panel 3: Unassigned Students (4 cols) */}
        <div className="col-span-4 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Unassigned Students</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Students in this group without a mentor.</p>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer">View all ({unassignedCount})</span>
            </div>

            {/* Empty State / Check Illustration */}
            <div className="py-6 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <p className="font-bold text-slate-900 text-xs">All students are assigned!</p>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                Great job! Every student in this group has been assigned to a mentor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Row: Students by Mentor (8 cols) & Mentor Activity / Settings (4 cols) */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column: Students by Mentor (8 cols) */}
        <div className="col-span-8 bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Students by Mentor</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">View and manage students assigned to each mentor.</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-48">
                <input
                  type="text"
                  placeholder="Search student..."
                  value={studentSearch}
                  onChange={e => setStudentSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
              <button className="p-1 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Expandable Accordions for Each Mentor */}
          <div className="space-y-3 pt-1">
            {groupMentors.map(mentor => {
              const isExpanded = expandedMentorId === mentor.id;

              // Filter students inside accordion
              const filteredStudents = mentor.students.filter(s => 
                s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                s.dept.toLowerCase().includes(studentSearch.toLowerCase())
              );

              return (
                <div key={mentor.id} className="border border-slate-200 rounded-xl overflow-hidden font-sans text-xs shadow-xs">
                  {/* Accordion Header */}
                  <div
                    onClick={() => setExpandedMentorId(isExpanded ? '' : mentor.id)}
                    className={`p-3 flex items-center justify-between cursor-pointer transition-colors ${
                      isExpanded ? 'bg-purple-50/50 border-b border-purple-100' : 'bg-slate-50/70 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={mentor.avatar} alt={mentor.name} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                      <span className="font-bold text-slate-900 text-xs">{mentor.name}</span>
                      {mentor.isPrimary && (
                        <span className="bg-purple-100 text-purple-700 font-semibold px-2 py-0.2 rounded text-[10px]">
                          Primary
                        </span>
                      )}
                      <span className="bg-slate-200/70 text-slate-700 font-semibold px-2 py-0.2 rounded text-[10px] font-mono">
                        {mentor.assignedCount} Students
                      </span>
                    </div>

                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Accordion Body: Table */}
                  {isExpanded && (
                    <div className="p-3 space-y-3">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <th className="pb-2">Student</th>
                            <th className="pb-2">Department</th>
                            <th className="pb-2">Year</th>
                            <th className="pb-2 text-right">Technical Score</th>
                            <th className="pb-2 text-right">Growth (30D)</th>
                            <th className="pb-2">Status</th>
                            <th className="pb-2">Last Active</th>
                            <th className="pb-2 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-medium">
                          {filteredStudents.map(student => (
                            <tr
                              key={student.id}
                              onClick={() => navigateToStudent(student.id)}
                              className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                            >
                              <td className="py-2.5">
                                <div className="flex items-center gap-2">
                                  <img src={student.avatar} alt={student.name} className="w-6 h-6 rounded-full object-cover border border-slate-200 shrink-0" />
                                  <span className="font-bold text-slate-900 text-xs">{student.name}</span>
                                </div>
                              </td>

                              <td className="py-2.5 font-semibold text-slate-700">{student.dept}</td>
                              <td className="py-2.5 text-slate-600">{student.year}</td>

                              <td className="py-2.5 text-right font-mono font-bold text-slate-900">{student.score}</td>
                              <td className="py-2.5 text-right font-mono font-bold text-emerald-600">+{student.growth}%</td>

                              <td className="py-2.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  student.status === 'High Potential' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                  student.status === 'High Growth' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                  student.status === 'Strong' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                  'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                  {student.status}
                                </span>
                              </td>

                              <td className="py-2.5 text-slate-500 text-xs">{student.lastActive}</td>

                              <td className="py-2.5 text-right" onClick={e => e.stopPropagation()}>
                                <button
                                  onClick={() => navigateToStudent(student.id)}
                                  className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-md"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="text-center pt-1 border-t border-slate-100">
                        <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">
                          View all {mentor.assignedCount} students ∨
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Mentor Activity Overview & Group Settings (4 cols) */}
        <div className="col-span-4 space-y-4">
          {/* Mentor Activity Overview */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 font-bold text-slate-900 text-xs">
              <span>Mentor Activity Overview</span>
              <span className="text-[10px] text-slate-400 font-medium">Last 30 days</span>
            </div>

            <div className="space-y-2.5 font-medium text-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Layers className="w-3.5 h-3.5" /></div>
                  <span>Sessions Conducted</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <strong className="text-slate-900 text-sm font-bold">12</strong>
                  <span className="text-emerald-600 text-[10px] font-bold">↑ 20%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Users className="w-3.5 h-3.5" /></div>
                  <span>Students Mentored</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <strong className="text-slate-900 text-sm font-bold">{totalStudents}</strong>
                  <span className="text-slate-400 text-[10px]">—</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg"><Calendar className="w-3.5 h-3.5" /></div>
                  <span>Average Attendance</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <strong className="text-slate-900 text-sm font-bold">78%</strong>
                  <span className="text-emerald-600 text-[10px] font-bold">↑ 8%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg"><Star className="w-3.5 h-3.5" /></div>
                  <span>Feedback Score</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <strong className="text-slate-900 text-sm font-bold">4.6 / 5</strong>
                  <span className="text-emerald-600 text-[10px] font-bold">↑ 0.2</span>
                </div>
              </div>
            </div>
          </div>

          {/* Group Settings */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2 font-bold text-slate-900 text-xs">
              <span>Group Settings</span>
            </div>

            <div className="space-y-2 text-slate-700 font-medium">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Group Visibility</span>
                <strong className="text-slate-900">CTC & Mentors</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Allow Mentor Notes</span>
                <strong className="text-emerald-600 font-bold">Enabled</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Attendance Tracking</span>
                <strong className="text-emerald-600 font-bold">Enabled</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Auto Reminder</span>
                <strong className="text-emerald-600 font-bold">Enabled</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="text-blue-600 font-semibold text-xs hover:underline cursor-pointer">Edit Settings &gt;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reassignment Modal */}
      {reassignSourceMentorId && (
        <ReassignStudentsModal
          isOpen={!!reassignSourceMentorId}
          onClose={() => setReassignSourceMentorId(null)}
          sourceMentorId={reassignSourceMentorId}
          onReassign={handleReassignStudents}
        />
      )}

      {/* Assign Mentor Modal */}
      <AssignMentorModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        groupId="g1"
      />
    </div>
  );
};
