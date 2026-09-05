import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TALENT_STUDENTS_MOCK, ALL_TALENT_STUDENTS, TalentStudent } from '../../data/mockData';
import { SaveViewModal } from '../common/SaveViewModal';
import { ColumnSelectorDropdown, ColumnVisibility } from '../common/ColumnSelectorDropdown';
import { StudentRowMenu } from '../common/StudentRowMenu';
import { CreateGroupModal, CreateInterventionModal } from '../layout/ActionModals';
import { 
  Bookmark, Plus, ChevronDown, GraduationCap, Code, Star, 
  TrendingUp, Gauge, Circle, X, Info, ArrowUpDown, Filter, 
  Users, FolderPlus, Target, LifeBuoy, Download, Trash2, Check, ArrowRight
} from 'lucide-react';

export const TalentPool: React.FC = () => {
  const { navigateToStudent, setCurrentScreen, searchQuery } = useApp();

  // Filter States
  const [deptFilter, setDeptFilter] = useState<string>('CSE');
  const [yearFilter, setYearFilter] = useState<string>('3rd Year');
  const [batchFilter, setBatchFilter] = useState<string>('2026');
  const [sectionFilter, setSectionFilter] = useState<string>('All');

  const [techScoreFilter, setTechScoreFilter] = useState<string>('700 - 1000');
  const [dsaFilter, setDsaFilter] = useState<string>('Strong');
  const [devFilter, setDevFilter] = useState<string>('All');
  const [cpFilter, setCpFilter] = useState<string>('All');

  const [primarySkillFilter, setPrimarySkillFilter] = useState<string>('All');
  const [techToolFilter, setTechToolFilter] = useState<string>('All');
  const [skillStrengthFilter, setSkillStrengthFilter] = useState<string>('All');

  const [growthFilter, setGrowthFilter] = useState<string>('> 10%');
  const [activityFilter, setActivityFilter] = useState<string>('All');
  const [consistencyFilter, setConsistencyFilter] = useState<string>('All');
  const [lastActiveFilter, setLastActiveFilter] = useState<string>('All');

  const [readinessFilter, setReadinessFilter] = useState<string>('All');
  const [eligibilityFilter, setEligibilityFilter] = useState<string>('All');

  const [genderFilter, setGenderFilter] = useState<string>('All');
  const [platformFilter, setPlatformFilter] = useState<string>('All');

  // Sorting State
  const [sortBy, setSortBy] = useState<string>('Growth (High to Low)');

  // Selection State (pre-selected top 3 rows like in reference screenshot)
  const [selectedIds, setSelectedIds] = useState<string[]>(['ts1', 'ts2', 'ts3']);

  // Modals & Menus
  const [isSavedViewsOpen, setIsSavedViewsOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);

  // Column Visibility
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    department: true,
    year: true,
    batch: true,
    techScore: true,
    growth: true,
    keySkills: true,
    activity: true,
    consistency: true,
    status: true,
    lastActive: true,
  });

  const toggleColumn = (key: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Saved Views Loader
  const loadSavedView = (viewName: string) => {
    setIsSavedViewsOpen(false);
    switch (viewName) {
      case 'High Potential':
        setDeptFilter('All'); setYearFilter('All'); setBatchFilter('All');
        setTechScoreFilter('800 - 1000'); setDsaFilter('Strong'); setGrowthFilter('All');
        break;
      case 'High Growth':
        setDeptFilter('All'); setYearFilter('All'); setBatchFilter('All');
        setTechScoreFilter('All'); setDsaFilter('All'); setGrowthFilter('> 15%');
        break;
      case 'Final Year Placement Pool':
        setDeptFilter('All'); setYearFilter('4th Year'); setBatchFilter('2025');
        setTechScoreFilter('All'); setDsaFilter('All'); setGrowthFilter('All');
        break;
      case 'Strong DSA':
        setDeptFilter('All'); setYearFilter('All'); setBatchFilter('All');
        setDsaFilter('Strong'); setTechScoreFilter('All'); setGrowthFilter('All');
        break;
      case 'Needs Attention':
        setDeptFilter('All'); setYearFilter('All'); setBatchFilter('All');
        setTechScoreFilter('< 600'); setDsaFilter('All'); setGrowthFilter('All');
        break;
      default:
        // Default state matching reference image
        setDeptFilter('CSE'); setYearFilter('3rd Year'); setBatchFilter('2026');
        setTechScoreFilter('700 - 1000'); setDsaFilter('Strong'); setGrowthFilter('> 10%');
    }
  };

  const clearAllFilters = () => {
    setDeptFilter('All');
    setYearFilter('All');
    setBatchFilter('All');
    setSectionFilter('All');
    setTechScoreFilter('All');
    setDsaFilter('All');
    setDevFilter('All');
    setCpFilter('All');
    setPrimarySkillFilter('All');
    setTechToolFilter('All');
    setSkillStrengthFilter('All');
    setGrowthFilter('All');
    setActivityFilter('All');
    setConsistencyFilter('All');
    setLastActiveFilter('All');
    setReadinessFilter('All');
    setEligibilityFilter('All');
    setGenderFilter('All');
    setPlatformFilter('All');
  };

  // Filter dynamic logic
  const filteredStudents = ALL_TALENT_STUDENTS.filter(student => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = student.name.toLowerCase().includes(q);
      const matchUser = student.username.toLowerCase().includes(q);
      const matchSkills = (student.keySkillsLine1 + ' ' + student.keySkillsLine2).toLowerCase().includes(q);
      if (!matchName && !matchUser && !matchSkills) return false;
    }

    if (deptFilter !== 'All' && student.dept !== deptFilter) return false;
    if (yearFilter !== 'All' && student.year !== yearFilter) return false;
    if (batchFilter !== 'All' && student.batch !== batchFilter) return false;

    if (techScoreFilter === '700 - 1000' && student.techScore < 680) return false;
    if (techScoreFilter === '800 - 1000' && student.techScore < 800) return false;
    if (techScoreFilter === '< 600' && student.techScore >= 600) return false;

    if (dsaFilter !== 'All' && student.dsaStrength !== dsaFilter) return false;
    if (growthFilter === '> 10%' && student.growth <= 9) return false;
    if (growthFilter === '> 15%' && student.growth <= 15) return false;

    return true;
  });

  // Sorting
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'Growth (High to Low)') return b.growth - a.growth;
    if (sortBy === 'Score (High to Low)') return b.techScore - a.techScore;
    if (sortBy === 'Consistency (High to Low)') return b.consistency - a.consistency;
    return 0;
  });

  // Row selection
  const isAllSelected = selectedIds.length === sortedStudents.length && sortedStudents.length > 0;
  const handleSelectAll = () => {
    if (isAllSelected) setSelectedIds([]);
    else setSelectedIds(sortedStudents.map(s => s.id));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="p-6 space-y-4 bg-[#F8FAFC] min-h-screen font-sans text-slate-800 select-none pb-24">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Talent Pool</h1>
          <p className="text-xs text-slate-500 mt-0.5">Search, filter and segment your institution's technical talent.</p>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2.5">
          {/* Saved Views Button Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSavedViewsOpen(!isSavedViewsOpen)}
              className="bg-white border border-slate-200 text-blue-600 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-blue-600" />
              <span>Saved Views</span>
              <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
            </button>

            {isSavedViewsOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-52 rounded-xl bg-white border border-slate-200 shadow-xl z-30 p-1.5 text-xs font-sans space-y-0.5">
                <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Presets & Saved Filters
                </div>
                {[
                  'Default (CSE 3rd Year Strong DSA)',
                  'High Potential',
                  'High Growth',
                  'Final Year Placement Pool',
                  'Strong DSA',
                  'Needs Attention'
                ].map(view => (
                  <button
                    key={view}
                    onClick={() => loadSavedView(view)}
                    className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-medium"
                  >
                    {view}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* + Create Group Primary Action Button */}
          <button
            onClick={() => setIsCreateGroupModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Group</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/80 border-l border-white/30 pl-1 ml-1" />
          </button>
        </div>
      </div>

      {/* 6 Horizontal Filter Cards */}
      <div className="grid grid-cols-6 gap-3">
        {/* 1. Academic Card */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Academic</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Department</span>
              <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-semibold text-slate-800 text-xs focus:outline-none">
                <option value="CSE">CSE</option>
                <option value="AIML">AIML</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Year</span>
              <div className="relative">
                <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-semibold text-slate-800 text-xs focus:outline-none">
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="All">All</option>
                </select>
                {yearFilter !== 'All' && <X onClick={() => setYearFilter('All')} className="w-3 h-3 text-slate-400 absolute right-6 top-2 cursor-pointer" />}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Batch</span>
              <div className="relative">
                <select value={batchFilter} onChange={e => setBatchFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-semibold text-slate-800 text-xs focus:outline-none">
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2025">2025</option>
                  <option value="All">All</option>
                </select>
                {batchFilter !== 'All' && <X onClick={() => setBatchFilter('All')} className="w-3 h-3 text-slate-400 absolute right-6 top-2 cursor-pointer" />}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Section</span>
              <select value={sectionFilter} onChange={e => setSectionFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          </div>

          <div className="pt-1">
            <span onClick={() => { setDeptFilter('All'); setYearFilter('All'); setBatchFilter('All'); setSectionFilter('All'); }} className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium">Clear</span>
          </div>
        </div>

        {/* 2. Technical Card */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
            <Code className="w-3.5 h-3.5 text-emerald-600" />
            <span>Technical</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Technical Score</span>
              <div className="relative">
                <select value={techScoreFilter} onChange={e => setTechScoreFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-semibold text-slate-800 text-xs focus:outline-none">
                  <option value="700 - 1000">700 - 1000</option>
                  <option value="800 - 1000">800 - 1000</option>
                  <option value="< 600">&lt; 600</option>
                  <option value="All">All</option>
                </select>
                {techScoreFilter !== 'All' && <X onClick={() => setTechScoreFilter('All')} className="w-3 h-3 text-slate-400 absolute right-6 top-2 cursor-pointer" />}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">DSA Strength</span>
              <div className="relative">
                <select value={dsaFilter} onChange={e => setDsaFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-semibold text-slate-800 text-xs focus:outline-none">
                  <option value="Strong">Strong</option>
                  <option value="Good">Good</option>
                  <option value="Developing">Developing</option>
                  <option value="All">All</option>
                </select>
                {dsaFilter !== 'All' && <X onClick={() => setDsaFilter('All')} className="w-3 h-3 text-slate-400 absolute right-6 top-2 cursor-pointer" />}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Development Strength</span>
              <select value={devFilter} onChange={e => setDevFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="Strong">Strong</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">CP Rating</span>
              <select value={cpFilter} onChange={e => setCpFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="Candidate Master">Candidate Master</option>
              </select>
            </div>
          </div>

          <div className="pt-1">
            <span onClick={() => { setTechScoreFilter('All'); setDsaFilter('All'); setDevFilter('All'); setCpFilter('All'); }} className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium">Clear</span>
          </div>
        </div>

        {/* 3. Skills Card */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
            <Star className="w-3.5 h-3.5 text-purple-600" />
            <span>Skills</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Primary Skill</span>
              <select value={primarySkillFilter} onChange={e => setPrimarySkillFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="DSA">DSA</option>
                <option value="React">React</option>
                <option value="Python">Python</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Technology / Tool</span>
              <select value={techToolFilter} onChange={e => setTechToolFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="Docker">Docker</option>
                <option value="Git">Git</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Skill Strength</span>
              <select value={skillStrengthFilter} onChange={e => setSkillStrengthFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="Strong">Strong</option>
              </select>
            </div>
          </div>

          <div className="pt-[22px]">
            <span onClick={() => { setPrimarySkillFilter('All'); setTechToolFilter('All'); setSkillStrengthFilter('All'); }} className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium">Clear</span>
          </div>
        </div>

        {/* 4. Growth & Activity Card */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span>Growth & Activity</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Growth (30D)</span>
              <select value={growthFilter} onChange={e => setGrowthFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-semibold text-slate-800 text-xs focus:outline-none">
                <option value="> 10%">&gt; 10%</option>
                <option value="> 15%">&gt; 15%</option>
                <option value="All">All</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Activity</span>
              <select value={activityFilter} onChange={e => setActivityFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Consistency</span>
              <select value={consistencyFilter} onChange={e => setConsistencyFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="> 80%">&gt; 80%</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Last Active</span>
              <select value={lastActiveFilter} onChange={e => setLastActiveFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="Today">Today</option>
              </select>
            </div>
          </div>

          <div className="pt-1">
            <span onClick={() => { setGrowthFilter('All'); setActivityFilter('All'); setConsistencyFilter('All'); setLastActiveFilter('All'); }} className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium">Clear</span>
          </div>
        </div>

        {/* 5. Readiness Card */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
            <Gauge className="w-3.5 h-3.5 text-cyan-600" />
            <span>Readiness</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Technical Readiness</span>
              <select value={readinessFilter} onChange={e => setReadinessFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="Placement Ready">Placement Ready</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Placement Eligibility</span>
              <select value={eligibilityFilter} onChange={e => setEligibilityFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="Eligible">Eligible</option>
              </select>
            </div>
          </div>

          <div className="pt-[44px]">
            <span onClick={() => { setReadinessFilter('All'); setEligibilityFilter('All'); }} className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium">Clear</span>
          </div>
        </div>

        {/* 6. More Filters Card */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs space-y-2">
          <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
            <Circle className="w-3.5 h-3.5 text-slate-500" />
            <span>More Filters</span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Gender</span>
              <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-medium block">Platform Connected</span>
              <select value={platformFilter} onChange={e => setPlatformFilter(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-1 font-medium text-slate-700 text-xs focus:outline-none">
                <option value="All">All</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>

          <div className="pt-[44px]">
            <span onClick={() => { setGenderFilter('All'); setPlatformFilter('All'); }} className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium">Clear</span>
          </div>
        </div>
      </div>

      {/* Active Filter Bar */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-xs text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-semibold text-[11px]">Active Filters:</span>

          {deptFilter !== 'All' && (
            <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px] flex items-center gap-1">
              Department: {deptFilter}
              <X onClick={() => setDeptFilter('All')} className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
            </span>
          )}

          {yearFilter !== 'All' && (
            <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px] flex items-center gap-1">
              Year: {yearFilter}
              <X onClick={() => setYearFilter('All')} className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
            </span>
          )}

          {batchFilter !== 'All' && (
            <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px] flex items-center gap-1">
              Batch: {batchFilter}
              <X onClick={() => setBatchFilter('All')} className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
            </span>
          )}

          {dsaFilter !== 'All' && (
            <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px] flex items-center gap-1">
              DSA Strength: {dsaFilter}
              <X onClick={() => setDsaFilter('All')} className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
            </span>
          )}

          {techScoreFilter !== 'All' && (
            <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px] flex items-center gap-1">
              Technical Score: {techScoreFilter}
              <X onClick={() => setTechScoreFilter('All')} className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
            </span>
          )}

          {growthFilter !== 'All' && (
            <span className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium text-[11px] flex items-center gap-1">
              Growth (30D): {growthFilter}
              <X onClick={() => setGrowthFilter('All')} className="w-3 h-3 text-slate-400 hover:text-slate-700 cursor-pointer" />
            </span>
          )}

          <button onClick={clearAllFilters} className="text-blue-600 font-semibold hover:underline text-[11px] ml-1">
            Clear All
          </button>
        </div>

        {/* Far Right: Save View button */}
        <button
          onClick={() => setIsSaveModalOpen(true)}
          className="bg-white border border-slate-200 text-blue-600 hover:bg-slate-50 font-semibold px-3 py-1 rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
        >
          <Bookmark className="w-3.5 h-3.5 text-blue-600" />
          <span>Save View</span>
        </button>
      </div>

      {/* Results Count & Sorting Controls */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          {sortedStudents.length} students match
        </h2>

        <div className="flex items-center gap-3 text-xs">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 font-semibold rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer shadow-xs"
            >
              <option value="Growth (High to Low)">Growth (High to Low)</option>
              <option value="Score (High to Low)">Score (High to Low)</option>
              <option value="Consistency (High to Low)">Consistency (High to Low)</option>
            </select>
          </div>

          {/* Columns Selector Dropdown */}
          <ColumnSelectorDropdown
            isOpen={isColumnDropdownOpen}
            onToggleOpen={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
            visibility={columnVisibility}
            onToggleColumn={toggleColumn}
          />

          {/* Filter Icon Button */}
          <button className="p-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 shadow-xs">
            <Filter className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Student Results Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="p-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
                <th className="p-3">Student</th>
                {columnVisibility.department && <th className="p-3">Department</th>}
                {columnVisibility.year && <th className="p-3">Year</th>}
                {columnVisibility.batch && <th className="p-3">Batch</th>}
                {columnVisibility.techScore && (
                  <th className="p-3">
                    <div className="flex items-center gap-1">
                      <span>Technical Score</span>
                      <Info className="w-3 h-3 text-slate-400" />
                      <ArrowUpDown className="w-3 h-3 text-slate-400 cursor-pointer" />
                    </div>
                  </th>
                )}
                {columnVisibility.growth && (
                  <th className="p-3">
                    <div className="flex items-center gap-1">
                      <span>Growth (30D)</span>
                      <Info className="w-3 h-3 text-slate-400" />
                      <ArrowUpDown className="w-3 h-3 text-slate-400 cursor-pointer" />
                    </div>
                  </th>
                )}
                {columnVisibility.keySkills && <th className="p-3">Key Skills</th>}
                {columnVisibility.activity && <th className="p-3">Activity</th>}
                {columnVisibility.consistency && <th className="p-3">Consistency</th>}
                {columnVisibility.status && <th className="p-3">Status</th>}
                {columnVisibility.lastActive && <th className="p-3">Last Active</th>}
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedStudents.map(student => {
                const isSelected = selectedIds.includes(student.id);

                return (
                  <tr
                    key={student.id}
                    onClick={() => navigateToStudent(student.id)}
                    className={`hover:bg-slate-50/80 cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <td className="p-3 text-center" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(student.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>

                    {/* Student Avatar + Name + Username */}
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{student.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{student.username}</p>
                        </div>
                      </div>
                    </td>

                    {columnVisibility.department && (
                      <td className="p-3 font-semibold text-slate-800">{student.dept}</td>
                    )}

                    {columnVisibility.year && (
                      <td className="p-3 font-medium text-slate-600">{student.year}</td>
                    )}

                    {columnVisibility.batch && (
                      <td className="p-3 font-mono font-medium text-slate-600">{student.batch}</td>
                    )}

                    {columnVisibility.techScore && (
                      <td className="p-3">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold text-xs">
                          {student.techScore}
                        </span>
                      </td>
                    )}

                    {columnVisibility.growth && (
                      <td className="p-3 font-mono font-bold text-emerald-600 text-xs">
                        ↑ {student.growth}%
                      </td>
                    )}

                    {columnVisibility.keySkills && (
                      <td className="p-3 text-[11px] text-slate-600 leading-tight">
                        <div>{student.keySkillsLine1}</div>
                        <div className="text-slate-400">{student.keySkillsLine2}</div>
                      </td>
                    )}

                    {columnVisibility.activity && (
                      <td className="p-3">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                          <span className={`w-2 h-2 rounded-full ${
                            student.activity === 'High' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}></span>
                          <span>{student.activity}</span>
                        </div>
                      </td>
                    )}

                    {columnVisibility.consistency && (
                      <td className="p-3">
                        <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                          {/* Circular ring indicator */}
                          <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 36 36">
                            <path
                              className="text-slate-200 stroke-current"
                              strokeWidth="4"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                              className="text-emerald-500 stroke-current"
                              strokeWidth="4"
                              strokeDasharray={`${student.consistency}, 100`}
                              strokeLinecap="round"
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          </svg>
                          <span className="font-mono text-xs">{student.consistency}%</span>
                        </div>
                      </td>
                    )}

                    {columnVisibility.status && (
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          student.status === 'High Potential' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          student.status === 'Strong' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          student.status === 'Developing' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    )}

                    {columnVisibility.lastActive && (
                      <td className="p-3 text-slate-500 font-medium text-xs">{student.lastActive}</td>
                    )}

                    <td className="p-3 text-right">
                      <StudentRowMenu studentId={student.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bottom Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-4 left-[210px] right-6 bg-white border border-slate-200 rounded-xl p-3 shadow-2xl z-40 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">{selectedIds.length} students selected</span>
            <button onClick={() => setSelectedIds([])} className="text-blue-600 hover:underline font-semibold text-xs ml-1">
              Clear
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsCreateGroupModalOpen(true)}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Create Group</span>
            </button>

            <button
              onClick={() => setIsCreateGroupModalOpen(true)}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <FolderPlus className="w-3.5 h-3.5 text-indigo-600" />
              <span>Add to Existing Group</span>
            </button>

            <button
              onClick={() => setCurrentScreen('opportunities')}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Target className="w-3.5 h-3.5 text-purple-600" />
              <span>Create Opportunity Pool</span>
            </button>

            <button
              onClick={() => setIsInterventionModalOpen(true)}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Start Intervention</span>
            </button>

            <button
              onClick={() => alert(`Exported ${selectedIds.length} candidate technical records to CSV.`)}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export</span>
            </button>

            <button
              onClick={() => {
                if (confirm(`Remove ${selectedIds.length} selected students from view?`)) {
                  setSelectedIds([]);
                }
              }}
              className="bg-rose-50/50 border border-rose-200 text-rose-600 hover:bg-rose-100 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <SaveViewModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        activeFiltersCount={6}
        onSave={(name) => loadSavedView(name)}
      />
      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
      />
      <CreateInterventionModal
        isOpen={isInterventionModalOpen}
        onClose={() => setIsInterventionModalOpen(false)}
      />
    </div>
  );
};
