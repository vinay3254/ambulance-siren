import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, Wifi, WifiOff, LayoutGrid, FileText, BarChart3, Radio } from 'lucide-react';
import { useWebSocket } from './hooks/useWebSocket';
import IntersectionGrid from './components/IntersectionGrid';
import AcousticDetector from './components/AcousticDetector';
import LaneTable from './components/LaneTable';
import EventLog from './components/EventLog';
import ControlsBar from './components/ControlsBar';

const DEFAULT_LANES = {
  north: ['red', 'red'],
  south: ['green', 'green'],
  east: ['red'],
  west: ['red']
};

function App() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const wsUrl = 'ws://localhost:8000/ws';
  const { status, events, isConnected } = useWebSocket(wsUrl);

  const handleToggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const lanes = status?.lanes || DEFAULT_LANES;
  const audioLevel = status?.audio_level ?? 0;
  const sirenDetected = status?.siren_detected ?? false;
  const confidence = status?.confidence ?? 0;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-primary/30">
      {/* Premium Background Layering */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-slate-950/50 backdrop-blur-xl px-6 py-3">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20"
              >
                <Activity className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none text-white uppercase italic">AmbuSafe</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-[9px] opacity-40 font-mono tracking-[0.2em] uppercase">Tactical Response Node</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4 border-r border-white/5 pr-6 mr-6">
                <div className="text-right">
                  <div className="text-[9px] font-black uppercase opacity-30 tracking-widest">Active System</div>
                  <div className="text-[11px] font-bold text-slate-400">V2.4.1-STABLE</div>
                </div>
                <Shield className="w-5 h-5 opacity-20" />
              </div>

              <motion.div 
                initial={false}
                animate={{ backgroundColor: isConnected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${isConnected ? 'border-success/20 text-success' : 'border-error/20 text-error'} font-mono text-[10px] font-black uppercase tracking-widest`}
              >
                {isConnected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                {isConnected ? 'Signal Locked' : 'Searching...'}
              </motion.div>
            </div>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto w-full p-4 md:p-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ControlsBar 
              isConnected={isConnected}
              onToggleAudio={handleToggleAudio}
              audioEnabled={audioEnabled}
            />
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 space-y-8">
              <motion.section 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-2 px-3">
                      <LayoutGrid className="w-4 h-4 text-primary" />
                      <span className="text-[11px] font-black uppercase tracking-widest opacity-60">Spatial Matrix Visualizer</span>
                    </div>
                  </div>
                  <IntersectionGrid lanes={lanes} />
                </div>
              </motion.section>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.section 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden group hover:border-white/10 transition-colors"
                >
                  <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-white/[0.02]">
                    <BarChart3 className="w-4 h-4 text-secondary" />
                    <span className="text-[11px] font-black uppercase tracking-widest opacity-60">Resource Distribution</span>
                  </div>
                  <LaneTable lanes={lanes} />
                </motion.section>

                <motion.section 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden group hover:border-white/10 transition-colors"
                >
                  <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-white/[0.02]">
                    <FileText className="w-4 h-4 text-info" />
                    <span className="text-[11px] font-black uppercase tracking-widest opacity-60">System Audit Trail</span>
                  </div>
                  <EventLog events={events} />
                </motion.section>
              </div>
            </div>

            <aside className="xl:col-span-4">
              <motion.section 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl h-full sticky top-24 overflow-hidden group hover:border-white/10 transition-colors"
              >
                <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-white/[0.02]">
                  <Radio className="w-4 h-4 text-primary" />
                  <span className="text-[11px] font-black uppercase tracking-widest opacity-60">Spectral Acoustic Monitoring</span>
                </div>
                <AcousticDetector 
                  audioLevel={audioLevel}
                  sirenDetected={sirenDetected}
                  confidence={confidence}
                />
              </motion.section>
            </aside>
          </div>
        </main>
        
        <footer className="mt-auto py-8 border-t border-white/[0.03] bg-slate-950/80">
          <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30 text-[10px] font-mono uppercase tracking-[0.2em]">
            <p>© 2026 NEXUS PROTOCOL - NODE 0x8F2</p>
            <div className="flex gap-8">
              <span>LATENCY: 4MS</span>
              <span>UPTIME: 99.98%</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
