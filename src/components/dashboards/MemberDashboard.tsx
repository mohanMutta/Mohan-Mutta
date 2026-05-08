/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, Trophy, Clock, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function MemberDashboard() {
  const nextWorkout = {
    name: "Upper Body Hypertrophy",
    time: "17:30 PM",
    exercises: 8,
    duration: "45 min"
  };

  const streak = 12;

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">Welcome Back, <span className="text-[#ccff00]">Alex</span></h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Day 12 of your transformation streak</p>
        </div>
        
        <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-3xl">
          <div className="flex flex-col items-center px-4 border-r border-zinc-800">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Current Streak</span>
            <div className="flex items-center gap-2">
              <Flame size={20} className="text-[#ccff00]" />
              <span className="text-2xl font-black">{streak}</span>
            </div>
          </div>
          <div className="px-4">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Next Goal</span>
            <p className="text-sm font-bold text-white">15 Day Badge</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Next Workout Card */}
        <div className="lg:col-span-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[40px] relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 bg-[#ccff00] rounded-2xl rotate-[-4deg]">
                <Clock className="text-black" size={32} />
              </div>
              <button className="px-6 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-[#ccff00] transition-all">
                START SESSION
              </button>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">{nextWorkout.name}</h2>
            <div className="flex gap-6 text-sm text-zinc-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#ccff00]" />
                <span>{nextWorkout.exercises} Exercises</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#ccff00]" />
                <span>{nextWorkout.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Card */}
        <div className="p-8 bg-[#ccff00] rounded-[40px] flex flex-col justify-between">
          <Star className="text-black mb-8" size={32} fill="black" />
          <div>
            <h3 className="text-2xl font-black text-black leading-tight mb-4 italic uppercase">
              "YOU DON'T HAVE TO BE GREAT TO START, BUT YOU HAVE TO START TO BE GREAT."
            </h3>
            <p className="text-black/60 text-xs font-bold font-mono tracking-widest">– ZIG ZIGLAR</p>
          </div>
        </div>
      </div>

      {/* Progress Mini Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Weight', 'Body Fat', 'BMI'].map((metric, i) => (
          <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl">
            <p className="text-zinc-500 text-xs font-bold uppercase mb-2 tracking-widest">{metric}</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">78.5</span>
              <span className="text-xs text-green-500 mb-1.5 font-bold">▼ 0.2kg</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
