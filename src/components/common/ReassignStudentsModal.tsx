import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, X, Check, ArrowRight } from 'lucide-react';

interface ReassignStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceMentorId: string;
  onReassign: (sourceId: string, targetId: string, count: number) => void;
}

export const ReassignStudentsModal: React.FC<ReassignStudentsModalProps> = ({
  isOpen, onClose, sourceMentorId, onReassign
}) => {
  const { mentors } = useApp();
  const sourceMentor = mentors.find(m => m.id === sourceMentorId) || mentors[0];
  const availableTargetMentors = mentors.filter(m => m.id !== sourceMentorId);

  const [targetMentorId, setTargetMentorId] = useState(availableTargetMentors[0]?.id || '');
  const [count, setCount] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMentorId || count <= 0) return;
    onReassign(sourceMentorId, targetMentorId, count);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-5 space-y-4 shadow-2xl text-slate-800 font-sans">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <UserCheck className="w-4 h-4" />
            <span>Reassign Students</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-6 text-center space-y-2 text-emerald-600">
            <Check className="w-8 h-8 mx-auto animate-bounce" />
            <p className="font-bold text-xs">Reassigned {count} students successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Source Mentor</span>
              <p className="font-bold text-slate-900 text-xs">{sourceMentor.name}</p>
              <p className="text-[11px] text-slate-500">Currently managing {sourceMentor.assignedStudentIds.length} students</p>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Target Mentor</label>
              <select
                value={targetMentorId}
                onChange={e => setTargetMentorId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-semibold text-slate-800 text-xs focus:outline-none"
              >
                {availableTargetMentors.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.dept} • {m.assignedStudentIds.length} students)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Number of Students to Transfer</label>
              <input
                type="number"
                min={1}
                max={sourceMentor.assignedStudentIds.length || 10}
                value={count}
                onChange={e => setCount(parseInt(e.target.value, 10) || 1)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold text-slate-900 text-xs focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-xs flex items-center gap-1"
              >
                <span>Confirm Reassignment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
