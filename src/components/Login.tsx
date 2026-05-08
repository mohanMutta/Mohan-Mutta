/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { UserRole } from '../types';
import { Dumbbell, ShieldCheck, User, Users, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const { t } = useTranslation();
  const [accessId, setAccessId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const id = accessId.toUpperCase().trim();

    // Secure Role Identification Logic
    if (id === 'ADMIN-XP') {
      onLogin(UserRole.ADMIN);
    } else if (id.startsWith('TRN-')) {
      // Logic for Trainer IDs (e.g., TRN-101, TRN-502)
      onLogin(UserRole.TRAINER);
    } else if (id.startsWith('MBR-') || /^\d+$/.test(id)) {
      // Logic for Member IDs (e.g., MBR-1001 or numeric IDs)
      onLogin(UserRole.MEMBER);
    } else {
      setError('INVALID ACCESS CODE. ACCESS DENIED.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ccff00]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ccff00]/5 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-[40px] relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#ccff00] rounded-2xl flex items-center justify-center rotate-3 shadow-[0_0_40px_rgba(204,255,0,0.4)]">
            <Dumbbell className="text-black w-8 h-8" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white tracking-tight mb-2">Access Control</h2>
        <p className="text-zinc-500 text-center text-sm mb-10 italic">Enter your unique identity code</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={accessId}
              onChange={(e) => {
                setAccessId(e.target.value);
                setError('');
              }}
              placeholder="ID NUMBER (e.g. TRN-101)"
              className="w-full bg-black border border-zinc-800 text-[#ccff00] px-6 py-4 rounded-2xl font-mono text-center tracking-[0.2em] outline-none focus:border-[#ccff00] transition-all placeholder:text-zinc-700 placeholder:text-[10px]"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-[10px] font-black text-center mt-3 tracking-widest animate-pulse">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#ccff00] text-black py-4 rounded-2xl font-black text-sm tracking-widest flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(204,255,0,0.3)] transition-all active:scale-95"
          >
            INITIALIZE AUTH <ArrowRight size={18} strokeWidth={3} />
          </button>
        </form>

        <div className="mt-12 grid grid-cols-1 gap-4">
           <div className="flex items-center gap-4 p-4 bg-black/40 border border-zinc-800 rounded-2xl">
              <ShieldCheck className="text-zinc-600" size={18} />
              <div className="text-[10px] font-mono text-zinc-500">
                <span className="text-zinc-400">ADMIN:</span> Unique master key required.
              </div>
           </div>
           <div className="flex items-center gap-4 p-4 bg-black/40 border border-zinc-800 rounded-2xl">
              <Users className="text-zinc-600" size={18} />
              <div className="text-[10px] font-mono text-zinc-500">
                <span className="text-zinc-400">STAFF/MEMBERS:</span> Use assigned HR/Gym ID.
              </div>
           </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
            <p className="text-[9px] text-zinc-700 font-mono italic">Demo codes: ADMIN-XP, TRN-101, MBR-5001</p>
        </div>
      </motion.div>
    </div>
  );
}
