/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Brain, ChevronRight, Play, Info } from 'lucide-react';
import { UserRole } from '../../types';
import { generateWorkoutPlan } from '../../services/geminiService';

export default function WorkoutPlans({ role }: { role: UserRole }) {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const categories = [
    { title: 'Beginner', desc: 'Core movements & mobility', count: 4, color: 'from-blue-500/20' },
    { title: 'Fat Loss', desc: 'High intensity metabolic', count: 6, color: 'from-orange-500/20' },
    { title: 'Muscle Gain', desc: 'Hypertrophy focal focus', count: 12, color: 'from-[#ccff00]/20' },
    { title: 'Advanced', desc: 'Power & performance', count: 8, color: 'from-red-500/20' },
  ];

  const handleAiGen = async () => {
    setLoading(true);
    try {
      const plan = await generateWorkoutPlan('Muscle Gain', 'Intermediate');
      setAiResult(plan);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Workout <span className="text-[#ccff00]">Matrix</span></h1>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">Select logic or generate paths</p>
        </div>
        
        {/* AI Generator CTA */}
        <button 
          onClick={handleAiGen}
          disabled={loading}
          className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-3xl font-bold hover:bg-[#ccff00] transition-all shadow-[0_10px_40px_rgba(255,255,255,0.05)] group disabled:opacity-50"
        >
          <Brain className={`transition-transform duration-500 ${loading ? 'animate-pulse' : 'group-hover:rotate-12'}`} size={20} />
          {loading ? 'CALCULATING...' : 'AI SUGGESTION'}
        </button>
      </header>

      {/* AI Result Area */}
      {aiResult && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-zinc-900 border-2 border-[#ccff00]/30 rounded-[40px] relative overflow-hidden"
        >
           <div className="absolute top-4 right-6 text-[10px] font-mono text-[#ccff00] font-bold tracking-widest flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-ping" />
             AI GENERATED
           </div>
           <h3 className="text-2xl font-black italic uppercase mb-2">{aiResult.name}</h3>
           <p className="text-zinc-400 text-sm mb-8 leading-relaxed">{aiResult.description}</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiResult.exercises.map((ex: any, i: number) => (
                <div key={i} className="p-5 bg-black/40 rounded-2xl border border-zinc-800 flex items-center justify-between">
                   <div>
                      <p className="font-bold text-[#ccff00] text-sm uppercase">{ex.name}</p>
                      <p className="text-xs text-zinc-500 mt-1">{ex.sets} Sets × {ex.reps} Reps</p>
                   </div>
                   <div className="p-2 bg-zinc-800 rounded-xl text-[10px] font-mono text-zinc-400">
                      {ex.restSeconds}S REST
                   </div>
                </div>
              ))}
           </div>
        </motion.div>
      )}

      {/* Traditional Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="group cursor-pointer">
             <div className={`p-8 rounded-[38px] bg-zinc-900 border border-zinc-800 bg-gradient-to-br ${cat.color} to-transparent group-hover:border-[#ccff00]/50 transition-all duration-500`}>
                <div className="flex items-center justify-between mb-10">
                   <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-zinc-800">
                      <Dumbbell size={24} className="text-white" />
                   </div>
                   <span className="text-[10px] font-bold text-zinc-600 bg-black/50 px-3 py-1 rounded-full uppercase tracking-widest">{cat.count} Plans</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 tracking-tighter">{cat.title}</h3>
                <p className="text-zinc-500 text-xs font-medium leading-relaxed mb-6">{cat.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-[#ccff00] opacity-0 group-hover:opacity-100 transition-opacity">
                  VIEW MODULE <ChevronRight size={14} />
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="p-10 bg-zinc-900 border border-zinc-800 rounded-[48px] flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
             <div className="w-32 h-32 bg-zinc-800 rounded-[32px] flex items-center justify-center">
                <Play size={40} className="text-[#ccff00]" strokeWidth={2.5} />
             </div>
             <div className="absolute inset-0 bg-[#ccff00]/10 blur-xl -z-10 rounded-full" />
          </div>
          <div className="flex-1 text-center md:text-left">
             <h3 className="text-xl font-bold mb-2">Technique Archive</h3>
             <p className="text-zinc-500 text-sm leading-relaxed max-w-md">Access over 400+ high-definition demo videos for every machine and free-weight movement in our arsenal.</p>
          </div>
          <button className="px-8 py-3 border border-zinc-800 rounded-full text-xs font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest whitespace-nowrap">
            EXPLORE LIBRARY
          </button>
      </div>
    </div>
  );
}
