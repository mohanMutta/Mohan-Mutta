/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreditCard, ShieldCheck, AlertCircle, Clock } from 'lucide-react';

export default function Membership({ role }: { role: string }) {
  const plans = [
    { name: 'Basic', price: '₹999', features: ['Gym Access', 'Locker Room'], color: 'border-zinc-800' },
    { name: 'Pro', price: '₹1,999', features: ['Gym Access', 'Trainer Support', 'Diet Plan'], color: 'border-[#ccff00]/50 bg-[#ccff00]/5' },
    { name: 'Elite', price: '₹2,999', features: ['All Access', 'Personal Trainer', 'Massage', 'Supplement Kit'], color: 'border-zinc-800' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tighter">Membership <span className="text-[#ccff00]">Vault</span></h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">Status: Active Selection</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <div key={i} className={`p-8 rounded-[40px] border ${plan.color} relative overflow-hidden group`}>
             {plan.name === 'Pro' && (
               <div className="absolute top-6 right-6 px-3 py-1 bg-[#ccff00] text-black text-[10px] font-black rounded-full uppercase tracking-widest">
                 Popular
               </div>
             )}
             <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
             <p className="text-3xl font-black mb-6">{plan.price}<span className="text-xs text-zinc-500 font-medium">/mo</span></p>
             
             <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs font-medium text-zinc-400">
                    <ShieldCheck size={14} className="text-[#ccff00]" /> {f}
                  </li>
                ))}
             </ul>

             <button className="w-full py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-bold hover:bg-[#ccff00] hover:text-black transition-all">
                SELECT PLAN
             </button>
          </div>
        ))}
      </div>

      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[40px] flex items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center">
               <Clock className="text-orange-500" size={28} />
            </div>
            <div>
               <h3 className="text-lg font-bold">Expiry Reminder</h3>
               <p className="text-zinc-500 text-xs italic">Your current plan expires in 14 days.</p>
            </div>
         </div>
         <button className="px-8 py-3 bg-white text-black rounded-full text-xs font-bold hover:bg-[#ccff00] transition-colors">
           RENEW NOW
         </button>
      </div>
    </div>
  );
}
