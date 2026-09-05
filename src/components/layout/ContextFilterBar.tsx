import React from 'react';
import { useApp } from '../../context/AppContext';
import { Department, AcademicYear, Batch } from '../../types';
import { User, ChevronDown, RefreshCw } from 'lucide-react';

export const ContextFilterBar: React.FC = () => {
  const {
    deptFilter, setDeptFilter,
    yearFilter, setYearFilter,
    batchFilter, setBatchFilter
  } = useApp();

  return (
    <div className="bg-[#F8FAFC] border-b border-slate-200 px-6 py-2 flex items-center justify-between shrink-0 font-sans text-xs select-none">
      {/* Left Filter Dropdowns */}
      <div className="flex items-center gap-6">
        {/* Institution */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="p-1 bg-blue-50 text-blue-600 rounded-md">
            <User className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight block leading-tight">Institution</span>
            <div className="flex items-center gap-1 font-bold text-slate-800 text-xs">
              <span>GL Bajaj College of Engineering</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800" />
            </div>
          </div>
        </div>

        {/* Department Dropdown */}
        <div className="cursor-pointer group">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight block leading-tight">Department</span>
          <div className="flex items-center gap-1 font-semibold text-slate-700 text-xs">
            <select
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value as Department | 'ALL')}
              className="bg-transparent border-none p-0 pr-1 text-slate-800 font-bold focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AI_DS">AIML</option>
              <option value="ECE">ECE</option>
              <option value="ME">MECH</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>

        {/* Batch Dropdown */}
        <div className="cursor-pointer group border-l border-slate-200 pl-6">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight block leading-tight">Batch</span>
          <div className="flex items-center gap-1 font-semibold text-slate-700 text-xs">
            <select
              value={batchFilter}
              onChange={e => setBatchFilter(e.target.value as Batch | 'ALL')}
              className="bg-transparent border-none p-0 pr-1 text-slate-800 font-bold focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Batches</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>

        {/* Time Period Dropdown */}
        <div className="cursor-pointer group border-l border-slate-200 pl-6">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight block leading-tight">Time Period</span>
          <div className="flex items-center gap-1 font-bold text-slate-800 text-xs">
            <span>This Month <span className="font-normal text-slate-500">(Aug 1 – Aug 31)</span></span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Right Sync Status */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
        <span>Last synced: 12 min ago</span>
        <RefreshCw className="w-3.5 h-3.5 text-slate-400 hover:text-slate-700 cursor-pointer ml-1" />
      </div>
    </div>
  );
};
