import { motion } from 'framer-motion';
import { Target, Navigation2 } from 'lucide-react';

const IntersectionGrid = ({ lanes }) => {
  const renderTrafficLight = (state) => {
    return (
      <div className="flex flex-col gap-1.5 p-1.5 bg-slate-950/80 rounded-lg border border-white/5 shadow-2xl backdrop-blur-md">
        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${state === 'red' ? 'bg-error shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-slate-800'}`}></div>
        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${state === 'yellow' ? 'bg-warning shadow-[0_0_15px_rgba(234,179,8,0.8)]' : 'bg-slate-800'}`}></div>
        <div className={`w-3 h-3 rounded-full transition-all duration-500 ${state === 'green' ? 'bg-success shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-slate-800'}`}></div>
      </div>
    );
  };

  const renderLane = (direction, index, state) => {
    const isVertical = direction === 'N' || direction === 'S';
    return (
      <motion.div 
        key={`${direction}-${index}`} 
        className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center gap-3`}
      >
        {renderTrafficLight(state)}
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-black font-mono text-slate-500 tracking-tighter uppercase">{direction}0{index + 1}</span>
          <div className="w-1 h-1 rounded-full bg-primary/20"></div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-8 lg:p-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">Sector Grid 04</h2>
          </div>
          <p className="text-[10px] font-mono opacity-30 uppercase tracking-[0.2em] ml-1">Spatial synchronization active // Node: L-23</p>
        </div>
        
        <div className="flex gap-4 p-2 bg-white/[0.02] border border-white/5 rounded-2xl">
          {['red', 'yellow', 'green'].map(color => (
            <div key={color} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/40">
              <span className={`w-2 h-2 rounded-full ${
                color === 'red' ? 'bg-error shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 
                color === 'yellow' ? 'bg-warning shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 
                'bg-success shadow-[0_0_8px_rgba(34,197,94,0.5)]'
              }`}></span>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{color}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative aspect-square max-w-lg mx-auto rounded-[3rem] overflow-hidden border border-white/[0.05] bg-slate-950/40 shadow-inner group">
        {/* Radar Scanning Effect */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-primary/20 via-transparent to-transparent"
          ></motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[80%] h-[80%] border border-white/5 rounded-full"></div>
            <div className="absolute w-[60%] h-[60%] border border-white/5 rounded-full"></div>
            <div className="absolute w-[40%] h-[40%] border border-white/5 rounded-full"></div>
            <div className="absolute w-[20%] h-[20%] border border-white/5 rounded-full"></div>
          </div>
        </div>

        {/* Road Structure Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-0 w-full h-[28%] -translate-y-1/2 bg-white/[0.02] backdrop-blur-sm border-y border-white/[0.03]"></div>
          <div className="absolute left-1/2 top-0 h-full w-[28%] -translate-x-1/2 bg-white/[0.02] backdrop-blur-sm border-x border-white/[0.03]"></div>
          
          {/* Compass Elements */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] font-black opacity-20 font-mono tracking-[0.4em]">NORTH</div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-black opacity-20 font-mono tracking-[0.4em]">SOUTH</div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[9px] font-black opacity-20 font-mono tracking-[0.4em]">EAST</div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-black opacity-20 font-mono tracking-[0.4em]">WEST</div>
        </div>

        <div className="relative z-10 w-full h-full grid grid-cols-5 grid-rows-5 p-12">
          {/* North lanes */}
          <div className="col-start-3 row-start-1 flex justify-center items-start gap-8">
            {lanes?.north?.map((state, i) => renderLane('N', i, state)) || []}
          </div>
          
          {/* South lanes */}
          <div className="col-start-3 row-start-5 flex justify-center items-end gap-8">
            {lanes?.south?.map((state, i) => renderLane('S', i, state)) || []}
          </div>
          
          {/* East lanes */}
          <div className="col-start-5 row-start-3 flex justify-end items-center gap-8">
            {lanes?.east?.map((state, i) => renderLane('E', i, state)) || []}
          </div>
          
          {/* West lanes */}
          <div className="col-start-1 row-start-3 flex justify-start items-center gap-8">
            {lanes?.west?.map((state, i) => renderLane('W', i, state)) || []}
          </div>

          {/* Core Node */}
          <div className="col-start-3 row-start-3 flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
                borderColor: ['rgba(59,130,246,0.1)', 'rgba(59,130,246,0.3)', 'rgba(59,130,246,0.1)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-28 h-28 rounded-3xl bg-slate-950/80 border border-primary/20 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group/core"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20 animate-scan-line"></div>
              <Navigation2 className="w-8 h-8 text-primary/40 mb-2 rotate-45" />
              <span className="text-[10px] text-primary font-black tracking-[0.3em] font-mono">CORE_OS</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntersectionGrid;
