import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MoreVertical, UserCheck, FolderPlus, Target, LifeBuoy, UserPlus, Flag 
} from 'lucide-react';

interface StudentRowMenuProps {
  studentId: string;
}

export const StudentRowMenu: React.FC<StudentRowMenuProps> = ({ studentId }) => {
  const { navigateToStudent, setCurrentScreen } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left" onClick={e => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-1 w-44 rounded-xl bg-white border border-slate-200 shadow-xl z-30 p-1.5 text-xs font-sans space-y-0.5">
          <button
            onClick={() => { setIsOpen(false); navigateToStudent(studentId); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>View Student</span>
          </button>
          <button
            onClick={() => { setIsOpen(false); setCurrentScreen('groups'); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium"
          >
            <FolderPlus className="w-3.5 h-3.5 text-indigo-600" />
            <span>Add to Group</span>
          </button>
          <button
            onClick={() => { setIsOpen(false); setCurrentScreen('opportunities'); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium"
          >
            <Target className="w-3.5 h-3.5 text-purple-600" />
            <span>Add to Opportunity</span>
          </button>
          <button
            onClick={() => { setIsOpen(false); setCurrentScreen('interventions'); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Start Intervention</span>
          </button>
          <button
            onClick={() => { setIsOpen(false); setCurrentScreen('mentor-management'); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-slate-700 font-medium"
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-600" />
            <span>Assign Mentor</span>
          </button>
          <button
            onClick={() => { setIsOpen(false); alert('Student flagged for CDC administrative review'); }}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-50 text-rose-600 font-medium border-t border-slate-100 mt-1"
          >
            <Flag className="w-3.5 h-3.5 text-rose-500" />
            <span>Flag for Review</span>
          </button>
        </div>
      )}
    </div>
  );
};
