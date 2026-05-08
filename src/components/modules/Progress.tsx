/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrendingUp, Scale, Camera, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const weightData = [
  { day: 'W1', weight: 82.5 },
  { day: 'W2', weight: 81.8 },
  { day: 'W3', weight: 81.0 },
  { day: 'W4', weight: 80.2 },
  { day: 'W5', weight: 79.5 },
  { day: 'W6', weight: 78.8 },
];

export default function Progress({ role }: { role: string }) {
  return (
    <div className="space-y-10 pb-20">
      <header>
        <h1 className="text-3xl font-bold tracking-tighter">Evolution <span className="text-[#ccff00]">Path</span></h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">Data-driven biological monitoring</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-3 p-8 bg-zinc-900 border border-zinc-800 rounded-[40px]">
           <div className="flex items-center justify-between mb-10">
              <div>
                 <h3 className="text-xl font-bold">Weight Trajectory</h3>
                 <p className="text-zinc-500 text-xs font-mono uppercase">Last 6 Weeks</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-[#ccff00] text-black rounded-full font-bold text-xs">
                <Scale size={14} /> LOG WEIGHT
              </button>
           </div>

           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={weightData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                 <XAxis 
                   dataKey="day" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }}
                   dy={10}
                 />
                 <YAxis 
                   domain={['dataMin - 1', 'dataMax + 1']} 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 600 }}
                 />
                 <Tooltip 
                   contentStyle={{ backgroundColor: '#000', border: '1px solid #27272a', borderRadius: '16px' }}
                   labelStyle={{ display: 'none' }}
                   itemStyle={{ color: '#ccff00', fontWeight: 'bold' }}
                 />
                 <Line 
                   type="monotone" 
                   dataKey="weight" 
                   stroke="#ccff00" 
                   strokeWidth={4} 
                   dot={{ fill: '#ccff00', r: 6, strokeWidth: 4, stroke: '#000' }}
                   activeDot={{ r: 8, strokeWidth: 0 }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Sidebar Mini-Modules */}
        <div className="space-y-6">
           <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[40px] text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Camera className="text-[#ccff00]" size={28} />
              </div>
              <h3 className="text-lg font-bold mb-2">Visual Log</h3>
              <p className="text-zinc-500 text-xs mb-6">Upload monthly photos to see the visible shift.</p>
              <button className="w-full py-3 border border-zinc-800 rounded-full text-[10px] font-black tracking-widest hover:bg-zinc-800 transition-all uppercase">
                GALLERY
              </button>
           </div>

           <div className="p-8 bg-[#ccff00] rounded-[40px]">
              <TrendingUp className="text-black mb-4" size={24} />
              <h3 className="text-xl font-black italic text-black leading-tight">BODY FAT DROPPED BY 2.4%</h3>
              <div className="h-1 bg-black/10 w-full mt-4 rounded-full overflow-hidden">
                 <div className="h-full bg-black w-[70%]" />
              </div>
           </div>
        </div>
      </div>

      {/* Detail Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'BMI', val: '24.2', status: 'Healthy' },
           { label: 'Muscle Mass', val: '64kg', status: '+1.2kg' },
           { label: 'BMR', val: '1,840', status: 'Daily' },
           { label: 'Chest', val: '104cm', status: 'Incr.' },
         ].map((m, i) => (
           <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl group hover:border-[#ccff00]/30 transition-all">
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-1">{m.label}</p>
              <h4 className="text-2xl font-bold mb-1 group-hover:text-[#ccff00] transition-colors">{m.val}</h4>
              <p className="text-[10px] text-zinc-500 font-bold">{m.status}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
