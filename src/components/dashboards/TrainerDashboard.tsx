/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Users, FileText, MessageSquare, TrendingUp, ArrowLeft, Dumbbell, Utensils, Calendar } from 'lucide-react';
import { useState } from 'react';
import WorkoutPlans from '../modules/WorkoutPlans';
import DietPlans from '../modules/DietPlans';
import Progress from '../modules/Progress';
import Attendance from '../modules/Attendance';
import { UserRole } from '../../types';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function TrainerDashboard() {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const recentActivities = [
    { user: "Priya Sharma", action: "Updated weight", time: "10m ago" },
    { user: "Rahul Reddy", action: "Completed Leg Day", time: "1h ago" },
    { user: "Siva Kumar", action: "New message", time: "2h ago" },
  ];

  const assignedMembers = [
    { id: 'm1', name: "Priya Sharma", progress: 65, goal: "Fat Loss", lastActivity: "2h ago", status: "On Track" },
    { id: 'm2', name: "Rahul Reddy", progress: 42, goal: "Muscle Gain", lastActivity: "5h ago", status: "Needs Support" },
    { id: 'm3', name: "Siva Kumar", progress: 88, goal: "Fitness", lastActivity: "1d ago", status: "Exceeding" },
    { id: 'm4', name: "Ananya V.", progress: 20, goal: "Strength", lastActivity: "3h ago", status: "On Track" },
  ];

  if (selectedMember) {
    return (
      <div className="space-y-10 pb-20">
        <button 
          onClick={() => setSelectedMember(null)}
          className="flex items-center gap-2 text-zinc-500 hover:text-[#ccff00] transition-colors font-mono text-[10px] uppercase tracking-widest font-bold"
        >
          <ArrowLeft size={16} /> BACK TO ROSTER
        </button>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-10">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-zinc-800 rounded-[32px] flex items-center justify-center border-2 border-[#ccff00]">
                <Users size={32} className="text-[#ccff00]" />
             </div>
             <div>
                <h1 className="text-4xl font-bold tracking-tighter">{selectedMember.name}</h1>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">Goal: {selectedMember.goal} • Identity: {selectedMember.id}</p>
             </div>
          </div>
          <div className="flex gap-3">
             <button className="px-6 py-3 bg-[#ccff00] text-black rounded-2xl font-black text-[10px] tracking-widest uppercase hover:scale-[1.02] transition-transform">
                SEND PROTOCOL
             </button>
             <button className="px-6 py-3 bg-zinc-800 text-white rounded-2xl font-black text-[10px] tracking-widest uppercase hover:bg-zinc-700 transition-colors">
                MESSAGE ATHLETE
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <section className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Dumbbell size={20} className="text-[#ccff00]" /> ACTIVE WORKOUT
              </h3>
              <div className="p-1 bg-zinc-900 rounded-[40px] border border-zinc-800">
                <WorkoutPlans role={UserRole.TRAINER} />
              </div>
           </section>

           <section className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Utensils size={20} className="text-[#ccff00]" /> NUTRITION LOG
              </h3>
              <div className="p-1 bg-zinc-900 rounded-[40px] border border-zinc-800">
                <DietPlans role={UserRole.TRAINER} />
              </div>
           </section>

           <section className="space-y-4 lg:col-span-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp size={20} className="text-[#ccff00]" /> BIOLOGICAL EVOLUTION
              </h3>
              <div className="p-1 bg-zinc-900 rounded-[40px] border border-zinc-800">
                <Progress role={UserRole.TRAINER} />
              </div>
           </section>

           <section className="space-y-4 lg:col-span-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Calendar size={20} className="text-[#ccff00]" /> ATTENDANCE RECORD
              </h3>
              <div className="p-1 bg-zinc-900 rounded-[40px] border border-zinc-800">
                <Attendance role={UserRole.TRAINER} />
              </div>
           </section>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      <header>
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Trainer <span className="text-[#ccff00]">Portal</span></h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Guiding 24 athletes to their peak form</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[32px] group hover:border-[#ccff00]/50 transition-all">
              <Users className="text-[#ccff00] mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-1">Active Members</h3>
              <p className="text-4xl font-black text-white">24</p>
           </div>
           <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[32px] group hover:border-[#ccff00]/50 transition-all text-white">
              <FileText className="text-blue-500 mb-6" size={32} />
              <h3 className="text-2xl font-bold mb-1">Pending Plans</h3>
              <p className="text-4xl font-black">04</p>
           </div>
           
           {/* Actions */}
           <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <button className="p-6 bg-[#ccff00] text-black rounded-[24px] font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                 <FileText size={18} /> CREATE NEW PLAN
              </button>
              <button className="p-6 bg-zinc-800 text-white rounded-[24px] font-bold text-sm flex items-center justify-center gap-2 hover:bg-zinc-700 transition-colors">
                 <MessageSquare size={18} /> BROADCAST MSG
              </button>
           </div>
        </div>

        {/* Activity Feed */}
        <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-[40px]">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
             <TrendingUp size={20} className="text-[#ccff00]" />
             Live <span className="text-zinc-500">Activity</span>
           </h3>
           <div className="space-y-6">
              {recentActivities.map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-bold">{activity.user}</p>
                    <p className="text-xs text-zinc-500">{activity.action}</p>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600">{activity.time}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Roster Section */}
      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[40px]">
        <h3 className="text-2xl font-bold mb-8">Roster <span className="text-zinc-600">Management</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {assignedMembers.map((member, i) => (
             <div 
               key={i} 
               onClick={() => setSelectedMember(member)}
               className="p-6 bg-black/40 border border-zinc-800 rounded-3xl hover:border-[#ccff00]/30 transition-all group cursor-pointer"
             >
                <div className="flex justify-between items-start mb-6">
                   <div>
                      <h4 className="text-lg font-bold group-hover:text-[#ccff00] transition-colors">{member.name}</h4>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{member.goal}</p>
                   </div>
                   <span className={cn(
                     "px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase",
                     member.status === 'On Track' ? 'bg-green-500/10 text-green-500' :
                     member.status === 'Exceeding' ? 'bg-[#ccff00]/10 text-[#ccff00]' :
                     'bg-red-500/10 text-red-500'
                   )}>
                    {member.status}
                   </span>
                </div>

                <div className="space-y-2 mb-6">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                      <span className="text-zinc-500">Plan Progress</span>
                      <span className="text-white">{member.progress}%</span>
                   </div>
                   <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${member.progress}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-[#ccff00]" 
                      />
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
                   <span className="text-[10px] text-zinc-600 font-mono italic">Last active: {member.lastActivity}</span>
                   <button className="text-[10px] font-black text-[#ccff00] hover:underline uppercase tracking-widest">
                     ADJUST PLAN
                   </button>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
