import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Bell, Siren, Car, AlertCircle, ShieldAlert, Settings as SettingsIcon, Database } from 'lucide-react';

const EventLog = ({ events = [] }) => {
  const getEventConfig = (type) => {
    const configs = {
      'siren_detected': { class: 'text-error bg-error/10', icon: <Siren className="w-3.5 h-3.5" /> },
      'ambulance_detected': { class: 'text-warning bg-warning/10', icon: <Car className="w-3.5 h-3.5" /> },
      'lane_change': { class: 'text-success bg-success/10', icon: <AlertCircle className="w-3.5 h-3.5" /> },
      'emergency_override': { class: 'text-error bg-error/10 animate-pulse', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
      'system': { class: 'text-info bg-info/10', icon: <SettingsIcon className="w-3.5 h-3.5" /> }
    };
    return configs[type] || { class: 'text-slate-500 bg-slate-500/10', icon: <Database className="w-3.5 h-3.5" /> };
  };

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit' 
      });
    } catch {
      return timestamp;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/40">
      <div className="p-8 border-b border-white/[0.03] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-info/10 rounded-xl border border-info/20">
            <Terminal className="w-5 h-5 text-info" />
          </div>
          <div>
            <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">System Journal</h2>
            <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">Live Telemetry Stream</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-white/[0.03] border border-white/[0.05] rounded-lg text-[9px] font-black font-mono opacity-40 uppercase tracking-widest">
          {events.length} Recs
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-thin">
        <AnimatePresence initial={false}>
          {events.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              className="flex flex-col items-center justify-center h-full grayscale"
            >
              <Database className="w-16 h-16 mb-4 opacity-10" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Awaiting Data Link...</p>
            </motion.div>
          ) : (
            [...events].reverse().slice(0, 50).map((event, index) => {
              const config = getEventConfig(event.type);
              return (
                <motion.div
                  key={`${event.timestamp}-${index}`}
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="group flex flex-col gap-3 p-4 rounded-2xl hover:bg-white/[0.02] transition-all border border-transparent hover:border-white/[0.03] overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] opacity-20 font-black font-mono tracking-tighter">{formatTimestamp(event.timestamp)}</span>
                      <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] ${config.class}`}>
                        {config.icon}
                        {event.type.replace('_', ' ')}
                      </div>
                    </div>
                    {event.confidence && (
                      <div className="flex items-center gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${event.confidence * 100}%` }}
                            className="h-full bg-primary"
                          />
                        </div>
                        <span className="text-[9px] font-black font-mono">{(event.confidence * 100).toFixed(0)}%</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400 font-medium pl-2 border-l-2 border-white/[0.05] ml-1 group-hover:text-slate-200 transition-colors">
                    <span className="opacity-30 mr-2">&gt;</span>
                    {event.message || event.type}
                  </p>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-white/[0.01] border-t border-white/[0.03] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success shadow-glow-success animate-pulse"></div>
          <span className="text-[9px] font-black uppercase opacity-20 tracking-widest font-mono italic">Link_Established // Latency_4ms</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] rounded-xl transition-all text-[9px] font-black uppercase tracking-widest opacity-40 hover:opacity-100">
          <Bell className="w-3 h-3" />
          Mute
        </button>
      </div>
    </div>
  );
};

export default EventLog;
