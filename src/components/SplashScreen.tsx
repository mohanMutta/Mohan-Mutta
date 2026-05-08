/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Dumbbell } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <Dumbbell className="w-20 h-20 text-[#ccff00]" strokeWidth={1.5} />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-[#ccff00]/20 blur-2xl rounded-full -z-10"
        />
      </motion.div>
      
      <div className="mt-8 overflow-hidden">
        <motion.h1
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
          className="text-4xl font-bold tracking-tighter text-white"
        >
          LIVE FIT <span className="text-[#ccff00]">GYM</span>
        </motion.h1>
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
        className="h-px bg-gradient-to-r from-transparent via-[#ccff00] to-transparent mt-4"
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 text-xs tracking-widest text-zinc-500 uppercase font-mono"
      >
        ELEVATE YOUR POTENTIAL
      </motion.p>
    </div>
  );
}
