import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { User, Lock, RotateCcw, Eye, EyeOff, ShieldAlert, Sparkles } from 'lucide-react';
import { ForgotPasswordModal } from '../common/ForgotPasswordModal';

export const LoginPage: React.FC = () => {
  const { login } = useApp();

  const [role, setRole] = useState<UserRole>('CDC');
  const [username, setUsername] = useState('cdc');
  const [password, setPassword] = useState('cdc123');
  const [showPassword, setShowPassword] = useState(false);

  // CAPTCHA State
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Error & Modal state
  const [error, setError] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  // Auto update credentials when role changes
  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setError('');
    if (newRole === 'CDC') {
      setUsername('cdc');
      setPassword('cdc123');
    } else if (newRole === 'Mentor') {
      setUsername('mentor');
      setPassword('mentor123');
    } else {
      setUsername('student');
      setPassword('student123');
    }
  };

  // Generate random 4 char CAPTCHA
  const generateCaptcha = () => {
    const chars = '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Draw distorted CAPTCHA on HTML5 Canvas
  useEffect(() => {
    if (!canvasRef.current || !captchaCode) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Noise background dots
    for (let i = 0; i < 120; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#cbd5e1' : '#94a3b8';
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Distorted lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = Math.random() > 0.5 ? '#94a3b8' : '#cbd5e1';
      ctx.lineWidth = Math.random() * 1.2 + 0.5;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Render characters with distortion & rotation
    const charWidth = canvas.width / (captchaCode.length + 1);
    for (let i = 0; i < captchaCode.length; i++) {
      ctx.save();
      const x = (i + 0.8) * charWidth;
      const y = canvas.height / 2 + Math.sin(i * 1.5) * 4;
      const angle = (Math.random() - 0.5) * 0.3;
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.font = 'bold 24px "Courier New", Courier, monospace';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(captchaCode[i], 0, 0);
      ctx.restore();
    }
  }, [captchaCode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter username.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter password.');
      return;
    }
    if (!captchaInput.trim()) {
      setError('Please enter CAPTCHA code.');
      return;
    }
    if (captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setError('Invalid CAPTCHA code. Please try again.');
      generateCaptcha();
      return;
    }

    // Process Login
    const res = login(username.trim(), password.trim(), role);
    if (!res.success) {
      setError(res.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center py-8 px-4 font-sans select-none overflow-x-hidden bg-[#F1F4F9]">
      {/* Light Geometric Background SVG Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="w-full h-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,0 450,0 200,300" fill="#FFFFFF" />
          <polygon points="450,0 900,0 650,220" fill="#F8FAFC" />
          <polygon points="900,0 1440,0 1200,350" fill="#FFFFFF" />
          <polygon points="0,0 200,300 0,550" fill="#F1F5F9" />
          <polygon points="200,300 650,220 450,550" fill="#E2E8F0" opacity="0.4" />
          <polygon points="650,220 1200,350 850,580" fill="#EDF2F7" />
          <polygon points="1200,350 1440,0 1440,500" fill="#F8FAFC" />
          <polygon points="0,550 450,550 250,900" fill="#FFFFFF" />
          <polygon points="450,550 850,580 600,900" fill="#E2E8F0" opacity="0.3" />
          <polygon points="850,580 1440,500 1150,900" fill="#F1F5F9" />
          <polygon points="0,550 250,900 0,900" fill="#F8FAFC" />
          <polygon points="250,900 600,900 1440,900" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Top Branding Section */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2 mb-4">
        {/* Isometric 3D Cube Logo */}
        <div className="mb-3 flex items-center justify-center">
          <svg className="w-16 h-16 drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,12 85,32 50,52 15,32" fill="#00A8C6" />
            <polygon points="15,32 50,52 50,88 15,68" fill="#0077A3" />
            <polygon points="50,52 85,32 85,68 50,88" fill="#008CA5" />
            <line x1="50" y1="52" x2="50" y2="88" stroke="#005F75" strokeWidth="1.5" />
            <polygon points="50,25 72,38 50,50 28,38" fill="#00C4E6" opacity="0.8" />
          </svg>
        </div>

        {/* Brand Name */}
        <h1 className="text-2xl font-black tracking-widest text-[#0E1726] uppercase font-sans">
          TECHNICAL
        </h1>
        <h2 className="text-2xl font-black tracking-widest text-[#0E1726] uppercase font-sans -mt-1">
          INTELLIGENCE
        </h2>

        {/* Tagline */}
        <p className="text-xs font-semibold text-slate-500 tracking-wider mt-1">
          Data &nbsp;•&nbsp; People &nbsp;•&nbsp; Progress
        </p>
      </div>

      {/* Main Centered Login Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden my-auto transition-all">
        {/* Teal Header Role Selector Banner */}
        <div className="bg-[#008ca5] px-6 py-3.5 flex items-center justify-around rounded-t-xl select-none">
          <button 
            type="button"
            onClick={() => handleRoleChange('CDC')}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              role === 'CDC' ? 'text-white' : 'text-teal-100 hover:text-white'
            }`}
          >
            <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
              {role === 'CDC' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span>CDC</span>
          </button>

          <button 
            type="button"
            onClick={() => handleRoleChange('Mentor')}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              role === 'Mentor' ? 'text-white' : 'text-teal-100 hover:text-white'
            }`}
          >
            <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
              {role === 'Mentor' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span>Mentor</span>
          </button>

          <button 
            type="button"
            onClick={() => handleRoleChange('Student')}
            className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
              role === 'Student' ? 'text-white' : 'text-teal-100 hover:text-white'
            }`}
          >
            <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
              {role === 'Student' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span>Student</span>
          </button>
        </div>

        {/* Card Body & Form */}
        <div className="p-8 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2 rounded-md text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="flex items-center rounded-md overflow-hidden bg-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#008ca5] transition-all">
              <div className="bg-[#475569] text-white p-3 flex items-center justify-center w-11 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-[#E2E8F0] text-slate-800 placeholder-slate-500 px-4 py-3 font-semibold text-xs tracking-wider uppercase focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center rounded-md overflow-hidden bg-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#008ca5] transition-all relative">
              <div className="bg-[#475569] text-white p-3 flex items-center justify-center w-11 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-[#E2E8F0] text-slate-800 placeholder-slate-500 px-4 py-3 font-semibold text-xs tracking-wider uppercase focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-500 hover:text-slate-800"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* CAPTCHA Display Area */}
            <div className="flex items-center justify-center gap-3 py-0.5">
              <div className="relative border border-slate-300 rounded-md overflow-hidden bg-slate-50 shadow-inner">
                <canvas ref={canvasRef} width={170} height={44} className="block cursor-pointer" onClick={generateCaptcha} title="Click to refresh CAPTCHA" />
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="p-2 text-slate-500 hover:text-[#008ca5] hover:bg-slate-100 rounded-full transition-colors"
                title="Generate New Code"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* CAPTCHA Input */}
            <div className="rounded-md overflow-hidden bg-[#E2E8F0] focus-within:ring-2 focus-within:ring-[#008ca5] transition-all">
              <input
                type="text"
                placeholder="Enter Above Code"
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value);
                  if (error) setError('');
                }}
                className="w-full bg-[#E2E8F0] text-slate-800 placeholder-slate-500 px-4 py-2.5 font-medium text-xs focus:outline-none text-center"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end pt-0.5">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-[#008ca5] hover:underline font-semibold text-xs transition-colors"
              >
                Forgot Password ?
              </button>
            </div>

            {/* Primary LOGIN Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full bg-[#008ca5] hover:bg-[#00798f] active:bg-[#00687a] text-white font-bold tracking-wider py-3 rounded-md text-sm uppercase transition-colors shadow-md shadow-[#008ca5]/20 cursor-pointer"
              >
                LOGIN
              </button>
            </div>
          </form>

          {/* Development Helper Quick Fill Pills */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 font-medium mb-1.5">
              <Sparkles className="w-3 h-3 text-[#008ca5]" />
              <span>Demo Quick Login</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => handleRoleChange('CDC')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-all ${
                  role === 'CDC'
                    ? 'bg-[#008ca5]/10 border-[#008ca5] text-[#008ca5]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                CDC (cdc/cdc123)
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('Mentor')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-all ${
                  role === 'Mentor'
                    ? 'bg-[#008ca5]/10 border-[#008ca5] text-[#008ca5]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Mentor (mentor/mentor123)
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('Student')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-all ${
                  role === 'Student'
                    ? 'bg-[#008ca5]/10 border-[#008ca5] text-[#008ca5]'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Student (student/student123)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <footer className="relative z-10 text-center text-xs font-semibold text-slate-500 tracking-wide mt-4">
        © 2026 Technical Intelligence. All rights reserved. &nbsp;|&nbsp; Data • People • Progress
      </footer>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
};
