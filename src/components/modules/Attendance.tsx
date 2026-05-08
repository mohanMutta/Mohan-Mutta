/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { QrCode, ClipboardList, ScanLine, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'motion/react';
import { UserRole } from '../../types';

export default function Attendance({ role }: { role: UserRole }) {
  const [view, setView] = useState<'scan' | 'history'>('scan');
  const [checkedIn, setCheckedIn] = useState(false);

  const mockHistory = [
    { date: 'Today', time: '05:30 PM', method: 'QR', status: 'In' },
    { date: 'Yesterday', time: '10:15 AM', method: 'Manual', status: 'In' },
    { date: '06 May 2026', time: '06:01 PM', method: 'QR', status: 'In' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Attendance <span className="text-[#ccff00]">System</span></h1>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">Status: {checkedIn ? 'Active Session' : 'Offline'}</p>
        </div>
        <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-2xl">
          <button 
            onClick={() => setView('scan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'scan' ? 'bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.2)]' : 'text-zinc-500 hover:text-white'}`}
          >
            CHECK-IN
          </button>
          <button 
            onClick={() => setView('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === 'history' ? 'bg-[#ccff00] text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            HISTORY
          </button>
        </div>
      </header>

      {view === 'scan' ? (
        <div className="flex flex-col items-center justify-center py-12">
          {role === UserRole.MEMBER ? (
            <div className="space-y-8 text-center flex flex-col items-center">
              <div className="p-10 bg-white rounded-[40px] shadow-[0_0_60px_rgba(255,255,255,0.1)] relative">
                <QRCodeSVG 
                  value="LIVEFIT-MEMBER-001" 
                  size={200}
                  fgColor="#000000"
                  level="H"
                />
                <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-black rounded-[32px] pointer-events-none opacity-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Your Access Key</h3>
                <p className="text-zinc-500 text-sm max-w-xs">Show this QR at the entrance terminal to mark your session.</p>
              </div>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setCheckedIn(!checkedIn)}
                className={`flex items-center gap-2 px-10 py-4 rounded-full font-bold transition-all ${checkedIn ? 'bg-zinc-800 text-zinc-500' : 'bg-[#ccff00] text-black'}`}
              >
                {checkedIn ? <Check size={18} /> : <ScanLine size={18} />}
                {checkedIn ? 'ALREADY CHECKED IN' : 'MANUAL CHECK-IN'}
              </motion.button>
            </div>
          ) : (
            <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 text-center">
                <div className="mx-auto w-24 h-24 bg-zinc-800 rounded-3xl flex items-center justify-center mb-6">
                    <ScanLine className="text-[#ccff00]" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">SCANNER TERMINAL</h3>
                <p className="text-zinc-500 mb-8 max-w-md mx-auto">Use the front-desk camera to scan member codes. Manual override available below.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="p-6 bg-zinc-800 rounded-3xl border border-zinc-700 font-bold hover:border-[#ccff00] transition-all">
                    LAUNCH FRONT CAMERA
                  </button>
                   <button className="p-6 bg-black border border-zinc-800 rounded-3xl font-bold hover:bg-zinc-900 transition-all">
                    MANUAL ENTRY (ID)
                  </button>
                </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {mockHistory.map((entry, i) => (
            <div key={i} className="flex items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-3xl group hover:border-zinc-700 transition-all">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-[#ccff00]/10 transition-colors">
                    <ClipboardList size={20} className="text-zinc-400 group-hover:text-[#ccff00]" />
                 </div>
                 <div>
                    <p className="font-bold">{entry.date}</p>
                    <p className="text-xs text-zinc-500 font-mono italic">{entry.time} • via {entry.method}</p>
                 </div>
              </div>
              <div className="flex items-center gap-2 text-green-500 text-xs font-bold px-4 py-2 bg-green-500/10 rounded-full border border-green-500/20">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                 PRESENT
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
