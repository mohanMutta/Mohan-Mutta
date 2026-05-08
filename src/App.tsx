/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { COLORS } from './constants';
import { UserRole } from './types';

// Components
import SplashScreen from './components/SplashScreen';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Sidebar from './components/Sidebar';

export default function App() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ role: UserRole } | null>(null);
  const [currentTab, setCurrentTab] = useState('home');

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black">
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Login onLogin={(role) => setUser({ role })} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-screen overflow-hidden"
          >
            <Sidebar 
              role={user.role} 
              activeTab={currentTab} 
              onTabChange={setCurrentTab}
              onLogout={() => setUser(null)}
            />
            <main className="flex-1 overflow-y-auto bg-[#050505] relative">
              <div className="absolute top-0 right-0 p-4 z-50">
                <select 
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  value={i18n.language}
                  className="bg-zinc-900 border border-zinc-800 text-xs rounded-full px-3 py-1 outline-none focus:border-[#ccff00]"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="te">తెలుగు</option>
                </select>
              </div>
              <Dashboard role={user.role} tab={currentTab} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

