import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Waves, Gauge, Zap } from 'lucide-react';

const AcousticDetector = ({ audioLevel = 0, sirenDetected = false, confidence = 0 }) => {
  const barCount = 32;
  const activeBarCount = Math.floor((audioLevel / 100) * barCount);

  return (
    <div className={`flex flex-col h-full p-8 transition-all duration-700 ${sirenDetected ? 'bg-error/5' : ''}`}>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border ${sirenDetected ? 'bg-error/10 border-error/20 animate-pulse' : 'bg-primary/10 border-primary/20'}`}>
            <Waves className={`w-5 h-5 ${sirenDetected ? 'text-error' : 'text-primary'}`} />
          </div>
          <div>
            <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Acoustic Spec</h2>
            <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">Spectral Domain // Real-time</p>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 border ${
          sirenDetected 
            ? 'bg-error text-white border-error shadow-error/20 animate-glow' 
            : 'bg-white/5 text-slate-500 border-white/10'
        }`}>
          {sirenDetected ? 'PRIORITY_1_SIGNAL' : 'IDLE_MONITORING'}
        </div>
      </div>

      {/* Advanced Spectral Visualizer */}
      <div className="relative flex-1 bg-slate-950/60 backdrop-blur-2xl rounded-[2.5rem] p-10 mb-10 border border-white/5 shadow-inner overflow-hidden group">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="flex items-end justify-between h-56 gap-1 relative z-10">
          {Array.from({ length: barCount }).map((_, i) => {
            const isActive = i < activeBarCount;
            const heightFactor = 0.3 + (Math.sin(i * 0.4) * 0.3) + Math.random() * 0.4;
            const heightPercent = isActive ? (20 + audioLevel * heightFactor) : 5;
            
            return (
              <motion.div
                key={i}
                initial={{ height: '5%' }}
                animate={{ 
                  height: `${Math.min(heightPercent, 100)}%`,
                  backgroundColor: isActive 
                    ? (sirenDetected ? '#ef4444' : '#3b82f6') 
                    : 'rgba(255,255,255,0.05)'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`w-full rounded-full ${isActive && (sirenDetected ? 'shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'shadow-[0_0_15px_rgba(59,130,246,0.3)]')}`}
              />
            );
          })}
        </div>

        {/* Floating Scan Label */}
        <div className="absolute bottom-4 right-10 flex items-center gap-2 opacity-20 group-hover:opacity-40 transition-opacity">
          <Zap className="w-3 h-3" />
          <span className="text-[9px] font-black font-mono uppercase tracking-[0.3em]">DFT_STREAM_RX</span>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-white/[0.02] rounded-3xl p-6 border border-white/[0.05] hover:bg-white/[0.04] transition-all group/stat">
          <div className="flex items-center gap-2 mb-3">
            <Gauge className="w-3.5 h-3.5 opacity-20 group-hover/stat:opacity-100 transition-opacity" />
            <span className="text-[10px] font-black uppercase opacity-30 tracking-widest font-mono">Amplitude</span>
          </div>
          <div className={`text-4xl font-black font-mono italic ${sirenDetected ? 'text-error' : 'text-primary'}`}>
            {audioLevel.toFixed(1)}<span className="text-xs opacity-20 ml-1 not-italic tracking-normal font-sans">dB</span>
          </div>
        </div>
        
        <div className="bg-white/[0.02] rounded-3xl p-6 border border-white/[0.05] hover:bg-white/[0.04] transition-all group/stat">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-3.5 h-3.5 opacity-20 group-hover/stat:opacity-100 transition-opacity" />
            <span className="text-[10px] font-black uppercase opacity-30 tracking-widest font-mono">Confidence</span>
          </div>
          <div className={`text-4xl font-black font-mono italic ${
            confidence > 0.7 ? 'text-error' : confidence > 0.4 ? 'text-warning' : 'text-success'
          }`}>
            {(confidence * 100).toFixed(0)}<span className="text-xs opacity-20 ml-1 not-italic tracking-normal font-sans">%</span>
          </div>
        </div>
      </div>

      {/* Detection Confidence Slider */}
      <div className="space-y-4 px-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black uppercase opacity-30 tracking-[0.2em] font-mono">Model Probability Distribution</span>
          <span className="badge badge-ghost border-white/5 font-mono text-[10px] font-black">{(confidence * 100).toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-white/5 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence * 100}%` }}
            className={`h-full rounded-full ${
              confidence > 0.7 
                ? 'bg-gradient-to-r from-error to-orange-500 shadow-glow-error' 
                : confidence > 0.4 
                ? 'bg-gradient-to-r from-warning to-yellow-300' 
                : 'bg-gradient-to-r from-success to-primary shadow-glow-primary'
            }`}
          />
        </div>
      </div>

      {/* Notification Area */}
      <AnimatePresence>
        {sirenDetected && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-10 p-5 bg-error/10 border border-error/20 rounded-[1.5rem] flex items-center gap-5 shadow-2xl"
          >
            <div className="p-3 bg-error text-white rounded-xl shadow-glow-error">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-xs uppercase tracking-[0.2em] text-error mb-1 italic">Emergency Detected</h3>
              <p className="text-[10px] opacity-60 uppercase font-bold leading-relaxed">Intersection cycle override in progress // Priority clear enabled</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AcousticDetector;
