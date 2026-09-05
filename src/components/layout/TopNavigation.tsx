import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, ChevronDown, LogOut, KeyRound } from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const { currentScreen, searchQuery, setSearchQuery, user, logout, setCurrentScreen } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);

  const notificationBadge = currentScreen === 'talent-pool' ? 12 : 8;

  return (
    <header className="h-12 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 font-sans select-none relative z-30">
      {/* Left side spacer / Title indicator */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          GLBITM Technical Intelligence Portal
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
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-8 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#008ca5] font-normal"
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

        {/* User Profile & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 border-l border-slate-200 pl-3 focus:outline-none hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 bg-[#008ca5] text-white font-bold text-xs rounded-full flex items-center justify-center shadow-xs">
              {user?.role === 'CDC' ? 'CD' : user?.role === 'Mentor' ? 'DR' : 'AS'}
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-slate-800 block leading-none">{user?.name || 'CDC Officer'}</span>
              <span className="text-[10px] text-[#008ca5] font-semibold">{user?.role || 'CDC'} Role</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-800">{user?.name}</p>
                <p className="text-[10px] text-slate-500">{user?.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  setCurrentScreen('login');
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#008ca5]" />
                <span>Switch Role / Login</span>
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
                className="w-full text-left px-3 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-bold border-t border-slate-100"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
