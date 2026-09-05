import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, ChevronDown } from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const { currentScreen, searchQuery, setSearchQuery } = useApp();

  const notificationBadge = currentScreen === 'talent-pool' ? 12 : 8;

  return (
    <header className="h-12 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 font-sans select-none">
      {/* Left side spacer / Title indicator */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Institutional Technical Intelligence Portal
        </span>
      </div>

      {/* Right User Controls */}
      <div className="flex items-center gap-4">
        {/* Search Field */}
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search by name, skill, username, technology..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-8 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-normal"
          />
          <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        {/* Notification Bell */}
        <div className="relative cursor-pointer p-1 rounded-full hover:bg-slate-100">
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {notificationBadge}
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 cursor-pointer border-l border-slate-200 pl-3">
          <div className="w-7 h-7 bg-[#0E1726] text-white font-bold text-xs rounded-full flex items-center justify-center">
            CT
          </div>
          <span className="text-xs font-semibold text-slate-800">CTC</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </div>
      </div>
    </header>
  );
};
