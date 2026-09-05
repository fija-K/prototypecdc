import React, { useState } from 'react';
import { X, Mail, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [identifier, setIdentifier] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your username or email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleClose = () => {
    setIdentifier('');
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 font-sans select-none">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#008ca5] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <h3 className="font-bold text-base tracking-wide">Reset Password</h3>
          </div>
          <button 
            onClick={handleClose}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your institutional username or email address below. We will send password reset instructions if an account is associated with your input.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Username / Email
                </label>
                <input
                  type="text"
                  placeholder="e.g. cdc_admin or user@glbitm.ac.in"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full bg-slate-100 border border-slate-300 rounded-md px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#008ca5] focus:bg-white font-medium"
                />
                {error && <p className="text-[11px] font-semibold text-rose-600 mt-1">{error}</p>}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#008ca5] hover:bg-[#00788e] active:bg-[#006578] rounded-md shadow-xs transition-colors tracking-wide"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-slate-800">Reset Request Dispatched</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                If an account exists for <span className="font-semibold text-slate-800">{identifier}</span>, password reset instructions have been sent to the registered email address.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2.5 text-xs font-bold text-white bg-[#008ca5] hover:bg-[#00788e] rounded-md transition-colors tracking-wider uppercase"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
