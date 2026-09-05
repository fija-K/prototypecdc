import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreateGroupModal, AssignMentorModal } from '../layout/ActionModals';
import { 
  ChevronRight, ChevronDown, Plus, Users, UserCheck, 
  Calendar, Clock, AlertTriangle, CheckCircle2, Search, 
  Filter, MoreVertical, Edit, ShieldCheck, Download, 
  Sparkles, ArrowUpRight, Eye, Layers, Settings, Info,
  TrendingUp, Award, ExternalLink
} from 'lucide-react';

export const OpportunityDetail: React.FC = () => {
  const { 
    opportunities, selectedOpportunityId, setCurrentScreen, 
    students, navigateToStudent 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'requirements' | 'activity'>('candidates');
  const [matchFilter, setMatchFilter] = useState<'ALL' | 'Strong' | 'Potential' | 'Review'>('ALL');
  const [candidateSearch, setCandidateSearch] = useState('');
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  // Selected opportunity or default to Microsoft SDE Intern
  const opportunity = opportunities.find(o => o.id === selectedOpportunityId) || opportunities[0];

  // Candidates matching logic
  const candidateList = students.map(s => {
    const fitScore = Math.min(98, Math.max(55, Math.round((s.techScore / 1000) * 98)));
    const status = fitScore >= 85 ? 'Strong Match' : fitScore >= 70 ? 'Potential Match' : 'Needs Review';

    return {
      student: s,
      fitScore,
      status,
      strengths: [
        `Meets GPA criteria (${s.gpa.toFixed(2)})`,
        `Tech Score ${s.techScore} pts (Top ${(100 - (s.percentiles?.inst || 90)).toFixed(1)}%)`,
        s.skills[0] ? `Verified skill in ${s.skills[0].name}` : 'Strong problem solving activity'
      ],
      gaps: s.capabilities.competitiveProgramming < 60 ? ['Competitive Programming score below target threshold'] : []
    };
  }).filter(c => {
    if (matchFilter === 'Strong') return c.status === 'Strong Match';
    if (matchFilter === 'Potential') return c.status === 'Potential Match';
    if (matchFilter === 'Review') return c.status === 'Needs Review';
    return true;
  }).filter(c => {
    if (!candidateSearch) return true;
    const q = candidateSearch.toLowerCase();
    return c.student.name.toLowerCase().includes(q) || c.student.dept.toLowerCase().includes(q);
  }).sort((a, b) => b.fitScore - a.fitScore);

  return (
    <div className="p-6 space-y-4 bg-[#F8FAFC] min-h-screen font-sans text-slate-800 select-none pb-24">
      {/* 1. Top Header & Breadcrumb */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span 
            onClick={() => setCurrentScreen('opportunities')} 
            className="text-slate-500 hover:text-blue-600 cursor-pointer flex items-center gap-1 transition-colors"
          >
            Opportunities
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-blue-600 font-bold">{opportunity.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{opportunity.title}</h1>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-2.5 py-0.5 rounded text-xs">
                {opportunity.status || 'Active'}
              </span>
              <span className="bg-blue-50 text-blue-700 border border-blue-200 font-semibold px-2 py-0.5 rounded text-xs">
                {opportunity.type}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {opportunity.company} <span className="text-slate-300">•</span> Min Score: <strong>{opportunity.minScore || 750} pts</strong> <span className="text-slate-300">•</span> Min GPA: <strong>{opportunity.minGPA || 8.0}</strong> <span className="text-slate-300">•</span> Deadline: <strong>{opportunity.deadline} ({opportunity.relativeDeadline || 'In 18 days'})</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <button 
              onClick={() => setIsGroupModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-white" />
              <span>Save as Candidate Group</span>
            </button>

            <button 
              onClick={() => alert(`Exporting candidate matches for ${opportunity.company} as CSV...`)}
              className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Shortlist</span>
            </button>

            <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
              <Edit className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Opportunity</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-xs font-semibold select-none pt-1">
        <button 
          onClick={() => setActiveTab('candidates')} 
          className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'candidates' ? 'text-blue-600 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}
        >
          Candidate Matching ({opportunity.matchedCandidatesCount?.eligible || 142})
        </button>
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'overview' ? 'text-blue-600 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}
        >
          Overview & Drive Info
        </button>
        <button 
          onClick={() => setActiveTab('requirements')} 
          className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'requirements' ? 'text-blue-600 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}
        >
          Requirements & Weights
        </button>
        <button 
          onClick={() => setActiveTab('activity')} 
          className={`py-2 px-1 border-b-2 transition-colors ${activeTab === 'activity' ? 'text-blue-600 border-blue-600 font-bold' : 'text-slate-600 hover:text-slate-900 border-transparent'}`}
        >
          Activity & Audit
        </button>
      </div>

      {/* 3. TAB CONTENT AREA */}

      {/* CANDIDATES MATCHING TAB */}
      {activeTab === 'candidates' && (
        <div className="space-y-4">
          {/* Match Filter Chips & Search Bar */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 font-semibold select-none">
              <button
                onClick={() => setMatchFilter('ALL')}
                className={`px-3 py-1 rounded-lg transition-colors ${matchFilter === 'ALL' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                All Matched ({opportunity.matchedCandidatesCount?.eligible || 142})
              </button>
              <button
                onClick={() => setMatchFilter('Strong')}
                className={`px-3 py-1 rounded-lg transition-colors ${matchFilter === 'Strong' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Strong Matches ({opportunity.matchedCandidatesCount?.strong || 38})
              </button>
              <button
                onClick={() => setMatchFilter('Potential')}
                className={`px-3 py-1 rounded-lg transition-colors ${matchFilter === 'Potential' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Potential Matches ({opportunity.matchedCandidatesCount?.potential || 61})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search candidates by name..."
                value={candidateSearch}
                onChange={e => setCandidateSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Ranked Candidates Card List */}
          <div className="space-y-3 font-sans text-xs">
            {candidateList.map(({ student, fitScore, status, strengths, gaps }) => (
              <div 
                key={student.id}
                className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs space-y-3 hover:border-blue-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Fit Score Badge */}
                    <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex flex-col items-center justify-center font-bold text-blue-700 font-mono shrink-0">
                      <span className="text-base leading-none">{fitScore}%</span>
                      <span className="text-[9px] font-sans font-medium text-slate-400 mt-0.5">FIT</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span 
                          onClick={() => navigateToStudent(student.id)}
                          className="font-bold text-slate-900 text-sm hover:text-blue-600 cursor-pointer"
                        >
                          {student.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          status === 'Strong Match' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          status === 'Potential Match' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {student.rollNo} • {student.dept} • {student.year} • Tech Score: <strong className="text-slate-900 font-mono">{student.techScore} pts</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateToStudent(student.id)}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs self-start sm:self-auto flex items-center gap-1.5 transition-colors"
                  >
                    <span>Full Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>

                {/* Explainable AI Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-2.5 bg-emerald-50/60 border border-emerald-100 rounded-lg space-y-1">
                    <span className="font-bold text-emerald-700 flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Match Rationale (+)</span>
                    </span>
                    <ul className="space-y-0.5 text-slate-700 text-[11px] font-medium">
                      {strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-emerald-600 font-bold">+</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-2.5 bg-amber-50/60 border border-amber-100 rounded-lg space-y-1">
                    <span className="font-bold text-amber-700 flex items-center gap-1 text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Identified Skill Gaps (-)</span>
                    </span>
                    <ul className="space-y-0.5 text-slate-700 text-[11px] font-medium">
                      {gaps.length > 0 ? (
                        gaps.map((gap, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-amber-600 font-bold">-</span>
                            <span>{gap}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-slate-400 italic">No critical gaps identified for this opportunity</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4 font-sans text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">Opportunity Overview</h3>
          <p className="text-slate-600 leading-relaxed">
            {opportunity.title} by {opportunity.company}. This opportunity targets high-capability students for placement matching and technical shortlisting.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2 font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Eligible Pool</span>
              <span className="text-lg font-bold text-slate-900">{opportunity.matchedCandidatesCount?.eligible || 142} Candidates</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Strong Candidates</span>
              <span className="text-lg font-bold text-blue-600">{opportunity.matchedCandidatesCount?.strong || 38} Candidates</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-sans font-bold block">Deadline</span>
              <span className="text-lg font-bold text-rose-600">{opportunity.deadline}</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      <CreateGroupModal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} />
    </div>
  );
};
