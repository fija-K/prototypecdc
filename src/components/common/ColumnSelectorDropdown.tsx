import React from 'react';
import { Columns, Check } from 'lucide-react';

export interface ColumnVisibility {
  department: boolean;
  year: boolean;
  batch: boolean;
  techScore: boolean;
  growth: boolean;
  keySkills: boolean;
  activity: boolean;
  consistency: boolean;
  status: boolean;
  lastActive: boolean;
}

interface ColumnSelectorDropdownProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  visibility: ColumnVisibility;
  onToggleColumn: (colKey: keyof ColumnVisibility) => void;
}

export const ColumnSelectorDropdown: React.FC<ColumnSelectorDropdownProps> = ({
  isOpen, onToggleOpen, visibility, onToggleColumn
}) => {
  const columnLabels: { key: keyof ColumnVisibility; label: string }[] = [
    { key: 'department', label: 'Department' },
    { key: 'year', label: 'Year' },
    { key: 'batch', label: 'Batch' },
    { key: 'techScore', label: 'Technical Score' },
    { key: 'growth', label: 'Growth (30D)' },
    { key: 'keySkills', label: 'Key Skills' },
    { key: 'activity', label: 'Activity' },
    { key: 'consistency', label: 'Consistency' },
    { key: 'status', label: 'Status' },
    { key: 'lastActive', label: 'Last Active' },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={onToggleOpen}
        className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
      >
        <Columns className="w-3.5 h-3.5 text-slate-500" />
        <span>Columns</span>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-xl z-30 p-2 text-xs font-sans space-y-0.5">
          <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Toggle Visible Columns
          </div>
          {columnLabels.map(col => (
            <button
              key={col.key}
              onClick={() => onToggleColumn(col.key)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium"
            >
              <span>{col.label}</span>
              {visibility[col.key] && <Check className="w-3.5 h-3.5 text-blue-600 font-bold" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
