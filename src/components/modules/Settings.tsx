/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useTranslation } from 'react-i18next';
import { Globe, User, Shield, CreditCard, LogOut, MessageSquare } from 'lucide-react';
import { LANGUAGES } from '../../constants';
import { useState } from 'react';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [waEnabled, setWaEnabled] = useState(true);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tighter">{t('common.settings')} <span className="text-[#ccff00]">System</span></h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-1">Control Configuration Area</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Language Section */}
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[40px] space-y-6">
           <div className="flex items-center gap-4 text-[#ccff00]">
              <Globe size={24} />
              <h3 className="text-xl font-bold italic">{t('common.language')}</h3>
           </div>
           
           <div className="space-y-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => i18n.changeLanguage(lang.code)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${i18n.language === lang.code ? 'bg-[#ccff00]/10 border-[#ccff00] text-[#ccff00]' : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700'}`}
                >
                  <div className="flex flex-col items-start">
                     <span className="font-bold">{lang.name}</span>
                     <span className="text-[10px] uppercase font-mono opacity-60 tracking-wider font-medium">{lang.nativeName}</span>
                  </div>
                  {i18n.language === lang.code && <div className="w-2 h-2 bg-[#ccff00] rounded-full shadow-[0_0_10px_#ccff00]" />}
                </button>
              ))}
           </div>

           {/* WA Integration */}
           <div className="pt-6 border-t border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-green-500" />
                    <span className="text-sm font-bold">WhatsApp Alerts</span>
                 </div>
                 <button 
                  onClick={() => setWaEnabled(!waEnabled)}
                  className={`w-12 h-6 rounded-full relative transition-all ${waEnabled ? 'bg-[#ccff00]' : 'bg-zinc-800'}`}
                 >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${waEnabled ? 'left-7 bg-black' : 'left-1'}`} />
                 </button>
              </div>
              <p className="text-[10px] text-zinc-600 leading-relaxed italic">Receive workout reminders and membership expiry alerts directly on your connected number.</p>
           </div>
        </div>

        {/* Profile Section */}
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-[40px] space-y-8 flex flex-col">
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-zinc-800 rounded-[32px] border-2 border-[#ccff00] flex items-center justify-center p-1">
                 <div className="w-full h-full bg-zinc-700 rounded-[24px] flex items-center justify-center">
                    <User size={32} className="text-zinc-500" />
                 </div>
              </div>
              <div>
                 <h3 className="text-2xl font-black tracking-tight">ALEX RIDER</h3>
                 <p className="text-xs text-[#ccff00] font-mono tracking-widest font-bold">MEMBER-ID #X024</p>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black rounded-2xl border border-zinc-800">
                 <div className="flex items-center gap-3 text-zinc-400">
                    <Shield size={16} />
                    <span className="text-sm font-medium">Account Security</span>
                 </div>
                 <ChevronRight size={16} className="text-zinc-600" />
              </div>
              <div className="flex items-center justify-between p-4 bg-black rounded-2xl border border-zinc-800">
                 <div className="flex items-center gap-3 text-zinc-400">
                    <CreditCard size={16} />
                    <span className="text-sm font-medium">Billing History</span>
                 </div>
                 <ChevronRight size={16} className="text-zinc-600" />
              </div>
           </div>

           <div className="pt-4 mt-auto">
              <p className="text-[10px] text-zinc-600 uppercase font-mono tracking-widest text-center">Version 1.0.4 • AI Core Active</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
