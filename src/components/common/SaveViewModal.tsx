import React, { useState } from 'react';
import { Bookmark, X, Check } from 'lucide-react';

interface SaveViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeFiltersCount: number;
  onSave: (name: string) => void;
}

export const SaveViewModal: React.FC<SaveViewModalProps> = ({
  isOpen, onClose, activeFiltersCount, onSave
}) => {
  const [viewName, setViewName] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewName.trim()) return;
    onSave(viewName);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setViewName('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-sm p-5 space-y-4 shadow-xl text-slate-800 font-sans">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            <Bookmark className="w-4 h-4" />
            <span>Save Filter View</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {savedSuccess ? (
          <div className="py-6 text-center space-y-2 text-emerald-600">
            <Check className="w-8 h-8 mx-auto animate-bounce" />
            <p className="font-bold text-xs">Saved View Successfully Created!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">View Name</label>
              <input
                type="text"
                placeholder="e.g. 3rd Year CSE Strong DSA"
                value={viewName}
                onChange={e => setViewName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:outline-none focus:border-blue-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 bg-blue-50/60 p-2 rounded border border-blue-100">
              Saving {activeFiltersCount} active filter criteria. You can quickly restore this view anytime from the <strong>Saved Views</strong> dropdown.
            </p>

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
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-xs"
              >
                Save View
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
