import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, Search, Bell, ChevronDown, BarChart3, Users, MessageSquare, 
  Briefcase, Calendar, MoreVertical, ArrowRight, X, UserCheck, ShieldCheck, 
  Sparkles, Megaphone, Plus, Clock, ExternalLink, LogOut, Code, Cpu, 
  Cloud, Smartphone, Trophy, Layers, ChevronRight
} from 'lucide-react';

interface GroupItem {
  id: string;
  name: string;
  mentor: string;
  tags: string[];
  description: string;
  status: 'active' | 'archived';
  icon: any;
  iconBg: string;
  iconColor: string;
  nextSessionBoxBg: string;
  nextSessionIconColor: string;
  buttonBg: string;
  nextSession: {
    title: string;
    datetime: string;
  };
}

const GROUPS_MOCK: GroupItem[] = [
  {
    id: 'g1',
    name: 'Web Development Cohort',
    mentor: 'Dr. Sharma',
    tags: ['Web Development', 'Backend', 'Frontend'],
    description: 'Learn, build and collaborate on real-world web development projects.',
    status: 'active',
    icon: Code,
    iconBg: 'bg-blue-100/80',
    iconColor: 'text-blue-600',
    nextSessionBoxBg: 'bg-blue-50/80 border border-blue-100',
    nextSessionIconColor: 'text-blue-600',
    buttonBg: 'bg-blue-50/80 hover:bg-blue-100/90 text-blue-700 border border-blue-200/60',
    nextSession: {
      title: 'REST API Workshop',
      datetime: 'Fri, 12 Sep 2025 • 4:00 PM'
    }
  },
  {
    id: 'g2',
    name: 'ML Explorers',
    mentor: 'Prof. Rao',
    tags: ['Machine Learning', 'AI', 'Data Science'],
    description: 'Explore machine learning concepts and work on hands-on projects together.',
    status: 'active',
    icon: Cpu,
    iconBg: 'bg-purple-100/80',
    iconColor: 'text-purple-600',
    nextSessionBoxBg: 'bg-purple-50/80 border border-purple-100',
    nextSessionIconColor: 'text-purple-600',
    buttonBg: 'bg-purple-50/80 hover:bg-purple-100/90 text-purple-700 border border-purple-200/60',
    nextSession: {
      title: 'Model Evaluation & Tuning',
      datetime: 'Sat, 13 Sep 2025 • 5:00 PM'
    }
  },
  {
    id: 'g3',
    name: 'Open Source Club',
    mentor: 'Ms. Iyer',
    tags: ['Open Source', 'Collaboration', 'Projects'],
    description: 'Contribute to meaningful open source projects and build your developer profile.',
    status: 'active',
    icon: Users,
    iconBg: 'bg-emerald-100/80',
    iconColor: 'text-emerald-600',
    nextSessionBoxBg: 'bg-emerald-50/80 border border-emerald-100',
    nextSessionIconColor: 'text-emerald-600',
    buttonBg: 'bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-700 border border-emerald-200/60',
    nextSession: {
      title: 'Contribution Walkthrough',
      datetime: 'Sun, 14 Sep 2025 • 6:00 PM'
    }
  },
  {
    id: 'g4',
    name: 'Competitive Programming',
    mentor: 'Dr. Verma',
    tags: ['Competitive Programming', 'DSA'],
    description: 'Practice, learn and participate in coding contests together.',
    status: 'active',
    icon: Trophy,
    iconBg: 'bg-rose-100/80',
    iconColor: 'text-rose-600',
    nextSessionBoxBg: 'bg-rose-50/80 border border-rose-100',
    nextSessionIconColor: 'text-rose-600',
    buttonBg: 'bg-rose-50/80 hover:bg-rose-100/90 text-rose-700 border border-rose-200/60',
    nextSession: {
      title: 'Weekly Contest Discussion',
      datetime: 'Thu, 11 Sep 2025 • 7:00 PM'
    }
  },
  {
    id: 'g5',
    name: 'Cloud & DevOps',
    mentor: 'Prof. Khan',
    tags: ['Cloud Computing', 'DevOps', 'System Design'],
    description: 'Explore cloud technologies and learn deployment, infrastructure and DevOps tools.',
    status: 'active',
    icon: Cloud,
    iconBg: 'bg-amber-100/80',
    iconColor: 'text-amber-600',
    nextSessionBoxBg: 'bg-amber-50/80 border border-amber-100',
    nextSessionIconColor: 'text-amber-600',
    buttonBg: 'bg-amber-50/80 hover:bg-amber-100/90 text-amber-700 border border-amber-200/60',
    nextSession: {
      title: 'Docker & Deployment Basics',
      datetime: 'Sat, 13 Sep 2025 • 4:00 PM'
    }
  },
  {
    id: 'g6',
    name: 'Mobile App Development',
    mentor: 'Dr. Singh',
    tags: ['Mobile Development', 'Android', 'Flutter'],
    description: 'Build and deploy real-world mobile applications with industry-relevant tools.',
    status: 'active',
    icon: Smartphone,
    iconBg: 'bg-teal-100/80',
    iconColor: 'text-teal-600',
    nextSessionBoxBg: 'bg-teal-50/80 border border-teal-100',
    nextSessionIconColor: 'text-teal-600',
    buttonBg: 'bg-teal-50/80 hover:bg-teal-100/90 text-teal-700 border border-teal-200/60',
    nextSession: {
      title: 'Flutter Project Setup',
      datetime: 'Sun, 14 Sep 2025 • 3:00 PM'
    }
  }
];

const UPCOMING_ACTIVITIES_MOCK = [
  { day: '12', month: 'SEP', title: 'REST API Workshop', group: 'Web Development Cohort', time: '4:00 PM' },
  { day: '13', month: 'SEP', title: 'Model Evaluation & Tuning', group: 'ML Explorers', time: '5:00 PM' },
  { day: '14', month: 'SEP', title: 'Contribution Walkthrough', group: 'Open Source Club', time: '6:00 PM' },
  { day: '14', month: 'SEP', title: 'Flutter Project Setup', group: 'Mobile App Development', time: '3:00 PM' }
];

const ANNOUNCEMENTS_MOCK = [
  { title: 'New Spring Boot resources uploaded', group: 'Web Development Cohort', time: '2 hours ago', color: 'bg-blue-500' },
  { title: 'Project ideas for the next hackathon', group: 'Open Source Club', time: '5 hours ago', color: 'bg-emerald-500' },
  { title: 'ML study material shared', group: 'ML Explorers', time: '1 day ago', color: 'bg-purple-500' },
  { title: 'DevOps session recording available', group: 'Cloud & DevOps', time: '1 day ago', color: 'bg-amber-500' }
];

export const StudentMyGroups: React.FC = () => {
  const { logout, setCurrentScreen, setSelectedGroupId } = useApp();

  // Filter & Search states
  const [filterTab, setFilterTab] = useState<'all' | 'active' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected Group Details Modal
  const [selectedGroupModal, setSelectedGroupModal] = useState<GroupItem | null>(null);

  // Filter logic
  const filteredGroups = GROUPS_MOCK.filter(g => {
    if (filterTab === 'active' && g.status !== 'active') return false;
    if (filterTab === 'archived' && g.status !== 'archived') return false;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = g.name.toLowerCase().includes(q);
      const mentorMatch = g.mentor.toLowerCase().includes(q);
      const tagMatch = g.tags.some(t => t.toLowerCase().includes(q));
      const descMatch = g.description.toLowerCase().includes(q);
      return nameMatch || mentorMatch || tagMatch || descMatch;
    }
    return true;
  });

  const handleViewGroup = (group: GroupItem) => {
    setSelectedGroupModal(group);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex select-none">
      {/* 1. FIXED DARK NAVY SIDEBAR */}
      <aside className="w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 text-slate-100 justify-between">
        {/* Top Logo & Tagline */}
        <div className="p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white font-bold shadow-lg shadow-indigo-950">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm text-slate-100 tracking-wide">Technical Intelligence</h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider">Learn • Build • Grow</p>
            </div>
          </div>
        </div>

        {/* 5 Fixed Navigation Items */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {/* 1. Dashboard */}
          <button
            onClick={() => setCurrentScreen('student-dashboard')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span>Dashboard</span>
          </button>

          {/* 2. My Groups (Active) */}
          <button
            onClick={() => setCurrentScreen('student-groups')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-950/50 transition-all"
          >
            <Users className="w-4 h-4 text-white" />
            <span>My Groups</span>
          </button>

          {/* 3. Mentor Connect */}
          <button
            onClick={() => {}}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-slate-400" />
            <span>Mentor Connect</span>
          </button>

          {/* 4. Skills & Profile */}
          <button
            onClick={() => setCurrentScreen('student-my-profile')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <Award className="w-4 h-4 text-slate-400" />
            <span>Skills & Profile</span>
          </button>

          {/* 5. Opportunities */}
          <button
            onClick={() => setCurrentScreen('opportunities')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span>Opportunities</span>
          </button>
        </nav>

        {/* Sidebar Footer Quote & Brand */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-4">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 space-y-1">
            <p className="text-[11px] text-slate-400 italic leading-snug">
              "Small consistent steps lead to big opportunities."
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2" />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <div>
              <p className="font-black text-slate-200 tracking-wider">GLV</p>
              <p className="text-[10px] text-slate-500 font-medium">Empowering Technical Talent</p>
            </div>
            <button
              onClick={() => setCurrentScreen('overview')}
              className="px-2 py-1 text-[10px] font-bold bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded hover:bg-blue-600/30 transition-colors"
              title="Switch to CDC Portal"
            >
              CDC Portal
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* 2. TOP HEADER */}
        <header className="bg-white border-b border-slate-200/80 px-8 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-2xs">
          {/* Search Bar */}
          <div className="relative w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search groups, topics, resources..."
              className="w-full bg-[#F1F5F9] border border-slate-200/80 pl-10 pr-4 py-2 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* User Right Area */}
          <div className="flex items-center gap-5">
            {/* Notification */}
            <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Profile Avatar Pill */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black shadow-xs">
                F
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-slate-900 leading-tight">Fiza Khan</h4>
                <p className="text-[10px] text-slate-500 font-medium">B.Tech CSE (2023–2027)</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>

            <button
              onClick={logout}
              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* 4. PAGE HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Groups</h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Your technical communities, activities and mentor-led programs.
              </p>
            </div>

            {/* Quote Block */}
            <div className="text-right max-w-xs">
              <p className="text-xs text-slate-600 font-medium italic leading-relaxed">
                "Great things happen when you learn together."
              </p>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                — Technical Intelligence
              </p>
            </div>
          </div>

          {/* 5. FILTER / SEARCH ROW */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 bg-slate-100/70 p-1 rounded-xl border border-slate-200/70">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-4 py-1.5 rounded-lg text-xs transition-all ${
                  filterTab === 'all'
                    ? 'bg-blue-100/90 text-blue-700 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                All Groups
              </button>
              <button
                onClick={() => setFilterTab('active')}
                className={`px-4 py-1.5 rounded-lg text-xs transition-all ${
                  filterTab === 'active'
                    ? 'bg-blue-100/90 text-blue-700 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterTab('archived')}
                className={`px-4 py-1.5 rounded-lg text-xs transition-all ${
                  filterTab === 'archived'
                    ? 'bg-blue-100/90 text-blue-700 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                Archived
              </button>
            </div>

            {/* Right Group Search */}
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search your groups..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200/80 pl-9 pr-3 py-1.5 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
            </div>
          </div>

          {/* MAIN TWO-COLUMN CONTAINER: 3-COL GRID (LEFT) + RIGHT SIDEBAR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 6. MAIN GROUP GRID (Cols 8) */}
            <div className="lg:col-span-8 space-y-4">
              {filteredGroups.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-2">
                  <Users className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs font-bold">No groups found matching your filter or search query.</p>
                  <button 
                    onClick={() => { setFilterTab('all'); setSearchQuery(''); }}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredGroups.map(group => {
                    const IconComp = group.icon;
                    return (
                      <div key={group.id} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-3.5 flex flex-col justify-between hover:border-slate-300 transition-all">
                        <div className="space-y-3">
                          {/* Card Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2.5">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${group.iconBg} ${group.iconColor}`}>
                                <IconComp className="w-4.5 h-4.5" />
                              </div>
                              <div>
                                <h3 className="font-extrabold text-xs text-slate-900 leading-snug">{group.name}</h3>
                                <p className="text-[11px] text-slate-500 font-medium">Mentor: {group.mentor}</p>
                              </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 p-0.5">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {group.tags.map((tag, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-blue-50/70 text-blue-700 border border-blue-100 rounded text-[10px] font-bold">
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Description */}
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            "{group.description}"
                          </p>

                          {/* Next Session Box */}
                          <div className={`p-3 rounded-xl space-y-1 ${group.nextSessionBoxBg}`}>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              <Calendar className={`w-3.5 h-3.5 ${group.nextSessionIconColor}`} />
                              <span>Next Session</span>
                            </div>
                            <h4 className="text-xs font-extrabold text-slate-900 leading-snug">{group.nextSession.title}</h4>
                            <p className="text-[11px] font-semibold text-slate-500">{group.nextSession.datetime}</p>
                          </div>
                        </div>

                        {/* View Group Action Button */}
                        <button
                          onClick={() => handleViewGroup(group)}
                          className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${group.buttonBg}`}
                        >
                          <span>View Group</span>
                          <span>→</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 8. RIGHT SIDEBAR (Cols 4) */}
            <div className="lg:col-span-4 space-y-5">
              {/* SECTION 1: Upcoming Group Activities */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Upcoming Group Activities
                  </h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                </div>

                <div className="space-y-3">
                  {UPCOMING_ACTIVITIES_MOCK.map((act, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 bg-slate-50/70 border border-slate-200/70 rounded-xl">
                      <div className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-2xs">
                        <span className="text-xs font-black text-slate-900 leading-none">{act.day}</span>
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-tight">{act.month}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-extrabold text-slate-900 leading-snug truncate">{act.title}</h4>
                        <p className="text-[10px] text-slate-500 font-medium truncate">{act.group}</p>
                        <p className="text-[10px] font-bold text-slate-400">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: Recent Announcements */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-purple-600" />
                    Recent Announcements
                  </h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                </div>

                <div className="space-y-3">
                  {ANNOUNCEMENTS_MOCK.map((ann, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${ann.color}`} />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-slate-900 leading-snug">{ann.title}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">{ann.group}</p>
                        <p className="text-[10px] text-slate-400">{ann.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: Explore More Groups */}
              <div className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 border border-indigo-100 rounded-2xl p-5 shadow-2xs flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold">
                      <Users className="w-4 h-4" />
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-900">Explore More Groups</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium leading-tight">
                    Join new communities and find your interests.
                  </p>
                </div>

                <button 
                  onClick={() => {}}
                  className="w-9 h-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* GROUP DETAILS OVERVIEW MODAL */}
      {selectedGroupModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${selectedGroupModal.iconBg} ${selectedGroupModal.iconColor}`}>
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{selectedGroupModal.name}</h3>
                  <p className="text-xs font-medium text-slate-500">Mentor: {selectedGroupModal.mentor}</p>
                </div>
              </div>
              <button onClick={() => setSelectedGroupModal(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-700 block mb-1">About Community</span>
                <p className="text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  "{selectedGroupModal.description}"
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Focus Topics & Technologies</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedGroupModal.tags.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Upcoming Live Workshop</span>
                <h4 className="font-extrabold text-xs text-slate-900">{selectedGroupModal.nextSession.title}</h4>
                <p className="text-xs text-slate-600 font-semibold">{selectedGroupModal.nextSession.datetime}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedGroupModal(null)}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedGroupId(selectedGroupModal.id);
                  setSelectedGroupModal(null);
                  setCurrentScreen('group-detail');
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Enter Community Hub →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMyGroups;
