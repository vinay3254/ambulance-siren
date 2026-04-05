import { motion } from 'framer-motion';
import { Power, Settings, AlertTriangle, ChevronDown, Cpu, Activity } from 'lucide-react';

const ControlsBar = ({ isConnected, onToggleAudio, audioEnabled = false }) => {
  return (
    <div className="relative group">
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      
      <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-wrap items-center gap-8">
          {/* System Heartbeat */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase opacity-30 tracking-[0.2em] font-mono">System Heartbeat</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                <Activity className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-black font-mono tracking-tighter text-slate-300 italic">TX_ACTIVE</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-primary/40 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="h-10 w-px bg-white/5 hidden lg:block"></div>

          {/* Engine Load */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase opacity-30 tracking-[0.2em] font-mono">Neural Engine Load</span>
            <div className="flex items-center gap-3">
              <Cpu className="w-4 h-4 opacity-20" />
              <div className="w-32 h-1.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.05]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '64%' }}
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                />
              </div>
              <span className="text-[10px] font-black font-mono opacity-40">64%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onToggleAudio}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl ${
              audioEnabled 
                ? 'bg-primary text-white shadow-primary/20 border border-primary/50' 
                : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
            }`}
          >
            <Power className={`w-4 h-4 ${audioEnabled ? 'animate-pulse' : ''}`} />
            {audioEnabled ? 'Engine Online' : 'Initialize'}
          </motion.button>

          <div className="flex items-center gap-2">
            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all text-slate-400 group/btn">
              <Settings className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-500" />
            </button>
            <button className="flex items-center gap-2 px-4 py-3 bg-error/10 hover:bg-error/20 border border-error/20 rounded-xl transition-all text-error font-black text-xs uppercase tracking-widest">
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsBar;
