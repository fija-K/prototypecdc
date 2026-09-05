import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreateGroupModal } from '../layout/ActionModals';
import { 
  FolderGit2, Plus, Users, LayoutGrid, CheckCircle2, LifeBuoy, 
  Search, Filter, ChevronDown, Bookmark, MoreVertical, ExternalLink, 
  UserCheck, Zap, Grid, List, Layers
} from 'lucide-react';

export const Groups: React.FC = () => {
  const { groups, navigateToGroup } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'my-groups' | 'assigned' | 'system' | 'archived'>('my-groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [purposeFilter, setPurposeFilter] = useState<string>('ALL');
  const [ownerFilter, setOwnerFilter] = useState<string>('ALL');
  const [deptFilter, setDeptFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('updated');

  const filteredGroups = groups.filter(g => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = g.name.toLowerCase().includes(q);
      const matchPurpose = g.purpose.toLowerCase().includes(q);
      const matchOwner = g.owner.toLowerCase().includes(q);
      if (!matchName && !matchPurpose && !matchOwner) return false;
    }
    if (purposeFilter !== 'ALL' && g.purpose !== purposeFilter) return false;
    if (ownerFilter !== 'ALL' && g.owner !== ownerFilter) return false;
    if (activeTab === 'assigned' && g.owner === 'System') return false;
    if (activeTab === 'system' && g.purpose !== 'System Segment') return false;
    return true;
  });

  return (
    <div className="p-6 space-y-5 bg-[#F8FAFC] min-h-screen font-sans text-slate-800 select-none pb-20">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Groups</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Organize, manage and monitor student populations.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-xs">
            <Bookmark className="w-3.5 h-3.5 text-slate-500" />
            <span>Saved Views</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Create Group Button + Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCreateDropdownOpen(!isCreateDropdownOpen)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create Group</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>

            {isCreateDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-1 w-64 rounded-xl bg-white border border-slate-200 shadow-xl z-30 p-1.5 text-xs font-sans space-y-1">
                <button
                  onClick={() => { setIsCreateDropdownOpen(false); setIsCreateModalOpen(true); }}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-start gap-2.5 transition-colors"
                >
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md shrink-0 mt-0.5">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Create from Selection</strong>
                    <span className="text-[11px] text-slate-500 block leading-tight">Add selected students to a new group</span>
                  </div>
                </button>

                <button
                  onClick={() => { setIsCreateDropdownOpen(false); setIsCreateModalOpen(true); }}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-50 flex items-start gap-2.5 transition-colors"
                >
                  <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md shrink-0 mt-0.5">
                    <Filter className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Create from Filters</strong>
                    <span className="text-[11px] text-slate-500 block leading-tight">Define rules and let system find students</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-xs font-semibold select-none pt-1">
        <button
          onClick={() => setActiveTab('my-groups')}
          className={`py-2.5 px-1 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'my-groups' ? 'text-blue-600 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900 border-transparent'
          }`}
        >
          <span>My Groups</span>
          <span className="bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded text-[10px]">8</span>
        </button>

        <button
          onClick={() => setActiveTab('assigned')}
          className={`py-2.5 px-1 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'assigned' ? 'text-blue-600 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900 border-transparent'
          }`}
        >
          <span>Assigned to Me</span>
          <span className="bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded text-[10px]">3</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`py-2.5 px-1 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'system' ? 'text-blue-600 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900 border-transparent'
          }`}
        >
          <span>System Segments</span>
          <span className="bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded text-[10px]">6</span>
        </button>

        <button
          onClick={() => setActiveTab('archived')}
          className={`py-2.5 px-1 border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'archived' ? 'text-blue-600 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900 border-transparent'
          }`}
        >
          <span>Archived</span>
          <span className="bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded text-[10px]">4</span>
        </button>
      </div>

      {/* 3. Top 4 KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Groups */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Total Groups</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">17</span>
            <span className="text-[11px] text-slate-400 block font-medium">Across all categories</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <LayoutGrid className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Total Students */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Total Students</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">1,842</span>
            <span className="text-[11px] text-slate-400 block font-medium">In all groups</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Active Groups */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Active Groups</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">11</span>
            <span className="text-[11px] text-slate-400 block font-medium">Currently active</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Interventions */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Interventions</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">3</span>
            <span className="text-[11px] text-slate-400 block font-medium">Ongoing in groups</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <LifeBuoy className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4. Filter & Search Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-1">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by group name, purpose, owner..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
          <select
            value={purposeFilter}
            onChange={e => setPurposeFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none shadow-xs"
          >
            <option value="ALL">All Purposes</option>
            <option value="Placement">Placement</option>
            <option value="Training">Training</option>
            <option value="Hackathon">Hackathon</option>
            <option value="System Segment">System Segment</option>
          </select>

          <select
            value={ownerFilter}
            onChange={e => setOwnerFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none shadow-xs"
          >
            <option value="ALL">All Owners</option>
            <option value="CTC">CTC</option>
            <option value="System">System</option>
          </select>

          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none shadow-xs"
          >
            <option value="ALL">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
          </select>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none shadow-xs"
          >
            <option value="updated">Sort by: Last Updated</option>
            <option value="name">Sort by: Name</option>
            <option value="students">Sort by: Student Count</option>
          </select>

          <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5 shadow-xs">
            <button className="p-1 text-slate-700 bg-slate-100 rounded"><Grid className="w-4 h-4" /></button>
            <button className="p-1 text-slate-400 hover:text-slate-700"><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* 5. Group Cards Grid (8 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredGroups.map(group => {
          const totalSt = group.studentCount || group.studentIds.length || 63;
          const activeCnt = group.activeCount || 48;
          const stableCnt = group.stableCount || 11;
          const attentionCnt = group.attentionCount || 4;
          const mentorsCnt = group.mentorIds.length || (group.owner === 'System' ? 0 : 3);

          return (
            <div
              key={group.id}
              onClick={() => navigateToGroup(group.id)}
              className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-xl p-4 space-y-3.5 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header line: Title & Badge */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug hover:text-blue-600 transition-colors">
                    {group.name}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                    group.statusBadge === 'Intervention' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    group.statusBadge === 'Draft' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {group.statusBadge || 'Active'}
                  </span>
                </div>

                {/* Subtitle / Metadata */}
                <p className="text-[11px] text-slate-500 font-medium">
                  {group.subtitle || `${group.purpose} • ${group.department || 'CSE'} • ${group.year || '3rd Year'}`}
                </p>

                {/* Key Metrics row */}
                <div className="grid grid-cols-3 gap-2 py-1 border-y border-slate-100 font-sans text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Students</span>
                    <span className="font-bold text-slate-900 block text-sm">{totalSt}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {group.targetScore ? 'Avg DSA' : group.devScore ? 'Avg Dev' : group.readinessPercent ? 'Avg Score' : group.projectsCount ? 'Projects' : 'Avg Score'}
                    </span>
                    <span className="font-bold text-slate-900 block text-sm">
                      {group.targetScore || group.devScore || group.readinessPercent ? (group.targetScore || group.devScore || group.readinessPercent) : group.projectsCount ? group.projectsCount : group.avgScore}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">
                      {group.growthRate ? 'Growth (30D)' : group.targetScore ? 'Target' : group.readinessPercent ? 'Readiness' : 'Progress'}
                    </span>
                    <span className={`font-bold block text-sm ${group.growthRate && group.growthRate >= 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {group.growthRate ? `+${group.growthRate}%` : group.targetScore ? group.targetScore : group.readinessPercent ? `${group.readinessPercent}%` : `${group.progressPercent || 64}%`}
                    </span>
                  </div>
                </div>

                {/* Distribution Dots Pill */}
                {group.statusBadge === 'Intervention' ? (
                  <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                      <span>124 In Progress</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span>42 Completed</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span>{activeCnt} Active</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                      <span>{stableCnt} Stable</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
                      <span>{attentionCnt} Attention</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>
                  Owner: {group.owner} <span className="text-slate-300">•</span> {mentorsCnt > 0 ? `${mentorsCnt} Mentor${mentorsCnt > 1 ? 's' : ''}` : '--'} <span className="text-slate-300">•</span> Updated {group.updatedAt}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateToGroup(group.id); }}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 6. Bottom "About Groups" Informational Banner */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4 pt-4 mt-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-sm">About Groups</h3>
          <a href="#learn" className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1">
            <span>Learn more about groups</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Static Groups */}
          <div className="flex items-start gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
            <div className="p-2 bg-blue-100/70 text-blue-700 rounded-lg shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold text-slate-900 mb-0.5">Static Groups</strong>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Manually selected students. Membership remains same until you change it.
              </p>
            </div>
          </div>

          {/* Dynamic Groups */}
          <div className="flex items-start gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
            <div className="p-2 bg-emerald-100/70 text-emerald-700 rounded-lg shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold text-slate-900 mb-0.5">Dynamic Groups</strong>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Students are added or removed automatically based on defined rules.
              </p>
            </div>
          </div>

          {/* System Segments */}
          <div className="flex items-start gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
            <div className="p-2 bg-purple-100/70 text-purple-700 rounded-lg shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold text-slate-900 mb-0.5">System Segments</strong>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Automatically created by the system to help you monitor important populations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      <CreateGroupModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
};
