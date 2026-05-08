/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Brain, Droplets, Zap, Coffee, Sun, Moon } from 'lucide-react';
import { UserRole } from '../../types';
import { generateDietPlan } from '../../services/geminiService';

export default function DietPlans({ role }: { role: UserRole }) {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleAiGen = async () => {
    setLoading(true);
    try {
      const plan = await generateDietPlan('Weight Loss', 'Indian Budget');
      setAiResult(plan);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const mealIcons = {
    'Breakfast': Coffee,
    'Lunch': Sun,
    'Dinner': Moon,
    'Snack': Zap
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Fuel <span className="text-[#ccff00]">Source</span></h1>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">Smart nutrition architecture</p>
        </div>
        
        <button 
          onClick={handleAiGen}
          disabled={loading}
          className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-3xl font-bold hover:bg-[#ccff00] transition-all disabled:opacity-50"
        >
          <Brain size={20} className={loading ? 'animate-spin' : ''} />
          {loading ? 'ANALYZING...' : 'AI DIET PLAN'}
        </button>
      </header>

      {/* AI Result Area */}
      {aiResult && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-zinc-900 border-2 border-[#ccff00]/30 rounded-[40px]"
        >
           <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="flex-1 min-w-[200px]">
                <h3 className="text-2xl font-black italic uppercase mb-2">{aiResult.name}</h3>
                <p className="text-zinc-500 text-sm">Custom nutrition profile based on metabolic requirements</p>
              </div>
              <div className="flex gap-4">
                 <div className="px-6 py-4 bg-black rounded-3xl border border-zinc-800 text-center">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Target</p>
                    <p className="text-xl font-bold text-[#ccff00]">{aiResult.calorieTarget} kcal</p>
                 </div>
                 <div className="px-6 py-4 bg-black rounded-3xl border border-zinc-800 text-center">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Water</p>
                    <p className="text-xl font-bold text-blue-400">{aiResult.waterTarget}L</p>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              {aiResult.meals.map((meal: any, i: number) => {
                const Icon = (mealIcons as any)[meal.time] || Coffee;
                return (
                  <div key={i} className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-black/40 rounded-3xl border border-zinc-900 hover:border-zinc-800 transition-colors">
                     <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon size={24} className="text-[#ccff00]" />
                     </div>
                     <div className="flex-1">
                        <p className="text-xs font-bold text-[#ccff00] uppercase tracking-tighter mb-1">{meal.time}</p>
                        <p className="text-white font-medium">{meal.description}</p>
                     </div>
                     <div className="flex gap-8 border-l border-zinc-800 pl-8">
                        <div>
                           <p className="text-[10px] font-bold text-zinc-600 uppercase mb-1">Calories</p>
                           <p className="text-sm font-bold text-zinc-300">{meal.calories}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-zinc-600 uppercase mb-1">Protein</p>
                           <p className="text-sm font-bold text-zinc-300">{meal.protein}g</p>
                        </div>
                     </div>
                  </div>
                );
              })}
           </div>
        </motion.div>
      )}

      {/* Water Tracker Overlay Card */}
      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[44px] flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center relative">
               <Droplets className="text-blue-500" size={32} />
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="absolute inset-0 bg-blue-500 blur-lg rounded-full"
               />
            </div>
            <div>
               <h3 className="text-xl font-bold">Hydration Logic</h3>
               <p className="text-zinc-500 text-xs">Current intake: 1.5L / 3.0L</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-bold transition-all ${i <= 3 ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-transparent border-zinc-800 text-zinc-600'}`}>
                {i}
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
