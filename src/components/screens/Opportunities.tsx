import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreateOpportunityModal } from '../layout/ActionModals';
import { 
  Target, Briefcase, UserCheck, Users, Trophy, TrendingUp, 
  Search, Filter, ChevronDown, Bookmark, Plus, Calendar, 
  MoreVertical, ArrowRight, Grid, List, Check, Compass, BarChart3,
  ExternalLink, Layers, Sparkles, AlertTriangle, Info
} from 'lucide-react';
import { OpportunityCategory } from '../../types';

// Company logo badges map
const COMPANY_LOGOS: Record<string, { bg: string; text: string; label: string }> = {
  'Microsoft': { bg: 'bg-blue-600', text: 'text-white', label: 'MS' },
  'Google': { bg: 'bg-red-500', text: 'text-white', label: 'G' },
  'NVIDIA': { bg: 'bg-emerald-600', text: 'text-white', label: 'NV' },
  'Govt. of India': { bg: 'bg-amber-600', text: 'text-white', label: 'IN' },
  'Amazon': { bg: 'bg-slate-900', text: 'text-amber-400', label: 'az' },
  'Flipkart': { bg: 'bg-amber-400', text: 'text-blue-900', label: 'fk' },
  'Adobe': { bg: 'bg-red-600', text: 'text-white', label: 'A' },
  'TCS': { bg: 'bg-purple-700', text: 'text-white', label: 'TCS' },
  'Oracle': { bg: 'bg-rose-600', text: 'text-white', label: 'OR' },
  'Atlassian': { bg: 'bg-blue-700', text: 'text-white', label: 'AT' },
  'Uber': { bg: 'bg-black', text: 'text-white', label: 'UB' },
  'Infosys': { bg: 'bg-blue-800', text: 'text-white', label: 'INF' },
  'CDC Academy': { bg: 'bg-indigo-600', text: 'text-white', label: 'CDC' },
};

export const Opportunities: React.FC = () => {
  const { opportunities, navigateToOpportunity } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('deadline');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Category counts
  const categoryCounts = {
    All: opportunities.length,
    Placements: opportunities.filter(o => o.type === 'Placement').length || 12,
    Internships: opportunities.filter(o => o.type === 'Internship').length || 8,
    Hackathons: opportunities.filter(o => o.type === 'Hackathon').length || 4,
    Training: opportunities.filter(o => o.type === 'Training').length || 2,
    Research: opportunities.filter(o => o.type === 'Research').length || 1,
    Competitions: opportunities.filter(o => o.type === 'Competition').length || 1,
  };

  // Filtered dataset
  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab !== 'All') {
      const singularTab = activeTab.slice(0, -1); // e.g. Placements -> Placement
      if (opp.type !== activeTab && !opp.type.includes(singularTab)) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = opp.title.toLowerCase().includes(q);
      const matchCompany = opp.company.toLowerCase().includes(q);
      const matchType = opp.type.toLowerCase().includes(q);
      if (!matchTitle && !matchCompany && !matchType) return false;
    }
    if (statusFilter !== 'ALL' && opp.status !== statusFilter) return false;
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedRowIds.length === filteredOpportunities.length) {
      setSelectedRowIds([]);
    } else {
      setSelectedRowIds(filteredOpportunities.map(o => o.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRowIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 space-y-5 bg-[#F8FAFC] min-h-screen font-sans text-slate-800 select-none pb-24">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Opportunities & Matching</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Manage placement opportunities, match the right talent, and drive student success.
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-xs">
            <Bookmark className="w-3.5 h-3.5 text-slate-500" />
            <span>Saved Views</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Create Opportunity Button */}
          <div className="relative">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Create Opportunity</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top 5 KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-sans">
        {/* Card 1: Total Opportunities */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Total Opportunities</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">28</span>
            <span className="text-[10px] text-slate-400 block font-medium">Across all categories</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 2: Active Opportunities */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Active Opportunities</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">18</span>
            <span className="text-[10px] text-slate-400 block font-medium">Currently open</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 3: Total Students Matched */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Total Students Matched</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">1,246</span>
            <span className="text-[10px] text-slate-400 block font-medium">Across all opportunities</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 4: Students Placed */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Students Placed</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">312</span>
            <span className="text-[10px] text-slate-400 block font-medium">This academic year</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Trophy className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Card 5: Placement Conversion */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight block">Placement Conversion</span>
            <span className="text-2xl font-bold text-slate-900 font-sans block">26%</span>
            <span className="text-[10px] text-emerald-600 block font-bold">↑ 8% vs last year</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>

      {/* 3. Category Tabs & View Calendar Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold select-none">
          {[
            { label: 'All', count: categoryCounts.All },
            { label: 'Placements', count: categoryCounts.Placements },
            { label: 'Internships', count: categoryCounts.Internships },
            { label: 'Hackathons', count: categoryCounts.Hackathons },
            { label: 'Training', count: categoryCounts.Training },
            { label: 'Research', count: categoryCounts.Research },
            { label: 'Competitions', count: categoryCounts.Competitions },
          ].map(tab => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === tab.label
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1.5 self-end sm:self-auto">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>View Calendar</span>
        </button>
      </div>

      {/* 4. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-1">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search opportunities by title, company, role..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs"
          />
        </div>

        {/* Filter Dropdowns & Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none shadow-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
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
            <option value="AIML">AIML</option>
          </select>

          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none shadow-xs"
          >
            <option value="ALL">All Years</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 font-medium focus:outline-none shadow-xs"
          >
            <option value="deadline">Sort by: Deadline (Soonest)</option>
            <option value="eligible">Sort by: Eligible Students</option>
            <option value="strong">Sort by: Strong Matches</option>
          </select>

          {/* List / Grid Toggle */}
          <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5 shadow-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-700'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-700'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Selected Action Bar */}
      {selectedRowIds.length > 0 && (
        <div className="p-2.5 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs shadow-lg animate-in fade-in">
          <span className="font-semibold text-slate-200 pl-2">
            {selectedRowIds.length} opportunity selected
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded font-semibold">Archive</button>
            <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded font-semibold">Export CSV</button>
            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded font-semibold">Change Status</button>
          </div>
        </div>
      )}

      {/* 5. Main Opportunities Container (List View or Grid View) */}
      {viewMode === 'list' ? (
        <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs font-sans text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRowIds.length === filteredOpportunities.length && filteredOpportunities.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="p-3">Opportunity</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Type</th>
                  <th className="p-3 text-center">Eligible Students</th>
                  <th className="p-3 text-center">Strong Matches</th>
                  <th className="p-3 text-center">Potential Matches</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredOpportunities.map(opp => {
                  const logoMeta = COMPANY_LOGOS[opp.company] || { bg: 'bg-slate-800', text: 'text-white', label: opp.company.substring(0, 2).toUpperCase() };
                  const isSelected = selectedRowIds.includes(opp.id);

                  return (
                    <tr
                      key={opp.id}
                      onClick={() => navigateToOpportunity(opp.id)}
                      className={`hover:bg-slate-50/90 cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-3 text-center" onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(opp.id)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>

                      {/* Opportunity Title & Subtitle */}
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${logoMeta.bg} ${logoMeta.text} flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-xs`}>
                            {logoMeta.label}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs hover:text-blue-600 transition-colors leading-tight">
                              {opp.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">{opp.subtitle || opp.company}</p>
                          </div>
                        </div>
                      </td>

                      {/* Company Name */}
                      <td className="p-3 font-semibold text-slate-800">{opp.company}</td>

                      {/* Type Badge */}
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          opp.type === 'Internship' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          opp.type === 'Placement' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          opp.type === 'Hackathon' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          opp.type === 'Research' ? 'bg-teal-50 text-teal-700 border border-teal-200' :
                          opp.type === 'Competition' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                          'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {opp.type}
                        </span>
                      </td>

                      {/* Counts */}
                      <td className="p-3 text-center font-mono font-bold text-slate-800">
                        {opp.matchedCandidatesCount.eligible}
                      </td>

                      <td className="p-3 text-center font-mono">
                        <span className="font-bold text-blue-600 underline cursor-pointer hover:text-blue-800">
                          {opp.matchedCandidatesCount.strong}
                        </span>
                      </td>

                      <td className="p-3 text-center font-mono font-bold text-slate-700">
                        {opp.matchedCandidatesCount.potential}
                      </td>

                      {/* Deadline */}
                      <td className="p-3">
                        <div className="font-mono">
                          <span className="font-bold text-slate-900 block text-xs">{opp.deadline}</span>
                          <span className="text-[10px] text-rose-600 font-semibold block">{opp.relativeDeadline || 'In 18 days'}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          opp.status === 'Upcoming' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          opp.status === 'Draft' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                          'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {opp.status || 'Active'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right" onClick={e => e.stopPropagation()}>
                        <div className="relative inline-block">
                          <button
                            onClick={() => setActiveActionMenuId(activeActionMenuId === opp.id ? null : opp.id)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeActionMenuId === opp.id && (
                            <div className="origin-top-right absolute right-0 mt-1 w-44 rounded-xl bg-white border border-slate-200 shadow-xl z-30 p-1 text-xs font-sans space-y-0.5 text-left">
                              <button onClick={() => { setActiveActionMenuId(null); navigateToOpportunity(opp.id); }} className="w-full px-2 py-1.5 rounded hover:bg-slate-50 text-slate-700 font-medium">View Opportunity</button>
                              <button onClick={() => setActiveActionMenuId(null)} className="w-full px-2 py-1.5 rounded hover:bg-slate-50 text-slate-700 font-medium">Edit Opportunity</button>
                              <button onClick={() => { setActiveActionMenuId(null); navigateToOpportunity(opp.id); }} className="w-full px-2 py-1.5 rounded hover:bg-slate-50 text-slate-700 font-medium">View Candidates</button>
                              <button onClick={() => setActiveActionMenuId(null)} className="w-full px-2 py-1.5 rounded hover:bg-slate-50 text-slate-700 font-medium">Create Candidate Pool</button>
                              <button onClick={() => setActiveActionMenuId(null)} className="w-full px-2 py-1.5 rounded hover:bg-slate-50 text-rose-600 font-medium border-t border-slate-100">Archive</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Showing 1 - {filteredOpportunities.length} of {opportunities.length} opportunities</span>
            <div className="flex items-center gap-1 font-mono">
              <button className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100">&lt;</button>
              <button className="px-2.5 py-1 bg-blue-600 text-white rounded font-bold">1</button>
              <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100">2</button>
              <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100">3</button>
              <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100">4</button>
              <button className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-100">&gt;</button>
            </div>
          </div>
        </div>
      ) : (
        /* Grid View Alternative */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredOpportunities.map(opp => {
            const logoMeta = COMPANY_LOGOS[opp.company] || { bg: 'bg-slate-800', text: 'text-white', label: opp.company.substring(0, 2).toUpperCase() };

            return (
              <div
                key={opp.id}
                onClick={() => navigateToOpportunity(opp.id)}
                className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-xl p-4 space-y-3 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-lg ${logoMeta.bg} ${logoMeta.text} flex items-center justify-center font-bold text-xs font-mono shadow-xs`}>
                      {logoMeta.label}
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-semibold">
                      {opp.status || 'Active'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-sm hover:text-blue-600 transition-colors leading-tight">{opp.title}</h3>
                    <p className="text-xs text-slate-500">{opp.company}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-1 p-2 bg-slate-50 rounded-lg text-center font-mono text-[11px]">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-sans block">Eligible</span>
                      <strong className="text-slate-800">{opp.matchedCandidatesCount.eligible}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-sans block">Strong</span>
                      <strong className="text-blue-600">{opp.matchedCandidatesCount.strong}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-sans block">Potential</span>
                      <strong className="text-slate-700">{opp.matchedCandidatesCount.potential}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{opp.deadline}</span>
                  <span className="text-rose-600 font-bold">{opp.relativeDeadline || 'In 18 days'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. Bottom "How Opportunities & Matching Works" Workflow Banner */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4 pt-4 mt-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-slate-900 text-sm">How Opportunities & Matching Works</h3>
            <Info className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <a href="#matching-methodology" className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1">
            <span>Learn more about the matching methodology</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans">
          {/* Step 1 */}
          <div className="flex-1 flex items-start gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl w-full">
            <div className="p-2.5 bg-purple-100/70 text-purple-700 rounded-lg shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold text-slate-900 text-xs mb-0.5">1. Define Opportunity</strong>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Set eligibility criteria and technical requirements.
              </p>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 hidden md:block shrink-0" />

          {/* Step 2 */}
          <div className="flex-1 flex items-start gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl w-full">
            <div className="p-2.5 bg-emerald-100/70 text-emerald-700 rounded-lg shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold text-slate-900 text-xs mb-0.5">2. Match Students</strong>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Find and rank the best candidates using technical intelligence.
              </p>
            </div>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-400 hidden md:block shrink-0" />

          {/* Step 3 */}
          <div className="flex-1 flex items-start gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl w-full">
            <div className="p-2.5 bg-amber-100/70 text-amber-700 rounded-lg shrink-0">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <strong className="block font-bold text-slate-900 text-xs mb-0.5">3. Take Action</strong>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Create candidate pools, interventions, and track outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      <CreateOpportunityModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
};
