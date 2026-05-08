/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../types';
import AdminDashboard from './dashboards/AdminDashboard';
import TrainerDashboard from './dashboards/TrainerDashboard';
import MemberDashboard from './dashboards/MemberDashboard';
import Attendance from './modules/Attendance';
import WorkoutPlans from './modules/WorkoutPlans';
import DietPlans from './modules/DietPlans';
import Progress from './modules/Progress';
import Membership from './modules/Membership';
import Notifications from './modules/Notifications';
import Settings from './modules/Settings';

interface DashboardProps {
  role: UserRole;
  tab: string;
}

export default function Dashboard({ role, tab }: DashboardProps) {
  const renderContent = () => {
    switch (tab) {
      case 'home':
        if (role === UserRole.ADMIN) return <AdminDashboard />;
        if (role === UserRole.TRAINER) return <TrainerDashboard />;
        return <MemberDashboard />;
      case 'attendance':
        return <Attendance role={role} />;
      case 'workouts':
        return <WorkoutPlans role={role} />;
      case 'diet':
        return <DietPlans role={role} />;
      case 'progress':
        return <Progress role={role} />;
      case 'membership':
        return <Membership role={role} />;
      case 'notifications':
        return <Notifications role={role} />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="p-12 flex items-center justify-center h-full">
            <h2 className="text-zinc-600 font-mono uppercase tracking-[0.2em] text-sm italic">
              Module [ {tab} ] coming soon in next turn...
            </h2>
          </div>
        );
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
