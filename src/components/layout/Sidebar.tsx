import React from 'react';
import { useApp, ScreenId } from '../../context/AppContext';
import { 
  LayoutDashboard, Users, UserCheck, FolderGit2, Cpu, 
  BarChart3, Target, LifeBuoy, UserPlus, Award
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  const navigationItems: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: '1. CDC Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'talent-pool', label: '2. Talent Pool', icon: <Users className="w-4 h-4" /> },
    { id: 'student-profile', label: '3. Student Profile', icon: <UserCheck className="w-4 h-4" /> },
    { id: 'groups', label: '4. Groups Management', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'group-intelligence', label: '5. Group Intelligence', icon: <Cpu className="w-4 h-4" /> },
    { id: 'skills-intelligence', label: '6. Skills & Inst. Intelligence', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'opportunities', label: '7. Opportunities & Matching', icon: <Target className="w-4 h-4" /> },
    { id: 'interventions', label: '8. Interventions & Outcomes', icon: <LifeBuoy className="w-4 h-4" /> },
    { id: 'mentor-management', label: '9. Mentor Management', icon: <UserPlus className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen select-none shrink-0 font-sans text-slate-100">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-lg text-white font-bold text-lg shadow-md shadow-indigo-950">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-sm text-slate-100 leading-tight">INSTITUTIONAL CDC</h1>
          <p className="text-[11px] text-indigo-400 font-medium tracking-wide">Technical Intelligence</p>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          CDC Command Center
        </div>
        {navigationItems.map(item => {
          let isActive = currentScreen === item.id;
          if (item.id === 'interventions' && currentScreen === 'intervention-detail') isActive = true;
          if (item.id === 'groups' && currentScreen === 'group-detail') isActive = true;
          if (item.id === 'opportunities' && currentScreen === 'opportunity-detail') isActive = true;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* User & Environment Scope */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-[11px] font-semibold text-slate-300">GLBITM CDC/CTC Portal</span>
          <button
            onClick={() => setCurrentScreen('login')}
            className="px-2 py-0.5 text-[10px] font-bold bg-[#008ca5]/20 text-teal-300 border border-[#008ca5]/40 rounded hover:bg-[#008ca5]/40 transition-colors"
            title="Return to Login Screen"
          >
            Lock / Switch Role
          </button>
        </div>
        <p className="text-[10px] text-slate-500">
          Data Model: Multi-Platform Sync (GitHub, LeetCode, CF, GFG)
        </p>
      </div>
    </aside>
  );
};
