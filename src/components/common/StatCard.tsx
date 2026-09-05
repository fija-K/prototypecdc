import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  onClick?: () => void;
  highlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  change,
  changeType = 'positive',
  icon,
  onClick,
  highlight = false
}) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-slate-600 hover:shadow-lg hover:shadow-indigo-950/20' : ''
      } ${
        highlight 
          ? 'bg-slate-900/90 border-indigo-500/50 ring-1 ring-indigo-500/30' 
          : 'bg-slate-900 border-slate-800'
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        {icon && <div className="text-slate-400 p-1.5 rounded-lg bg-slate-800/80">{icon}</div>}
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-2xl font-bold font-mono text-slate-100">{value}</span>
        {change && (
          <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
            changeType === 'positive' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' :
            changeType === 'negative' ? 'bg-rose-950 text-rose-400 border border-rose-800/50' :
            'bg-slate-800 text-slate-300'
          }`}>
            {change}
          </span>
        )}
      </div>

      {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
    </div>
  );
};
