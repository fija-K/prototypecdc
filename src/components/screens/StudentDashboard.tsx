import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, Search, Bell, ChevronDown, TrendingUp, Flame, Trophy, Users, 
  BarChart3, Info, Target, AlertTriangle, Lightbulb, Zap, Briefcase, 
  Clock, ArrowRight, Edit3, MessageSquare, Code, GitCommit, CheckCircle2, 
  Send, LogOut, ArrowLeft, ExternalLink, ShieldCheck, Sparkles, X, ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const GROWTH_DATA = [
  { month: 'Jan', score: 100 },
  { month: 'Feb', score: 250 },
  { month: 'Mar', score: 400 },
  { month: 'Apr', score: 500 },
  { month: 'May', score: 700 },
  { month: 'Jun', score: 880 },
];

const SKILL_STRENGTHS = [
  { name: 'Data Structures & Algorithms', pct: 85 },
  { name: 'Web Development', pct: 78 },
  { name: 'Database Management', pct: 72 },
  { name: 'Problem Solving', pct: 88 },
  { name: 'System Design', pct: 65 },
];

const SKILL_GAPS = [
  { name: 'Machine Learning', pct: 40 },
  { name: 'DevOps', pct: 35 },
  { name: 'Cloud Computing', pct: 45 },
  { name: 'Mobile Development', pct: 30 },
  { name: 'System Design', pct: 65 },
];

const OPPORTUNITIES_LIST = [
  {
    id: 'o1',
    name: 'Google Summer of Code 2025',
    logoText: 'G',
    logoBg: 'bg-white text-blue-600 border border-slate-200',
    tags: ['Open Source', 'Global'],
    deadline: 'Mar 15, 2025'
  },
  {
    id: 'o2',
    name: 'Microsoft Learn Student Ambassador',
    logoText: 'MS',
    logoBg: 'bg-amber-500 text-white',
    tags: ['Student Program', 'Global'],
    deadline: 'Mar 30, 2025'
  },
  {
    id: 'o3',
    name: 'Flipkart GRiD 7.0',
    logoText: 'FK',
    logoBg: 'bg-yellow-400 text-slate-900',
    tags: ['Hackathon', 'India'],
    deadline: 'Apr 10, 2025'
  }
];

const MY_GROUPS_LIST = [
  {
    id: 'g1',
    name: 'Web Dev Cohort',
    mentor: 'Dr. Sharma',
    iconBg: 'bg-blue-100 text-blue-700'
  },
  {
    id: 'g2',
    name: 'ML Explorers',
    mentor: 'Prof. Rao',
    iconBg: 'bg-indigo-100 text-indigo-700'
  },
  {
    id: 'g3',
    name: 'Open Source Club',
    mentor: 'Ms. Iyer',
    iconBg: 'bg-emerald-100 text-emerald-700'
  }
];

const RECENT_ACTIVITIES = [
  {
    id: 'a1',
    text: 'Solved 3 problems on Codeforces',
    time: '2 hours ago',
    icon: Code,
    iconBg: 'bg-emerald-100 text-emerald-700'
  },
  {
    id: 'a2',
    text: 'Updated GitHub repository',
    time: '5 hours ago',
    icon: GitCommit,
    iconBg: 'bg-slate-900 text-white'
  },
  {
    id: 'a3',
    text: 'Completed Web Development module',
    time: '1 day ago',
    icon: CheckCircle2,
    iconBg: 'bg-purple-100 text-purple-700'
  },
  {
    id: 'a4',
    text: 'Applied to Google Summer of Code',
    time: '1 day ago',
    icon: Send,
    iconBg: 'bg-blue-100 text-blue-700'
  }
];

export const StudentDashboard: React.FC = () => {
  const { user, logout, setCurrentScreen, students } = useApp();

  // Modals state
  const [isTalkMentorOpen, setIsTalkMentorOpen] = useState(false);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [mentorMessage, setMentorMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const student = students[0]; // Demo data

  const handleSendMentorMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setMentorMessage('');
      setIsTalkMentorOpen(false);
    }, 1500);
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
          {/* 1. Dashboard (Active) */}
          <button
            onClick={() => setCurrentScreen('student-dashboard')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-950/50 transition-all"
          >
            <BarChart3 className="w-4 h-4 text-white" />
            <span>Dashboard</span>
          </button>

          {/* 2. My Groups */}
          <button
            onClick={() => setCurrentScreen('groups')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>My Groups</span>
          </button>

          {/* 3. Mentor Connect */}
          <button
            onClick={() => setIsTalkMentorOpen(true)}
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
              placeholder="Search for opportunities, skills, resources..."
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
          {/* 4. WELCOME GREETING SECTION */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Good morning, Fiza! 👋
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Keep learning. Keep building. You're on a great path.
              </p>
            </div>

            {/* Quote Block */}
            <div className="text-right max-w-xs">
              <p className="text-xs text-slate-600 font-medium italic leading-relaxed">
                "Opportunities don't happen, you build the skills for them."
              </p>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                — Technical Intelligence
              </p>
            </div>
          </div>

          {/* 5. TOP KPI ROW (4 Equal Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* CARD 1 — TECHNICAL SCORE */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">Technical Score</span>
                  <button onClick={() => setIsScoreModalOpen(true)} title="View calculation details">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                  </button>
                </div>
                <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>↑ 12%</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">842</span>
                  <span className="text-xs font-semibold text-slate-400"> / 1000</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">from last month</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full w-[84.2%]" />
              </div>
            </div>

            {/* CARD 2 — DEPARTMENT RANK */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700">Department Rank</span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">#8</span>
                  <span className="text-xs font-semibold text-slate-400"> / 120</span>
                </div>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Computer Science & Engineering</p>
              </div>
            </div>

            {/* CARD 3 — BATCH RANK */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/10 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700">Batch Rank</span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 tracking-tight">#24</span>
                  <span className="text-xs font-semibold text-slate-400"> / 540</span>
                </div>
                <p className="text-xs font-medium text-slate-500 mt-0.5">2023 – 2027</p>
              </div>
            </div>

            {/* CARD 4 — ACTIVITY STREAK */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                  <Flame className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-700">Activity Streak</span>
              </div>

              <div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">32 days</span>
                <p className="text-xs font-semibold text-emerald-600 mt-0.5">Keep it going!</p>
              </div>
            </div>
          </div>

          {/* 6. SECOND ROW (3 Cards: Your Growth, Skill Strengths, Skill Gaps) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* YOUR GROWTH */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    Your Growth
                  </h3>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                    ↑ 48% since January
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Your technical activity over time</p>
              </div>

              {/* Chart */}
              <div className="h-44 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '11px' }}
                      itemStyle={{ color: '#818CF8' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#growthGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* SKILL STRENGTHS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  Skill Strengths
                </h3>
                <p className="text-xs text-slate-500 font-medium">Your top technical skills</p>
              </div>

              <div className="space-y-2.5">
                {SKILL_STRENGTHS.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">{item.name}</span>
                      <span className="text-emerald-600 font-bold">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SKILL GAPS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  Skill Gaps
                </h3>
                <p className="text-xs text-slate-500 font-medium">Areas to focus on</p>
              </div>

              <div className="space-y-2.5">
                {SKILL_GAPS.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">{item.name}</span>
                      <span className="text-rose-500 font-bold">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-rose-400 h-2 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7 & 8. THIRD ROW (RECOMMENDED FOR YOU + QUICK ACTIONS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* RECOMMENDED FOR YOU (Cols 8) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Recommended For You
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Personalized suggestions based on your profile and goals
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Improve ML */}
                <div className="p-3.5 bg-purple-50/60 border border-purple-200/80 rounded-xl space-y-2 flex flex-col justify-between hover:border-purple-300 transition-colors">
                  <div className="space-y-2">
                    <div className="w-7 h-7 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold">
                      <Code className="w-4 h-4" />
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                      Improve in Machine Learning
                    </h4>
                  </div>
                  <button className="text-[11px] font-bold text-purple-700 hover:underline flex items-center gap-1 text-left">
                    <span>Curated resources to get started</span>
                    <span>→</span>
                  </button>
                </div>

                {/* 2. Open Source */}
                <div className="p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-xl space-y-2 flex flex-col justify-between hover:border-blue-300 transition-colors">
                  <div className="space-y-2">
                    <div className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                      <Users className="w-4 h-4" />
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                      Contribute to Open Source
                    </h4>
                  </div>
                  <button className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1 text-left">
                    <span>Find beginner-friendly projects</span>
                    <span>→</span>
                  </button>
                </div>

                {/* 3. Apply Opportunities */}
                <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-xl space-y-2 flex flex-col justify-between hover:border-emerald-300 transition-colors">
                  <div className="space-y-2">
                    <div className="w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-bold">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                      Apply for Relevant Opportunities
                    </h4>
                  </div>
                  <button 
                    onClick={() => setCurrentScreen('opportunities')}
                    className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 text-left"
                  >
                    <span>Internships, hackathons & more</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS (Cols 4) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Quick Actions
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setCurrentScreen('student-my-profile')}
                  className="p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-left text-xs font-bold text-slate-800 transition-colors flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4 text-blue-600" />
                  <span>Update Profile</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('opportunities')}
                  className="p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-left text-xs font-bold text-slate-800 transition-colors flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>Explore Opportunities</span>
                </button>

                <button
                  onClick={() => setCurrentScreen('groups')}
                  className="p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-left text-xs font-bold text-slate-800 transition-colors flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>View My Groups</span>
                </button>

                <button
                  onClick={() => setIsTalkMentorOpen(true)}
                  className="p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-left text-xs font-bold text-slate-800 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  <span>Talk to Mentor</span>
                </button>
              </div>
            </div>
          </div>

          {/* 9. BOTTOM CONTENT ROW (3 Equal Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* A. UPCOMING OPPORTUNITIES */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    Upcoming Opportunities
                  </h3>
                  <button 
                    onClick={() => setCurrentScreen('opportunities')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {OPPORTUNITIES_LIST.map(opp => (
                    <div key={opp.id} className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl font-black text-xs flex items-center justify-center shrink-0 shadow-2xs ${opp.logoBg}`}>
                          {opp.logoText}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-extrabold text-slate-900 leading-tight">{opp.name}</h4>
                          <div className="flex items-center gap-1.5">
                            {opp.tags.map((t, idx) => (
                              <span key={idx} className="px-1.5 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] font-bold">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-[10px] text-slate-400 font-semibold block">Apply by</p>
                        <p className="text-[11px] font-bold text-slate-800">{opp.deadline}</p>
                        <button 
                          onClick={() => setCurrentScreen('opportunities')}
                          className="mt-1 p-1 bg-white hover:bg-slate-100 text-blue-600 border border-slate-200 rounded-lg inline-flex"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* B. MY GROUPS */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    My Groups
                  </h3>
                  <button 
                    onClick={() => setCurrentScreen('groups')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {MY_GROUPS_LIST.map(grp => (
                    <div key={grp.id} className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${grp.iconBg}`}>
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-900">{grp.name}</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Mentor: {grp.mentor}</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => setCurrentScreen('groups')}
                        className="p-1.5 text-slate-400 hover:text-slate-600"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* C. RECENT ACTIVITY */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    Recent Activity
                  </h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View All →</button>
                </div>

                <div className="space-y-3">
                  {RECENT_ACTIVITIES.map(act => {
                    const IconComp = act.icon;
                    return (
                      <div key={act.id} className="flex items-start gap-3 text-xs">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold shrink-0 mt-0.5 ${act.iconBg}`}>
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-800 leading-snug">{act.text}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{act.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* TALK TO MENTOR MODAL */}
      {isTalkMentorOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Message Assigned Mentor</h3>
              </div>
              <button onClick={() => setIsTalkMentorOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                DR
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Dr. Rajesh Sharma</h4>
                <p className="text-[10px] text-slate-500 font-medium">CSE Senior Mentor | GLBITM</p>
              </div>
            </div>

            {messageSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold text-center">
                Message sent successfully to Dr. Sharma!
              </div>
            ) : (
              <form onSubmit={handleSendMentorMessage} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Question / Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask about project guidance, skill recommendations, or career advice..."
                    value={mentorMessage}
                    onChange={e => setMentorMessage(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsTalkMentorOpen(false)}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SCORE FORMULA BREAKDOWN MODAL */}
      {isScoreModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-extrabold text-slate-900">Technical Score Breakdown</h3>
              </div>
              <button onClick={() => setIsScoreModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <span className="font-bold text-slate-700">Overall Score</span>
                <span className="text-lg font-black text-blue-600">842 / 1000</span>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Competitive Programming (LeetCode, CF)</span>
                  <span className="font-bold text-slate-900">320 / 350 pts</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Development & Open Source (GitHub)</span>
                  <span className="font-bold text-slate-900">260 / 300 pts</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Academic & Group Milestones</span>
                  <span className="font-bold text-slate-900">162 / 200 pts</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-600">Certifications & Hackathons</span>
                  <span className="font-bold text-slate-900">100 / 150 pts</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsScoreModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
