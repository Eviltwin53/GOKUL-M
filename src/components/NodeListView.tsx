import React, { useState } from 'react';
import { SensorNode } from '../types';
import { HISTORICAL_TELEMETRY } from '../data/mockNodes';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  Cpu, 
  BatteryCharging, 
  Wifi, 
  Activity, 
  Sun, 
  AlertTriangle, 
  Zap, 
  ShieldCheck,
  Layers,
  Sliders
} from 'lucide-react';

interface NodeListViewProps {
  nodes: SensorNode[];
  selectedNode: SensorNode | null;
  onSelectNode: (node: SensorNode) => void;
  onSimulate: (nodeId: string, anomalyType: string) => void;
}

export const NodeListView: React.FC<NodeListViewProps> = ({
  nodes,
  selectedNode,
  onSelectNode,
  onSimulate
}) => {
  const activeNode = selectedNode || nodes[0];
  const [chartMetric, setChartMetric] = useState<'water' | 'smoke' | 'aqi' | 'vibration'>('water');

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                SIH26178 Hardware Architecture
              </span>
              <span className="text-xs font-mono text-slate-400">Qualcomm Edge AI Platform</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Distributed Edge AI Sensor Nodes & TinyML Telemetry
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Autonomous solar-powered sentinels executing TinyML ONNX models locally. Every node detects multi-hazard anomalies in &lt;20ms without relying on cloud connectivity, falling back to buffered LoRa packets during network cutoffs.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-200">Local Decision Engine</div>
              <div className="text-emerald-400 font-mono">100% Edge Autonomous</div>
            </div>
          </div>
        </div>
      </div>

      {/* Node Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {nodes.map(node => {
          const isSelected = node.id === activeNode.id;
          const isCritical = node.edgeAI.localDecision === 'CRITICAL_ALERT';
          return (
            <button
              key={node.id}
              onClick={() => onSelectNode(node)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-mono text-slate-400">{node.id}</span>
                <span className={`w-2 h-2 rounded-full ${
                  isCritical ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'
                }`} />
              </div>
              <div className="font-bold text-xs text-white truncate">{node.name}</div>
              <div className="text-[10px] text-slate-400 mt-1 capitalize">{node.primaryHazard}</div>
              <div className="text-[11px] font-bold text-amber-400 mt-0.5">
                {node.edgeAI.hazardProbability}% Risk
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Node Deep-Dive: Specs + Live Time-Series Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Detailed Hardware & Edge AI Specs (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400">{activeNode.id}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                {activeNode.hardware.connectivity}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{activeNode.name}</h3>
            <p className="text-xs text-slate-400">{activeNode.zone}</p>
          </div>

          {/* Technical Specs List matching Slide 3 & 4 */}
          <div className="space-y-3 text-xs">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-200">Processing & MCU Core:</span>
              </div>
              <div className="font-mono text-white text-xs font-medium">{activeNode.hardware.mcu}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Engine: <span className="text-emerald-400 font-mono">{activeNode.hardware.edgeEngine}</span>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold text-slate-200">Solar Power & Battery Integrity:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] mt-1">
                <div>
                  <span className="text-slate-500">Power Source:</span>
                  <div className="text-white font-medium">{activeNode.hardware.powerSource}</div>
                </div>
                <div>
                  <span className="text-slate-500">Battery Level:</span>
                  <div className="text-emerald-400 font-bold">{activeNode.hardware.batteryLevel}%</div>
                </div>
                <div>
                  <span className="text-slate-500">Solar Yield:</span>
                  <div className="text-amber-300 font-bold">{activeNode.hardware.solarInputWatts} W</div>
                </div>
                <div>
                  <span className="text-slate-500">Signal (RSSI):</span>
                  <div className="text-white font-mono">{activeNode.hardware.rssi} dBm</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-semibold text-slate-200">TinyML Edge Inference Metrics:</span>
              </div>
              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Model Name:</span>
                  <span className="text-white font-mono">{activeNode.edgeAI.model}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">On-Device Latency:</span>
                  <span className="text-emerald-400 font-mono font-bold">{activeNode.edgeAI.inferenceTimeMs} ms</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Anomaly Confidence:</span>
                  <span className="text-amber-400 font-mono font-bold">{(activeNode.edgeAI.anomalyScore * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Duty Cycling Period:</span>
                  <span className="text-slate-300 font-mono">{activeNode.edgeAI.dutyCycleIntervalSec} seconds</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Offline Flash Buffer:</span>
                  <span className="text-slate-300 font-mono">{activeNode.edgeAI.offlineBufferCount} packets</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Controls */}
          <div className="border-t border-slate-800 pt-3">
            <h4 className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              Node Behavior Simulator
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSimulate(activeNode.id, 'flood_surge')}
                className="p-2 rounded-lg text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all font-medium text-left"
              >
                🌊 Flood Inundation Surge
              </button>
              <button
                onClick={() => onSimulate(activeNode.id, 'fire_outbreak')}
                className="p-2 rounded-lg text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all font-medium text-left"
              >
                🔥 Forest Fire Ignition
              </button>
              <button
                onClick={() => onSimulate(activeNode.id, 'landslide_tremor')}
                className="p-2 rounded-lg text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all font-medium text-left"
              >
                ⛰️ Slope Shear / Vibration
              </button>
              <button
                onClick={() => onSimulate(activeNode.id, 'network_outage')}
                className="p-2 rounded-lg text-xs bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all font-medium text-left"
              >
                📶 Cut Cellular (LoRa Mode)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Time-Series Recharts Telemetry (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Live 24-Hour Telemetry Time-Series
              </h3>
              <p className="text-xs text-slate-400">
                Continuous on-device sampling with threshold filtering
              </p>
            </div>

            {/* Metric Switcher */}
            <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setChartMetric('water')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  chartMetric === 'water' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Water Level (m)
              </button>
              <button
                onClick={() => setChartMetric('smoke')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  chartMetric === 'smoke' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Smoke (ppm)
              </button>
              <button
                onClick={() => setChartMetric('aqi')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  chartMetric === 'aqi' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                PM 2.5 Index
              </button>
              <button
                onClick={() => setChartMetric('vibration')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  chartMetric === 'vibration' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Vibration (g)
              </button>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HISTORICAL_TELEMETRY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop 
                      offset="5%" 
                      stopColor={
                        chartMetric === 'water' ? '#06b6d4' : 
                        chartMetric === 'smoke' ? '#f59e0b' : 
                        chartMetric === 'aqi' ? '#a855f7' : '#f43f5e'
                      } 
                      stopOpacity={0.4}
                    />
                    <stop 
                      offset="95%" 
                      stopColor={
                        chartMetric === 'water' ? '#06b6d4' : 
                        chartMetric === 'smoke' ? '#f59e0b' : 
                        chartMetric === 'aqi' ? '#a855f7' : '#f43f5e'
                      } 
                      stopOpacity={0.0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    borderRadius: '0.75rem',
                    color: '#f8fafc',
                    fontSize: '12px'
                  }} 
                />
                
                <Area
                  type="monotone"
                  dataKey={
                    chartMetric === 'water' ? 'waterLevel' : 
                    chartMetric === 'smoke' ? 'smoke' : 
                    chartMetric === 'aqi' ? 'aqi' : 'vibration'
                  }
                  stroke={
                    chartMetric === 'water' ? '#06b6d4' : 
                    chartMetric === 'smoke' ? '#f59e0b' : 
                    chartMetric === 'aqi' ? '#a855f7' : '#f43f5e'
                  }
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#metricGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Current Live Sensor Array Readings */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500">Current Reading</span>
              <div className="text-sm font-bold text-white mt-0.5">
                {chartMetric === 'water' ? `${activeNode.telemetry.waterLevelMeters || 7.85} m` :
                 chartMetric === 'smoke' ? `${activeNode.telemetry.smokePpm || 125} ppm` :
                 chartMetric === 'aqi' ? `${activeNode.telemetry.pm25 || 382} µg/m³` :
                 `${activeNode.telemetry.vibrationG || 0.082} g`}
              </div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500">Hazard Probability</span>
              <div className="text-sm font-bold text-amber-400 mt-0.5">
                {activeNode.edgeAI.hazardProbability}%
              </div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500">Hardware Link</span>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">
                {activeNode.hardware.connectivity}
              </div>
            </div>

            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500">Duty Interval</span>
              <div className="text-sm font-bold text-slate-300 mt-0.5">
                {activeNode.edgeAI.dutyCycleIntervalSec}s
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
