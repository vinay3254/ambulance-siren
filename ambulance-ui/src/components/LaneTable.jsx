import { motion } from 'framer-motion';
import { Circle, Info, Timer, ArrowUpRight } from 'lucide-react';

const LaneTable = ({ lanes }) => {
  const getStatusBadge = (state) => {
    const statusMap = {
      'green': { label: 'Go', class: 'text-success bg-success/10 border-success/20 shadow-glow-success', icon: <Circle className="w-2 h-2 fill-current" /> },
      'yellow': { label: 'Wait', class: 'text-warning bg-warning/10 border-warning/20', icon: <Circle className="w-2 h-2 fill-current" /> },
      'red': { label: 'Stop', class: 'text-error bg-error/10 border-error/20 shadow-glow-error', icon: <Circle className="w-2 h-2 fill-current" /> }
    };
    const config = statusMap[state] || { label: 'N/A', class: 'text-slate-500 bg-slate-500/10 border-slate-500/20', icon: <Circle className="w-2 h-2" /> };
    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${config.class}`}>
        {config.icon}
        {config.label}
      </div>
    );
  };

  const renderDirectionRows = (direction, laneStates) => {
    if (!laneStates || laneStates.length === 0) return null;

    return laneStates.map((state, index) => {
      return (
        <motion.tr 
          layout
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          key={`${direction}-${index}`} 
          className="group hover:bg-white/[0.02] transition-colors border-b border-white/[0.02] last:border-0"
        >
          <td className="py-4 pl-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[10px] font-black opacity-30 group-hover:opacity-100 group-hover:text-primary transition-all">
                {direction[0]}
              </div>
              <div>
                <div className="font-black text-[11px] uppercase tracking-tight text-slate-300 italic">{direction}</div>
                <div className="text-[9px] opacity-20 font-mono tracking-tighter uppercase">Vector 0{index + 1}</div>
              </div>
            </div>
          </td>
          <td className="py-4 text-center font-mono text-[10px] font-black opacity-20">#0{index + 1}</td>
          <td className="py-4">{getStatusBadge(state)}</td>
          <td className="py-4 pr-6 text-right">
            <div className="flex items-center justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-mono font-black italic">68MS</span>
              <ArrowUpRight className="w-3 h-3 text-primary" />
            </div>
          </td>
        </motion.tr>
      );
    });
  };

  const totalLanes = Object.values(lanes || {}).reduce((sum, arr) => sum + (arr?.length || 0), 0);

  return (
    <div className="flex flex-col h-full bg-slate-950/40">
      <div className="p-8 border-b border-white/[0.03] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/10 rounded-xl border border-secondary/20">
            <Info className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Asset Matrix</h2>
            <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em]">Node Distribution</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black font-mono italic leading-none">{totalLanes}</span>
          <span className="text-[9px] font-black uppercase opacity-20 tracking-widest mt-1">Active Lanes</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.03] text-[9px] font-black uppercase tracking-[0.2em] opacity-30">
              <th className="py-4 pl-6">Directional Segment</th>
              <th className="py-4 text-center">L_ID</th>
              <th className="py-4">Status</th>
              <th className="py-4 pr-6 text-right">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.01]">
            {lanes?.north && renderDirectionRows('North', lanes.north)}
            {lanes?.south && renderDirectionRows('South', lanes.south)}
            {lanes?.east && renderDirectionRows('East', lanes.east)}
            {lanes?.west && renderDirectionRows('West', lanes.west)}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-white/[0.01] border-t border-white/[0.03] flex justify-center gap-10">
        {['red', 'yellow', 'green'].map(color => (
          <div key={color} className="flex items-center gap-3">
            <span className={`w-1.5 h-1.5 rounded-full ${
              color === 'red' ? 'bg-error shadow-glow-error' : 
              color === 'yellow' ? 'bg-warning' : 
              'bg-success shadow-glow-success'
            }`}></span>
            <span className="text-[9px] font-black uppercase opacity-20 tracking-widest font-mono">{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaneTable;
