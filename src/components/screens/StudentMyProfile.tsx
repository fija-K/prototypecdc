import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, ArrowLeft, LogOut, Code, GitCommit, Target, CheckCircle2, TrendingUp,
  Search, Bell, ChevronDown, Edit, Globe, Mail, Phone, MapPin, ExternalLink,
  Plus, Upload, ShieldCheck, Check, Info, FileText, Download, Eye, Sparkles,
  Trophy, Medal, Briefcase, GraduationCap, Github, Linkedin, BookOpen, Layers,
  Lock, RefreshCw, Layers2, FolderGit2, Users, UserCheck, LayoutDashboard, X
} from 'lucide-react';

export const StudentMyProfile: React.FC = () => {
  const { user, logout, setCurrentScreen, students } = useApp();
  const student = students[0]; // Aarav Khan demo data

  // Active sub-tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'platforms' | 'projects' | 'experience' | 'achievements' | 'certifications' | 'research' | 'resume'>('overview');

  // Modals state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [isConnectPlatformOpen, setIsConnectPlatformOpen] = useState<string | null>(null);

  // Editable Student Data state
  const [profileData, setProfileData] = useState({
    name: 'Aarav Khan',
    year: '3rd Year',
    department: 'Computer Science & Engineering',
    batch: 'Batch 2024',
    location: 'Bengaluru, India',
    email: 'aarav.khan@college.edu',
    phone: '+91 98765 43210',
    phoneVisibility: 'Visible to mentors only',
    portfolio: 'https://aaravkhan.dev',
    linkedin: 'https://linkedin.com/in/aaravkhan',
    github: 'https://github.com/aarav-khan',
    bio: 'Full-stack developer interested in backend systems, fintech, distributed systems and competitive programming. Always open to learning and working on impactful projects.'
  });

  const [projectsList, setProjectsList] = useState([
    {
      id: 'p1',
      title: 'Spring Boot Payment API',
      status: 'In Progress',
      progress: 70,
      category: 'Backend Development',
      tech: ['Java', 'Spring Boot', 'PostgreSQL'],
      description: 'REST-based payment processing API with authentication, transaction handling and PostgreSQL persistence.',
      github: 'https://github.com/aarav-khan/payment-api',
      demo: 'https://demo.payment-api.dev',
      updated: 'Aug 28, 2024'
    },
    {
      id: 'p2',
      title: 'Fraud Detection System',
      status: 'Completed',
      progress: 100,
      category: 'Machine Learning / FinTech',
      tech: ['Python', 'FastAPI', 'Pandas', 'Scikit-learn'],
      description: 'Machine learning based fraud detection using transaction patterns and behavioral signals.',
      github: 'https://github.com/aarav-khan/fraud-detection',
      demo: 'https://docs.fraud-detection.dev',
      updated: 'Jul 15, 2024'
    }
  ]);

  const [experienceList, setExperienceList] = useState([
    {
      id: 'e1',
      role: 'Software Engineering Intern',
      company: 'XYZ Technologies',
      period: 'May 2025 – Jul 2025',
      type: 'Internship',
      points: [
        'Developed REST APIs using Spring Boot',
        'Optimized database queries',
        'Worked on payment processing module'
      ]
    }
  ]);

  const [connectedPlatforms, setConnectedPlatforms] = useState({
    codechef: false,
    gitlab: false,
    bitbucket: false
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex select-none">
      {/* 1. DARK NAVY LEFT SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 text-slate-100">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white font-bold shadow-md shadow-blue-950">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-slate-100 tracking-wide">TECHNICAL INTELLIGENCE</h1>
            <p className="text-[11px] text-teal-400 font-medium">Student Portal</p>
          </div>
        </div>

        {/* Primary Student Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Student Menu
          </div>

          <button
            onClick={() => setCurrentScreen('student-dashboard')}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentScreen('student-my-profile')}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-md shadow-blue-950 transition-all"
          >
            <UserCheck className="w-4 h-4 text-white" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => {}}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
          >
            <FolderGit2 className="w-4 h-4 text-slate-400" />
            <span>Platforms & Projects</span>
          </button>

          <button
            onClick={() => {}}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
          >
            <Target className="w-4 h-4 text-slate-400" />
            <span>Goals & Learning</span>
          </button>

          <button
            onClick={() => {}}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>My Groups</span>
          </button>

          <button
            onClick={() => {}}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-slate-400" />
            <span>Mentor Connect</span>
          </button>

          <button
            onClick={() => {}}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
          >
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span>Opportunities</span>
          </button>
        </nav>

        {/* User Scope / Switch */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-semibold text-slate-300">GLBITM Student Portal</span>
            <button
              onClick={() => setCurrentScreen('overview')}
              className="px-2 py-0.5 text-[10px] font-bold bg-[#008ca5]/20 text-teal-300 border border-[#008ca5]/40 rounded hover:bg-[#008ca5]/40 transition-colors"
            >
              CDC Portal
            </button>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-rose-600/20 text-rose-300 border border-rose-600/30 hover:bg-rose-600/30 rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* 2. TOP NAVIGATION BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-xs">
          {/* Horizontal Nav Links */}
          <div className="flex items-center gap-6 text-xs font-semibold">
            <span className="text-slate-900 font-extrabold tracking-wider text-sm flex items-center gap-2 mr-2">
              <Award className="w-5 h-5 text-blue-600" />
              TECHNICAL INTELLIGENCE
            </span>
            <button 
              onClick={() => setCurrentScreen('student-dashboard')}
              className="text-slate-600 hover:text-slate-900 py-1 transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => setCurrentScreen('student-my-profile')}
              className="text-blue-600 border-b-2 border-blue-600 py-1 font-bold transition-colors"
            >
              My Profile
            </button>
            <button className="text-slate-600 hover:text-slate-900 py-1 transition-colors">Platforms & Projects</button>
            <button className="text-slate-600 hover:text-slate-900 py-1 transition-colors">Goals & Learning</button>
            <button className="text-slate-600 hover:text-slate-900 py-1 transition-colors">My Groups</button>
            <button className="text-slate-600 hover:text-slate-900 py-1 transition-colors">Mentor Connect</button>
            <button className="text-slate-600 hover:text-slate-900 py-1 transition-colors">Opportunities</button>
          </div>

          {/* Right User Search & Notifications */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-100 border border-slate-200 pl-8 pr-3 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {/* User Avatar Dropdown */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-7 h-7 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-xs">
                AK
              </div>
              <span className="text-xs font-bold text-slate-800">Aarav</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="p-6 space-y-5 max-w-7xl w-full mx-auto">
          {/* 4. PAGE HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1">
                <span>My Profile</span>
                <span>›</span>
                <span className="text-slate-900 font-bold">Overview</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Profile</h1>
              <p className="text-xs text-slate-500 font-medium">
                Manage your technical identity, skills, projects and achievements.
              </p>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Last updated: 2 hours ago</span>
              </div>

              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg border border-slate-200 shadow-2xs transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Preview Profile</span>
              </button>

              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* 5. PROFILE HERO / IDENTITY CARD */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Profile Details */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
                    alt="Aarav Khan"
                    className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 shadow-xs"
                  />
                  <button 
                    onClick={() => setIsEditProfileOpen(true)}
                    className="absolute bottom-0 right-0 p-1.5 bg-slate-900 text-white rounded-full border-2 border-white shadow-xs hover:bg-blue-600 transition-colors"
                    title="Change Profile Photo"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900">{profileData.name}</h2>
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[11px] font-bold">
                      {profileData.year}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    {profileData.department}   {profileData.batch}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {profileData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {profileData.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {profileData.phone}
                    </span>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 pt-1 text-xs font-semibold">
                    <a href={profileData.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-700 hover:text-blue-600">
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                    <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-700 hover:text-blue-800">
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                    <a href={profileData.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-teal-700 hover:text-teal-800">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Portfolio</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side Stats Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Score Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Technical Growth Score</span>
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Ring */}
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="18" stroke="#E2E8F0" strokeWidth="4" fill="transparent" />
                        <circle cx="24" cy="24" r="18" stroke="#2563EB" strokeWidth="4" strokeDasharray="113" strokeDashoffset="21" strokeLinecap="round" fill="transparent" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xl font-black text-slate-900">812</span>
                      <span className="text-xs font-semibold text-slate-400"> / 1000</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>↑ 18% over last 90 days</span>
                  </div>
                </div>

                {/* Percentile Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Institution Percentile</span>
                    <Trophy className="w-4 h-4 text-amber-500" />
                  </div>

                  <div>
                    <div className="text-xl font-black text-slate-900">Top 3.1%</div>
                    <div className="text-xs font-semibold text-slate-500">#87 / 2,846</div>
                  </div>

                  <div className="text-[10px] text-slate-400 font-medium">CSE Batch 2024 Rank #7</div>
                </div>

                {/* Completeness Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Profile Completeness</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle cx="24" cy="24" r="18" stroke="#E2E8F0" strokeWidth="4" fill="transparent" />
                        <circle cx="24" cy="24" r="18" stroke="#10B981" strokeWidth="4" strokeDasharray="113" strokeDashoffset="16" strokeLinecap="round" fill="transparent" />
                      </svg>
                    </div>
                    <div className="text-xl font-black text-slate-900">86%</div>
                  </div>

                  <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 text-left flex items-center gap-1">
                    <span>Complete Profile</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bio summary line */}
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
              "{profileData.bio}"
            </div>
          </div>

          {/* 6. PROFILE SUB-NAVIGATION TABS */}
          <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-semibold scrollbar-none">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'skills', label: 'Skills' },
              { id: 'platforms', label: 'Platforms' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Experience' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'research', label: 'Research' },
              { id: 'resume', label: 'Resume' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 7 - 10. ROW 1 MAIN CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* 7. ABOUT ME CARD (Cols 4) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-600" />
                    About Me
                  </h3>
                  <button 
                    onClick={() => setIsEditProfileOpen(true)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                  {profileData.bio}
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Location
                    </span>
                    <span className="font-bold text-slate-800">{profileData.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      Email
                    </span>
                    <span className="font-bold text-slate-800 text-[11px]">{profileData.email}</span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      Phone
                    </span>
                    <div className="text-right">
                      <div className="font-bold text-slate-800">{profileData.phone}</div>
                      <span className="text-[10px] text-slate-400 font-medium block">Visible to mentors only</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-teal-600" />
                      Portfolio
                    </span>
                    <a href={profileData.portfolio} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold text-[11px]">
                      {profileData.portfolio.replace('https://', '')}
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                      LinkedIn
                    </span>
                    <a href={profileData.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold text-[11px]">
                      {profileData.linkedin.replace('https://', '')}
                    </a>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-slate-700" />
                      GitHub
                    </span>
                    <a href={profileData.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold text-[11px]">
                      {profileData.github.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">Data Source:</span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-bold rounded border border-blue-200">
                  ● Student Provided
                </span>
              </div>
            </div>

            {/* 8. TECHNICAL SKILLS CARD (Cols 5) */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-600" />
                    Technical Skills
                  </h3>
                  <button 
                    onClick={() => {}}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {/* Programming Languages */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Programming Languages
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-amber-100 text-amber-700 text-[10px] font-black flex items-center justify-center">PY</span>
                          <span className="text-xs font-bold text-slate-800">Python</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">Strong</span>
                      </div>

                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-rose-100 text-rose-700 text-[10px] font-black flex items-center justify-center">JV</span>
                          <span className="text-xs font-bold text-slate-800">Java</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">Strong</span>
                      </div>

                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-blue-100 text-blue-700 text-[10px] font-black flex items-center justify-center">C++</span>
                          <span className="text-xs font-bold text-slate-800">C++</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">Good</span>
                      </div>

                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-yellow-100 text-yellow-700 text-[10px] font-black flex items-center justify-center">JS</span>
                          <span className="text-xs font-bold text-slate-800">JavaScript</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">Good</span>
                      </div>
                    </div>
                  </div>

                  {/* Frameworks */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Frameworks
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 text-[10px] font-black flex items-center justify-center">SB</span>
                          <span className="text-xs font-bold text-slate-800">Spring Boot</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">Good</span>
                      </div>

                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-cyan-100 text-cyan-700 text-[10px] font-black flex items-center justify-center">RC</span>
                          <span className="text-xs font-bold text-slate-800">React</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">Good</span>
                      </div>

                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">NX</span>
                          <span className="text-xs font-bold text-slate-800">Next.js</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-bold">Developing</span>
                      </div>

                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-teal-100 text-teal-800 text-[10px] font-black flex items-center justify-center">DJ</span>
                          <span className="text-xs font-bold text-slate-800">Django</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-bold">Developing</span>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Technologies
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-orange-100 text-orange-700 text-[10px] font-black flex items-center justify-center">GIT</span>
                          <span className="text-xs font-bold text-slate-800">Git</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">Strong</span>
                      </div>

                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-sky-100 text-sky-700 text-[10px] font-black flex items-center justify-center">DCK</span>
                          <span className="text-xs font-bold text-slate-800">Docker</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">Good</span>
                      </div>

                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 text-[10px] font-black flex items-center justify-center">PG</span>
                          <span className="text-xs font-bold text-slate-800">PostgreSQL</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">Good</span>
                      </div>

                      <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded bg-amber-100 text-amber-800 text-[10px] font-black flex items-center justify-center">AWS</span>
                          <span className="text-xs font-bold text-slate-800">AWS</span>
                        </div>
                        <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-bold">Developing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-right">
                <button className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                  <span>View All Skills</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* 9 & 10. COMPLETENESS & RESUME STACK (Cols 3) */}
            <div className="lg:col-span-3 space-y-5 flex flex-col justify-between">
              {/* Profile Completeness Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Profile Completeness
                  </h3>
                  <span className="text-base font-black text-emerald-600">86%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full w-[86%]" />
                </div>

                <div className="space-y-1 text-xs">
                  <span className="font-bold text-rose-600 block">Missing:</span>
                  <ul className="space-y-1 text-slate-600 font-medium pl-1">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>Add portfolio link</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>Add 1 project description</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>Connect CodeChef</span>
                    </li>
                  </ul>
                </div>

                <button className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1">
                  <span>Complete Profile</span>
                  <span>→</span>
                </button>
              </div>

              {/* Resume Management Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-500" />
                    Resume
                  </h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline">
                    Replace
                  </button>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-500 text-white rounded-lg flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                    PDF
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">Aarav_Khan_Resume.pdf</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Updated: Sep 4, 2024   1.2 MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center justify-center gap-1 transition-colors">
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Preview</span>
                  </button>
                  <button className="py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center justify-center gap-1 transition-colors">
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 11. COMPETITIVE PROGRAMMING PLATFORMS SECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Competitive Programming Platforms
              </h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* LeetCode */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-amber-500/10 text-amber-600 rounded-lg flex items-center justify-center font-black text-xs">
                        LC
                      </div>
                      <span className="font-extrabold text-sm text-slate-900">LeetCode</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                      Connected ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">aarav_dev</p>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Problems</span>
                      <span className="font-extrabold text-slate-900 text-sm">486</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Rating</span>
                      <span className="font-extrabold text-blue-600 text-sm">1,542</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Last synced: 2 hours ago</span>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View Profile</button>
                </div>
              </div>

              {/* Codeforces */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center font-black text-xs">
                        CF
                      </div>
                      <span className="font-extrabold text-sm text-slate-900">Codeforces</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                      Connected ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">aarav_cp</p>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Rating</span>
                      <span className="font-extrabold text-blue-600 text-sm">1,280</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Max Rating</span>
                      <span className="font-extrabold text-slate-900 text-sm">1,364</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Last synced: 2 hours ago</span>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View Profile</button>
                </div>
              </div>

              {/* CodeChef */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-amber-700/10 text-amber-800 rounded-lg flex items-center justify-center font-black text-xs">
                        CC
                      </div>
                      <span className="font-extrabold text-sm text-slate-900">CodeChef</span>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 rounded text-[10px] font-bold">
                      Not Connected
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium pt-1">
                    Connect your CodeChef account to sync your data.
                  </p>
                </div>

                <button 
                  onClick={() => setIsConnectPlatformOpen('CodeChef')}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  + Connect
                </button>
              </div>

              {/* GeeksforGeeks */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-emerald-500/10 text-emerald-600 rounded-lg flex items-center justify-center font-black text-xs">
                        GFG
                      </div>
                      <span className="font-extrabold text-sm text-slate-900">GeeksforGeeks</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                      Connected ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">aarav2404</p>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Problems</span>
                      <span className="font-extrabold text-slate-900 text-sm">320</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Institute Rank</span>
                      <span className="font-extrabold text-emerald-600 text-sm">#24</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Last synced: 1 hour ago</span>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View Profile</button>
                </div>
              </div>
            </div>
          </div>

          {/* 12. DEVELOPMENT PROFILES SECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Github className="w-5 h-5 text-slate-900" />
                Development Profiles
              </h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* GitHub */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="w-5 h-5 text-slate-900" />
                      <span className="font-extrabold text-sm text-slate-900">GitHub</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                      Connected ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">aarav-khan</p>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Repositories</span>
                      <span className="font-extrabold text-slate-900 text-sm">24</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block">Contributions</span>
                      <span className="font-extrabold text-blue-600 text-sm">312</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Java, Python, TS</span>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View Profile</button>
                </div>
              </div>

              {/* GitLab */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GitCommit className="w-5 h-5 text-orange-600" />
                      <span className="font-extrabold text-sm text-slate-900">GitLab</span>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 rounded text-[10px] font-bold">
                      Not Connected
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium pt-1">
                    Connect your GitLab account to sync data.
                  </p>
                </div>

                <button 
                  onClick={() => setIsConnectPlatformOpen('GitLab')}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  + Connect
                </button>
              </div>

              {/* Bitbucket */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-600" />
                      <span className="font-extrabold text-sm text-slate-900">Bitbucket</span>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 border border-slate-200 rounded text-[10px] font-bold">
                      Not Connected
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium pt-1">
                    Connect your Bitbucket account to sync data.
                  </p>
                </div>

                <button 
                  onClick={() => setIsConnectPlatformOpen('Bitbucket')}
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
                >
                  + Connect
                </button>
              </div>
            </div>
          </div>

          {/* 13 - 15. ROW 3 CONTENT GRID: PROJECTS, EXPERIENCE, ACHIEVEMENTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* 13. MY PROJECTS (Cols 5) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-blue-600" />
                  My Projects
                </h3>
                <div className="flex items-center gap-3">
                  <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                  <button 
                    onClick={() => setIsAddProjectOpen(true)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    + Add Project
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {projectsList.map(proj => (
                  <div key={proj.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{proj.title}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">{proj.category}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        proj.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {proj.status} ({proj.progress}%)
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {proj.tech.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[10px] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 font-bold">
                        <a href={proj.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-700 hover:text-blue-600">
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                        <a href={proj.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      </div>

                      <span className="text-[10px] text-slate-400 font-medium">Updated: {proj.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 14. EXPERIENCE (Cols 4) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Experience
                </h3>
                <div className="flex items-center gap-3">
                  <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                  <button 
                    onClick={() => setIsAddExperienceOpen(true)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors"
                  >
                    + Add Experience
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {experienceList.map(exp => (
                  <div key={exp.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{exp.role}</h4>
                        <p className="text-xs font-bold text-indigo-600">{exp.company}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-[10px] font-bold">
                        {exp.type}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 font-medium">{exp.period}</p>

                    <ul className="space-y-1 text-xs text-slate-600 font-medium pl-3 list-disc">
                      {exp.points.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 15. ACHIEVEMENTS (Cols 3) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  Achievements
                </h3>
                <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 p-2 bg-amber-50/50 border border-amber-200/60 rounded-lg">
                    <Trophy className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Hackathon Winner</h5>
                      <p className="text-[10px] text-slate-500 font-medium">Smart India Hackathon 2026</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 bg-blue-50/50 border border-blue-200/60 rounded-lg">
                    <Medal className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">CodeChef Contest Rank 42</h5>
                      <p className="text-[10px] text-slate-500 font-medium">July Cook-Off 2024</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 bg-emerald-50/50 border border-emerald-200/60 rounded-lg">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">SIH Finalist</h5>
                      <p className="text-[10px] text-slate-500 font-medium">Team Lead</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 bg-purple-50/50 border border-purple-200/60 rounded-lg">
                    <FileText className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Published Research Paper</h5>
                      <p className="text-[10px] text-slate-500 font-medium">ICAIC 2024</p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg border border-slate-200 transition-colors">
                  + Add Achievement
                </button>
              </div>
            </div>
          </div>

          {/* 16 - 19. ROW 4 CONTENT GRID: CERTIFICATIONS, HACKATHONS, RESEARCH, OPEN SOURCE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Certifications */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    Certifications
                  </h4>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
                </div>

                <div className="space-y-2">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">AWS Cloud Practitioner</span>
                      <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-bold">✓ Verified</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Amazon Web Services   Aug 2024</p>
                  </div>

                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Java Programming Certification</span>
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] font-bold">● Student Added</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Oracle   May 2024</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-bold text-xs rounded-lg transition-colors">
                + Add Certification
              </button>
            </div>

            {/* Hackathons */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    Hackathons
                  </h4>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
                </div>

                <div className="space-y-2">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Smart India Hackathon 2026</span>
                      <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-bold">2nd Place</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Team Lead   Mar 2026</p>
                  </div>

                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">FinTech Hackathon</span>
                      <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] font-bold">Top 10</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Team Member   Jan 2025</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-bold text-xs rounded-lg transition-colors">
                + Add Hackathon
              </button>
            </div>

            {/* Research */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    Research
                  </h4>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                  <h5 className="text-xs font-bold text-slate-900 leading-snug">
                    Fraud Detection Using Behavioral Signals
                  </h5>
                  <p className="text-[10px] text-slate-500 font-medium">Research Project   2026</p>
                  <a href="#publication" className="text-[11px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
                    <span>View Publication</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              <button className="w-full py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-bold text-xs rounded-lg transition-colors">
                + Add Research
              </button>
            </div>

            {/* Open Source */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <Github className="w-4 h-4 text-slate-900" />
                    Open Source
                  </h4>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline">View All</button>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-slate-800" />
                    <h5 className="text-xs font-bold text-slate-900">Contributed to Open Source</h5>
                  </div>
                  <p className="text-[11px] text-emerald-600 font-bold">3 Pull Requests Merged</p>
                  <p className="text-[10px] text-slate-400 font-medium">Aug 2024</p>
                </div>
              </div>

              <div className="pt-2 text-center text-[10px] text-slate-400 font-medium">
                Synced automatically via GitHub API
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Edit Profile & Contact Details</h3>
              <button onClick={() => setIsEditProfileOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={e => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Visibility</label>
                <select
                  value={profileData.phoneVisibility}
                  onChange={e => setProfileData({ ...profileData, phoneVisibility: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                >
                  <option>Visible to mentors only</option>
                  <option>Public to institution</option>
                  <option>Private</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Bio</label>
                <textarea
                  rows={3}
                  value={profileData.bio}
                  onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Portfolio URL</label>
                <input
                  type="text"
                  value={profileData.portfolio}
                  onChange={e => setProfileData({ ...profileData, portfolio: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW PROFILE PUBLIC MODAL */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Public Profile Preview</h3>
              </div>
              <button onClick={() => setIsPreviewOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
                  alt="Aarav Khan"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h4 className="text-lg font-black text-slate-900">{profileData.name}</h4>
                  <p className="text-slate-500 font-semibold">{profileData.department} | {profileData.year}</p>
                  <p className="text-slate-400 text-[11px]">{profileData.location}</p>
                </div>
              </div>

              <p className="text-slate-700 font-medium italic bg-white p-3 border rounded-lg">
                "{profileData.bio}"
              </p>

              <div className="space-y-1">
                <span className="font-bold text-slate-900 block">Verified Tech Score:</span>
                <div className="inline-block px-3 py-1 bg-blue-600 text-white font-black text-sm rounded-lg">
                  812 / 1000 (Top 3.1%)
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONNECT PLATFORM MODAL */}
      {isConnectPlatformOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Connect {isConnectPlatformOpen}</h3>
              <button onClick={() => setIsConnectPlatformOpen(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 font-medium">
                Enter your official {isConnectPlatformOpen} username to sync your statistics and profile.
              </p>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Username / Handle</label>
                <input
                  type="text"
                  placeholder="e.g. aarav_cp"
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsConnectPlatformOpen(null)}
                className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setConnectedPlatforms(prev => ({ ...prev, [isConnectPlatformOpen.toLowerCase()]: true }));
                  setIsConnectPlatformOpen(null);
                }}
                className="px-4 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg"
              >
                Sync & Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMyProfile;
