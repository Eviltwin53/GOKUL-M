import React from 'react';
import { SensorNode } from '../types';
import { 
  X, 
  Zap, 
  Waves, 
  Flame, 
  Mountain, 
  Wind, 
  Skull, 
  Radio, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface QuickSimulateModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: SensorNode[];
  onSimulate: (nodeId: string, anomalyType: string) => void;
}

export const QuickSimulateModal: React.FC<QuickSimulateModalProps> = ({
  isOpen,
  onClose,
  nodes,
  onSimulate
}) => {
  if (!isOpen) return null;

  const scenarios = [
    {
      title: 'Brahmaputra Flash Flood Crest',
      targetNodeId: 'NODE-AS-01',
      anomaly: 'flood_surge',
      icon: Waves,
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
      description: 'Water level rises +1.8m, rainfall exceeds 80mm/hr. Edge AI triggers local HydroCast-V3 critical alarm.'
    },
    {
      title: 'Garhwal Forest Canopy Wildfire',
      targetNodeId: 'NODE-UK-02',
      anomaly: 'fire_outbreak',
      icon: Flame,
      color: 'from-amber-500/20 to-rose-500/20 border-amber-500/30 text-amber-400',
      description: 'Smoke ppm spikes to 265, ambient temp rises to 50°C. PyroGuard-Tiny detects combustion anomaly.'
    },
    {
      title: 'Wayanad Slope Liquefaction & Vibration',
      targetNodeId: 'NODE-KL-03',
      anomaly: 'landslide_tremor',
      icon: Mountain,
      color: 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400',
      description: 'Soil saturation reaches 99%, seismic vibration spikes to 0.38g. GeoSlide alerts 1.4s before cloud link.'
    },
    {
      title: 'Simulate Cellular Outage (LoRa Fallback)',
      targetNodeId: 'NODE-AS-01',
      anomaly: 'network_outage',
      icon: Radio,
      color: 'from-purple-500/20 to-slate-500/20 border-purple-500/30 text-purple-400',
      description: 'Cuts cloud socket. Node switches to offline Flash buffer and broadcasts critical packets over LoRaWAN.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Interactive Incident Simulator</h3>
              <p className="text-xs text-slate-400">Trigger multi-hazard anomalies to test Edge AI detection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenarios List */}
        <div className="space-y-2.5">
          {scenarios.map((sc, idx) => {
            const Icon = sc.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  onSimulate(sc.targetNodeId, sc.anomaly);
                  onClose();
                }}
                className={`w-full text-left p-3.5 rounded-xl border bg-gradient-to-r ${sc.color} hover:brightness-110 transition-all flex items-start gap-3`}
              >
                <div className="p-2 rounded-lg bg-slate-950/60 flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>{sc.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">Target: {sc.targetNodeId}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{sc.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Reset All Button */}
        <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
          <button
            onClick={() => {
              nodes.forEach(n => onSimulate(n.id, 'normal'));
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-950 border border-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Nodes to Normal
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
