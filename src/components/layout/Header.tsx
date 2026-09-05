import React from 'react';
import { useApp } from '../../context/AppContext';
import { Department, AcademicYear, Batch } from '../../types';
import { RefreshCw, Search, Sparkles, Filter, Building2 } from 'lucide-react';
import { INSTITUTIONAL_SUMMARY } from '../../data/mockData';

export const Header: React.FC = () => {
  const {
    deptFilter, setDeptFilter,
    yearFilter, setYearFilter,
    batchFilter, setBatchFilter,
    searchQuery, setSearchQuery,
    clearFilters
  } = useApp();

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
      {/* Scope & Hierarchy Selector */}
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-medium bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Building2 className="w-4 h-4 text-indigo-400" />
          <span>National Institute of Tech & Sciences</span>
        </div>

        {/* Global Filters */}
        <div className="flex items-center gap-2">
          {/* Department */}
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value as Department | 'ALL')}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 font-medium"
          >
            <option value="ALL">All Depts</option>
            <option value="CSE">CSE (Computer Science)</option>
            <option value="IT">IT (Information Tech)</option>
            <option value="AI_DS">AI & DS (AI / Data Science)</option>
            <option value="ECE">ECE (Electronics)</option>
            <option value="ME">ME (Mechanical)</option>
          </select>

          {/* Year */}
          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value as AcademicYear | 'ALL')}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 font-medium"
          >
            <option value="ALL">All Years</option>
            <option value="4th Year">4th Year (2025)</option>
            <option value="3rd Year">3rd Year (2026)</option>
            <option value="2nd Year">2nd Year (2027)</option>
            <option value="1st Year">1st Year (2028)</option>
          </select>

          {(deptFilter !== 'ALL' || yearFilter !== 'ALL' || batchFilter !== 'ALL') && (
            <button
              onClick={clearFilters}
              className="text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1 font-medium px-2 py-1 bg-slate-800/60 rounded"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Sync Status & Action Bar */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search student, skill, roll..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>

        {/* Sync Status */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800">
          <RefreshCw className="w-3 h-3 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Synced: {INSTITUTIONAL_SUMMARY.lastSyncTime}</span>
        </div>
      </div>
    </header>
  );
};
