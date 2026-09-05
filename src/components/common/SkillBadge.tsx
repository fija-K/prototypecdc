import React from 'react';
import { StudentSkill } from '../../types';
import { ShieldCheck, UserCheck } from 'lucide-react';

interface SkillBadgeProps {
  skill: StudentSkill;
  showEvidence?: boolean;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, showEvidence = false }) => {
  let levelColor = '';
  switch (skill.level) {
    case 'Strong':
      levelColor = 'bg-emerald-950 text-emerald-300 border-emerald-800';
      break;
    case 'Good':
      levelColor = 'bg-blue-950 text-blue-300 border-blue-800';
      break;
    case 'Developing':
      levelColor = 'bg-amber-950 text-amber-300 border-amber-800';
      break;
    case 'Weak':
      levelColor = 'bg-rose-950 text-rose-300 border-rose-800';
      break;
    default:
      levelColor = 'bg-slate-800 text-slate-400 border-slate-700';
  }

  const isVerified = skill.source === 'platform_derived';

  return (
    <div className="inline-flex flex-col gap-1">
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border font-medium ${levelColor}`}>
        {isVerified ? (
          <span title="Verified via platform data (GitHub/LeetCode/Codeforces)" className="text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
        ) : (
          <span title="Self-declared skill" className="text-slate-400">
            <UserCheck className="w-3.5 h-3.5" />
          </span>
        )}
        <span>{skill.name}</span>
        <span className="opacity-75 text-[10px] uppercase tracking-wider font-mono">({skill.level})</span>
      </div>
      {showEvidence && (
        <p className="text-[11px] text-slate-400 italic pl-1 border-l-2 border-slate-700">
          {skill.evidence}
        </p>
      )}
    </div>
  );
};
