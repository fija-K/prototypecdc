import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, Search, Bell, ChevronDown, BarChart3, Users, MessageSquare, 
  Briefcase, Calendar, MoreVertical, ArrowRight, X, UserCheck, ShieldCheck, 
  Sparkles, Plus, Clock, ExternalLink, LogOut, Code, Paperclip, Send, 
  CheckCheck, Video, FileText, Upload, BookOpen, Star, HelpCircle, AlertCircle, CheckCircle2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'mentor' | 'student';
  senderName: string;
  text: string;
  time: string;
}

export const StudentMentorConnect: React.FC = () => {
  const { logout, setCurrentScreen } = useApp();

  // Active Center Tab
  const [centerTab, setCenterTab] = useState<'messages' | 'support' | 'reviews'>('messages');

  // Chat message state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'mentor',
      senderName: 'Dr. Sharma',
      text: 'How is the REST API project going?',
      time: '10:42 AM'
    },
    {
      id: 'm2',
      sender: 'student',
      senderName: 'Fiza Khan',
      text: "I've completed the authentication part, but I'm having trouble with JWT refresh tokens. Could you guide me on the best approach?",
      time: '10:45 AM'
    },
    {
      id: 'm3',
      sender: 'mentor',
      senderName: 'Dr. Sharma',
      text: "Sure! Send me your current implementation. I'll review it and suggest a few changes.",
      time: '10:47 AM'
    },
    {
      id: 'm4',
      sender: 'student',
      senderName: 'Fiza Khan',
      text: "Great, I'll share the repo link shortly. Thank you! 🙏",
      time: '10:48 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Modals state
  const [isRequestSupportOpen, setIsRequestSupportOpen] = useState(false);
  const [isScheduleMeetingOpen, setIsScheduleMeetingOpen] = useState(false);
  const [isUploadProjectOpen, setIsUploadProjectOpen] = useState(false);
  const [isFullProfileOpen, setIsFullProfileOpen] = useState(false);

  // Form states
  const [supportCategory, setSupportCategory] = useState('Technical Problem');
  const [supportTitle, setSupportTitle] = useState('');
  const [supportDesc, setSupportDesc] = useState('');
  const [supportPriority, setSupportPriority] = useState('Medium');
  const [supportSuccess, setSupportSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      senderName: 'Fiza Khan',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Simulate mentor reply after 1.5s
    setTimeout(() => {
      const mentorReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'mentor',
        senderName: 'Dr. Sharma',
        text: 'Got your message! I will check the details and reply shortly.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, mentorReply]);
    }, 1500);
  };

  const handleCreateSupportRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportTitle.trim()) return;
    setSupportSuccess(true);
    setTimeout(() => {
      setSupportSuccess(false);
      setSupportTitle('');
      setSupportDesc('');
      setIsRequestSupportOpen(false);
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
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider">Your Skills. Our Insights. A Brighter You.</p>
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

          {/* 2. My Groups */}
          <button
            onClick={() => setCurrentScreen('student-groups')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>My Groups</span>
          </button>

          {/* 3. Mentor Connect (Active) */}
          <button
            onClick={() => setCurrentScreen('student-mentor')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-950/50 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-white" />
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
              "Better Guidance Builds Brighter Futures."
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
              placeholder="Search for mentors, messages, topics..."
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
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mentor Connect</h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Connect with your mentor, get feedback, and keep your technical growth on track.
              </p>
            </div>

            {/* Quote Block */}
            <div className="text-right max-w-xs">
              <p className="text-xs text-slate-600 font-medium italic leading-relaxed">
                "A good mentor helps you see what you can be."
              </p>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                — Technical Intelligence
              </p>
            </div>
          </div>

          {/* 5. THREE-COLUMN MAIN GRID LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* COLUMN 1 (LEFT COLUMN - Cols 3): MENTOR PROFILE CARD */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
                {/* Mentor Photo & Header */}
                <div className="text-center space-y-2">
                  <div className="relative inline-block">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt="Dr. Sharma"
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 shadow-xs mx-auto"
                    />
                    <span className="absolute bottom-0 right-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[9px] font-extrabold">
                      ● Available
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Dr. Sharma</h3>
                    <p className="text-xs font-semibold text-slate-500">Mentor</p>
                    <p className="text-[11px] text-indigo-600 font-bold">Web Development Cohort</p>
                  </div>
                </div>

                {/* Expertise */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Expertise</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Backend Development', 'Java', 'Spring Boot', 'REST APIs', 'System Design'].map((exp, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[10px] font-bold">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info List */}
                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-[11px] font-semibold text-slate-500">Students assigned</span>
                    <span className="font-extrabold text-slate-900">24</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-[11px] font-semibold text-slate-500">Next review</span>
                    <span className="font-bold text-slate-800 text-[11px]">Friday, 12 Sep 2025</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-[11px] font-semibold text-slate-500">Preferred contact</span>
                    <span className="font-bold text-slate-800 text-[11px]">In-platform chat</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span className="text-[11px] font-semibold text-slate-500">Response time</span>
                    <span className="font-bold text-emerald-600 text-[11px]">Within 24 hours</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setCenterTab('messages')}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message Mentor</span>
                  </button>

                  <button
                    onClick={() => setIsRequestSupportOpen(true)}
                    className="w-full py-2 bg-blue-50/80 hover:bg-blue-100 text-blue-700 border border-blue-200/80 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Request Support</span>
                  </button>
                </div>
              </div>

              {/* About Dr. Sharma Box */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-2">
                <h4 className="text-xs font-extrabold text-slate-900">About Dr. Sharma</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  "Dr. Sharma is a faculty mentor with 8+ years of experience in full-stack development and enjoys working with students on real-world projects."
                </p>
                <button 
                  onClick={() => setIsFullProfileOpen(true)}
                  className="text-xs font-bold text-blue-600 hover:underline pt-1 inline-flex items-center gap-1"
                >
                  <span>View Full Profile</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* COLUMN 2 (CENTER COLUMN - Cols 5): MESSAGES / COMMUNICATION WORKSPACE */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl shadow-2xs flex flex-col justify-between overflow-hidden min-h-[580px]">
              {/* Center Navigation Tabs Header */}
              <div className="border-b border-slate-200/80 flex items-center justify-between px-5 bg-slate-50/50">
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <button
                    onClick={() => setCenterTab('messages')}
                    className={`py-3.5 flex items-center gap-1.5 border-b-2 transition-all ${
                      centerTab === 'messages'
                        ? 'border-blue-600 text-blue-600 font-bold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Messages</span>
                  </button>

                  <button
                    onClick={() => setCenterTab('support')}
                    className={`py-3.5 flex items-center gap-1.5 border-b-2 transition-all ${
                      centerTab === 'support'
                        ? 'border-blue-600 text-blue-600 font-bold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Support Requests</span>
                  </button>

                  <button
                    onClick={() => setCenterTab('reviews')}
                    className={`py-3.5 flex items-center gap-1.5 border-b-2 transition-all ${
                      centerTab === 'reviews'
                        ? 'border-blue-600 text-blue-600 font-bold'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>Reviews & Feedback</span>
                  </button>
                </div>
              </div>

              {/* CENTER CONTENT BASED ON ACTIVE TAB */}
              {centerTab === 'messages' && (
                <div className="flex-1 flex flex-col justify-between">
                  {/* Chat Conversation Subheader */}
                  <div className="p-3.5 border-b border-slate-100 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                        alt="Dr. Sharma"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Dr. Sharma</h4>
                        <p className="text-[10px] text-slate-400 font-medium">Web Development Cohort</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <button className="p-1 hover:text-slate-600"><Search className="w-4 h-4" /></button>
                      <button className="p-1 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </div>

                  {/* Messages Conversation Feed */}
                  <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-[420px] bg-slate-50/40">
                    {chatMessages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
                      >
                        <div
                          className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs font-medium shadow-2xs leading-relaxed ${
                            msg.sender === 'student'
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold mt-1 px-1">
                          <span>{msg.time}</span>
                          {msg.sender === 'student' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input Bar */}
                  <form onSubmit={handleSendMessage} className="p-3.5 border-t border-slate-200/80 bg-white flex items-center gap-2">
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                    <button
                      type="submit"
                      className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {centerTab === 'support' && (
                <div className="p-5 flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900">Your Support Requests</h4>
                      <p className="text-[10px] text-slate-500">Track and manage your submitted technical support tickets.</p>
                    </div>
                    <button 
                      onClick={() => setIsRequestSupportOpen(true)}
                      className="px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      + Request Support
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-900">JWT Authentication issue</span>
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[10px] font-bold">
                          Status: Open
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Category: Technical Problem • Priority: High</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-900">REST API project code review</span>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[10px] font-bold">
                          Status: Awaiting mentor
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Category: Project Review • Priority: Medium</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-slate-900">Backend internship discussion</span>
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                          Status: Scheduled
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Category: Career / Opportunity • Scheduled: Tomorrow 4:00 PM</p>
                    </div>
                  </div>
                </div>
              )}

              {centerTab === 'reviews' && (
                <div className="p-5 flex-1 space-y-4 overflow-y-auto max-h-[480px]">
                  <h4 className="text-xs font-extrabold text-slate-900">Reviews & Detailed Feedback History</h4>

                  <div className="space-y-3">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold text-slate-900">Web Development Project (Phase 1)</h5>
                        <span className="text-[10px] text-slate-400 font-medium">5 days ago</span>
                      </div>
                      <p className="text-xs text-slate-600 italic">
                        "Good API structure. Improve error handling and add input validation. The authentication flow looks solid."
                      </p>
                      <div className="pt-1 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400">Skills to Focus On:</span>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-[10px] font-bold">Spring Security</span>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-[10px] font-bold">Database Design</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-extrabold text-slate-900">Code Review</h5>
                        <span className="text-[10px] text-slate-400 font-medium">2 weeks ago</span>
                      </div>
                      <p className="text-xs text-slate-600 italic">
                        "Clean code and good use of design patterns. Keep working on writing test cases."
                      </p>
                      <div className="pt-1 flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400">Skills:</span>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-[10px] font-bold">Testing</span>
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded text-[10px] font-bold">Design Patterns</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* COLUMN 3 (RIGHT COLUMN - Cols 4): TASKS, MEETINGS & QUICK ACTIONS */}
            <div className="lg:col-span-4 space-y-5">
              {/* CARD 1: My Tasks & Requests */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    My Tasks & Requests
                  </h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                </div>

                <div className="space-y-2.5">
                  {/* Task 1 */}
                  <div className="p-3 bg-amber-50/50 border border-amber-200/60 rounded-xl flex items-center justify-between gap-3 hover:border-amber-300 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">REST API Project</h4>
                        <p className="text-[10px] font-semibold text-amber-700">Awaiting mentor feedback</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Task 2 */}
                  <div className="p-3 bg-blue-50/50 border border-blue-200/60 rounded-xl flex items-center justify-between gap-3 hover:border-blue-300 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">Implement JWT Authentication</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Assigned by Dr. Sharma</p>
                        <p className="text-[10px] font-bold text-blue-600">Due: Friday, 12 Sep 2025</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>

                  {/* Task 3 */}
                  <div className="p-3 bg-emerald-50/50 border border-emerald-200/60 rounded-xl flex items-center justify-between gap-3 hover:border-emerald-300 cursor-pointer transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">Database Design Discussion</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Support Request</p>
                        <p className="text-[10px] font-bold text-emerald-600">Scheduled • Tomorrow, 4:00 PM</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* CARD 2: Upcoming Meetings */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Upcoming Meetings
                  </h3>
                  <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                </div>

                <div className="p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                      <Video className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 leading-snug">Project Review Session</h4>
                      <p className="text-[11px] font-semibold text-slate-600">Fri, 12 Sep 2025 • 4:00 PM</p>
                      <p className="text-[10px] text-slate-400 font-medium">Google Meet</p>
                    </div>
                  </div>

                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors">
                    Join
                  </button>
                </div>
              </div>

              {/* CARD 3: Quick Actions */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
                <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Quick Actions</h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setIsRequestSupportOpen(true)}
                    className="p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-left text-xs font-bold text-slate-800 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-blue-600" />
                    <span>Request Support</span>
                  </button>

                  <button
                    onClick={() => setIsScheduleMeetingOpen(true)}
                    className="p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-left text-xs font-bold text-slate-800 transition-colors flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>Schedule Meeting</span>
                  </button>

                  <button
                    onClick={() => setIsUploadProjectOpen(true)}
                    className="p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-left text-xs font-bold text-slate-800 transition-colors flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-purple-600" />
                    <span>Upload Project</span>
                  </button>

                  <button
                    onClick={() => {}}
                    className="p-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl text-left text-xs font-bold text-slate-800 transition-colors flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    <span>View Resources</span>
                  </button>
                </div>
              </div>
            </div>

            {/* BOTTOM FULL-WIDTH ROW (Col 12): RECENT FEEDBACK */}
            <div className="lg:col-span-12 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Star className="w-4.5 h-4.5 text-blue-600" />
                  Recent Feedback
                </h3>
                <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Entry 1 */}
                <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">Web Development Project (Phase 1)</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Feedback from Dr. Sharma • 5 days ago</p>
                      </div>

                      <div className="flex items-center gap-1 text-[10px]">
                        <span className="font-bold text-slate-400">Skills to Focus On:</span>
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded font-bold">Spring Security</span>
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded font-bold">Database Design</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 font-medium italic bg-white p-3 border border-slate-200/70 rounded-lg">
                      "Good API structure. Improve error handling and add input validation. The authentication flow looks solid."
                    </p>
                  </div>
                </div>

                {/* Entry 2 */}
                <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Code className="w-4 h-4" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">Code Review</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Feedback from Dr. Sharma • 2 weeks ago</p>
                      </div>

                      <div className="flex items-center gap-1 text-[10px]">
                        <span className="font-bold text-slate-400">Skills to Focus On:</span>
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded font-bold">Testing</span>
                        <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded font-bold">Design Patterns</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 font-medium italic bg-white p-3 border border-slate-200/70 rounded-lg">
                      "Clean code and good use of design patterns. Keep working on writing test cases."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* REQUEST SUPPORT MODAL */}
      {isRequestSupportOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Request Mentor Support</h3>
              </div>
              <button onClick={() => setIsRequestSupportOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {supportSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold text-center">
                Support request submitted successfully to Dr. Sharma!
              </div>
            ) : (
              <form onSubmit={handleCreateSupportRequest} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={supportCategory}
                    onChange={e => setSupportCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                  >
                    <option>Technical Problem</option>
                    <option>Project Review</option>
                    <option>Career / Opportunity</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. JWT Authentication issue"
                    value={supportTitle}
                    onChange={e => setSupportTitle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you need help with..."
                    value={supportDesc}
                    onChange={e => setSupportDesc(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={supportPriority}
                    onChange={e => setSupportPriority(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsRequestSupportOpen(false)}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FULL MENTOR PROFILE MODAL */}
      {isFullProfileOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">Dr. Sharma - Full Profile</h3>
              <button onClick={() => setIsFullProfileOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Dr. Sharma"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <h4 className="text-base font-black text-slate-900">Dr. Sharma</h4>
                  <p className="text-slate-500 font-semibold">Associate Professor, CSE Dept</p>
                  <p className="text-blue-600 font-bold">Web Development Cohort Mentor</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
                <span className="font-bold text-slate-800 block">Biography & Background</span>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Dr. Sharma holds a Ph.D. in Computer Science with a specialization in Distributed Systems and Cloud Architectures. He has mentored over 200+ students in web development, backend engineering, and industry project preparation.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsFullProfileOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMentorConnect;
