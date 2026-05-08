/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Home, 
  Users, 
  Calendar, 
  Dumbbell, 
  Utensils, 
  TrendingUp, 
  Settings, 
  LogOut,
  Bell,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { UserRole } from '../types';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ role, activeTab, onTabChange, onLogout }: SidebarProps) {
  const { t } = useTranslation();

  const menuItems = [
    { id: 'home', icon: Home, label: t('common.dashboard'), roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.MEMBER] },
    { id: 'attendance', icon: UserCheck, label: t('attendance.attendance'), roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.MEMBER] },
    { id: 'members', icon: Users, label: t('common.member'), roles: [UserRole.ADMIN, UserRole.TRAINER] },
    { id: 'workouts', icon: Dumbbell, label: t('plans.workout'), roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.MEMBER] },
    { id: 'diet', icon: Utensils, label: t('plans.diet'), roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.MEMBER] },
    { id: 'progress', icon: TrendingUp, label: 'Progress', roles: [UserRole.MEMBER, UserRole.TRAINER] },
    { id: 'membership', icon: CreditCard, label: 'Membership', roles: [UserRole.ADMIN, UserRole.MEMBER] },
    { id: 'notifications', icon: Bell, label: 'Alerts', roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.MEMBER] },
    { id: 'settings', icon: Settings, label: t('common.settings'), roles: [UserRole.ADMIN, UserRole.TRAINER, UserRole.MEMBER] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="w-64 bg-black border-r border-zinc-800 flex flex-col h-full">
      <div className="p-8">
        <h2 className="text-xl font-bold tracking-tighter text-white">
          LIVE FIT <span className="text-[#ccff00]">GYM</span>
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
              activeTab === item.id 
                ? "bg-[#ccff00]/10 text-[#ccff00]" 
                : "text-zinc-500 hover:text-white hover:bg-zinc-900"
            )}
          >
            {activeTab === item.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute left-0 w-1 h-6 bg-[#ccff00] rounded-r-full"
              />
            )}
            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 1.5} />
            <span className="font-medium text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut size={20} strokeWidth={1.5} />
          <span className="font-medium text-sm tracking-tight">{t('common.logout')}</span>
        </button>
      </div>
    </div>
  );
}
