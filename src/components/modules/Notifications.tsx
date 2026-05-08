/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bell, MessageSquare, AlertTriangle, Info } from 'lucide-react';

export default function Notifications({ role }: { role: string }) {
  const notifications = [
    { type: 'alert', title: 'Membership Expiry', msg: 'Your pro plan is expiring soon. Renew to keep your streak!', time: '2h ago' },
    { type: 'msg', title: 'Trainer Message', msg: 'Coach: Great session today, Alex! Keep it up.', time: '5h ago' },
    { type: 'info', title: 'New Workout', msg: 'Hypertrophy Phase 2 is now available in your plan.', time: '1d ago' },
  ];

  const icons = {
    alert: AlertTriangle,
    msg: MessageSquare,
    info: Info
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tighter">Signal <span className="text-[#ccff00]">Feed</span></h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">Transmission encrypted • {notifications.length} Unread</p>
      </header>

      <div className="space-y-4">
        {notifications.map((n, i) => {
          const Icon = (icons as any)[n.type] || Bell;
          return (
            <div key={i} className="p-6 bg-zinc-900 border border-zinc-800 rounded-3xl flex items-start gap-6 hover:border-[#ccff00]/30 transition-all cursor-pointer group">
               <div className={`p-4 rounded-2xl ${n.type === 'alert' ? 'bg-orange-500/10 text-orange-500' : 'bg-[#ccff00]/10 text-[#ccff00]'}`}>
                  <Icon size={24} />
               </div>
               <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                     <h3 className="font-bold text-white group-hover:text-[#ccff00] transition-colors">{n.title}</h3>
                     <span className="text-[10px] font-mono text-zinc-600">{n.time}</span>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{n.msg}</p>
               </div>
            </div>
          );
        })}
      </div>

      <button className="w-full py-4 rounded-2xl border border-dashed border-zinc-800 text-zinc-600 font-bold text-xs hover:text-zinc-400 hover:border-zinc-700 transition-all uppercase tracking-widest">
        MARK ALL AS READ
      </button>
    </div>
  );
}
