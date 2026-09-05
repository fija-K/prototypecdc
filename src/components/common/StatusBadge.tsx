import React from 'react';
import { StudentStatus } from '../../types';

interface StatusBadgeProps {
  status: StudentStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let colorClasses = '';
  
  switch (status) {
    case 'High Potential':
      colorClasses = 'bg-purple-950/80 text-purple-300 border-purple-700/50 ring-1 ring-purple-500/20';
      break;
    case 'High Growth':
      colorClasses = 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50 ring-1 ring-emerald-500/20';
      break;
    case 'Strong':
      colorClasses = 'bg-blue-950/80 text-blue-300 border-blue-700/50 ring-1 ring-blue-500/20';
      break;
    case 'Developing':
      colorClasses = 'bg-amber-950/80 text-amber-300 border-amber-700/50 ring-1 ring-amber-500/20';
      break;
    case 'Needs Attention':
      colorClasses = 'bg-rose-950/80 text-rose-300 border-rose-700/50 ring-1 ring-rose-500/30 animate-pulse';
      break;
    case 'Insufficient Data':
      colorClasses = 'bg-slate-800 text-slate-400 border-slate-700';
      break;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 rounded-md font-medium border',
    md: 'text-xs px-2.5 py-1 rounded-md font-semibold border',
    lg: 'text-sm px-3 py-1.5 rounded-lg font-semibold border'
  }[size];

  return (
    <span className={`inline-flex items-center gap-1.5 ${colorClasses} ${sizeClasses}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  );
};
