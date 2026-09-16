import React, { useState } from 'react';
import { SensorNode, HazardType } from '../types';
import { 
  Waves, 
  Flame, 
  Wind, 
  Mountain, 
  Skull, 
  Radio, 
  BatteryCharging, 
  Cpu, 
  AlertCircle,
  ExternalLink,
  Zap,
  Filter
} from 'lucide-react';

interface InteractiveMapProps {
  nodes: SensorNode[];
  selectedNode: SensorNode | null;
  onSelectNode: (node: SensorNode) => void;
  onSimulate: (nodeId: string, anomalyType: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  nodes,
  selectedNode,
  onSelectNode,
  onSimulate
}) => {
  const [hazardFilter, setHazardFilter] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<SensorNode | null>(null);

  const filteredNodes = hazardFilter === 'all' 
    ? nodes 
    : nodes.filter(n => n.primaryHazard === hazardFilter);

  // Map coordinates projection for India map SVG canvas (lat: ~8 to 36 N, lng: ~68 to 97 E)
  // SVG viewBox: 0 0 650 720
  const projectCoordinates = (lat: number, lng: number) => {
    const minLng = 68.0;
    const maxLng = 97.5;
    const minLat = 8.0;
    const maxLat = 37.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 520 + 70;
    // Invert Y because latitude goes upwards
    const y = ((maxLat - lat) / (maxLat - minLat)) * 600 + 60;
    return { x, y };
  };

  const getHazardIcon = (type: HazardType, className = "w-4 h-4") => {
    switch (type) {
      case 'flood':
        return <Waves className={className} />;
      case 'wildfire':
        return <Flame className={className} />;
      case 'landslide':
        return <Mountain className={className} />;
      case 'pollution':
        return <Wind className={className} />;
      case 'gas_leak':
        return <Skull className={className} />;
    }
  };

  const getHazardBadgeColor = (type: HazardType) => {
    switch (type) {
      case 'flood':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'wildfire':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'landslide':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'pollution':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'gas_leak':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    }
  };

  const getStatusDot = (decision: string) => {
    if (decision === 'CRITICAL_ALERT') return 'bg-rose-500 ring-rose-400';
    if (decision === 'ELEVATED_WATCH') return 'bg-amber-500 ring-amber-400';
    return 'bg-emerald-500 ring-emerald-400';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Stats based on Slides 2 & 3 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white tracking-tight">{nodes.length} Active Nodes</div>
            <div className="text-[11px] text-slate-400">Distributed Sentinel Mesh</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white tracking-tight">&lt; 18 ms</div>
            <div className="text-[11px] text-slate-400">Qualcomm TinyML Inference</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <BatteryCharging className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white tracking-tight">Solar + LiFePO4</div>
            <div className="text-[11px] text-slate-400">Low-Power Duty Cycling</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white tracking-tight">
              {nodes.filter(n => n.edgeAI.localDecision === 'CRITICAL_ALERT').length} Hazards
            </div>
            <div className="text-[11px] text-slate-400">NDMA Warning Broadcast</div>
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Filter className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-200">GIS Hazard Filter:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Hazards (6)' },
            { id: 'flood', label: 'Floods & Hydrology' },
            { id: 'wildfire', label: 'Forest Fires' },
            { id: 'landslide', label: 'Landslides / Vibration' },
            { id: 'pollution', label: 'Air Quality (PM2.5)' },
            { id: 'gas_leak', label: 'Toxic Gas Leaks' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setHazardFilter(f.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                hazardFilter === f.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: GIS Map Canvas + Interactive Telemetry Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left GIS Map: 7 cols */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 relative overflow-hidden shadow-xl shadow-slate-950/50">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                National Multi-Hazard GIS Live Mesh (India)
              </h2>
              <p className="text-xs text-slate-400">
                Sensors sample locally • Edge AI scores hazard in ~15ms • LoRaWAN / NB-IoT sync
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> Critical
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> Watch
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Normal
              </span>
            </div>
          </div>

          {/* SVG Map Container */}
          <div className="relative w-full aspect-[650/660] bg-slate-950/80 rounded-xl border border-slate-800/60 overflow-hidden flex items-center justify-center">
            
            {/* Coordinate grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:28px_28px]"></div>

            <svg
              viewBox="0 0 650 680"
              className="w-full h-full select-none"
            >
              <defs>
                {/* Gradient for land mass */}
                <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>

                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* India simplified geographic contour silhouette */}
              <path
                d="M 280 60
                   L 320 80 L 370 120 L 420 130 L 440 180 L 480 190 L 530 195 L 590 200 L 610 230 L 580 260 L 520 250 L 470 270 L 430 300 L 420 340 L 450 370 L 460 410 L 430 450 L 390 510 L 330 580 L 310 630 L 290 640 L 270 590 L 240 520 L 210 460 L 200 410 L 190 350 L 160 330 L 120 320 L 110 290 L 140 260 L 160 220 L 190 190 L 210 140 L 240 100 Z"
                fill="url(#indiaGrad)"
                stroke="#334155"
                strokeWidth="1.8"
                strokeDasharray="4 2"
                opacity="0.85"
              />

              {/* Major river channels (Ganga, Brahmaputra) illustrative lines */}
              <path
                d="M 330 180 Q 400 230 460 270"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.2"
                strokeOpacity="0.4"
              />
              <path
                d="M 480 195 Q 540 220 580 235"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.5"
                strokeOpacity="0.45"
              />

              {/* Sub-Himalayan & Western Ghats topography indication */}
              <path
                d="M 230 460 Q 260 540 280 610"
                fill="none"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="2 4"
                strokeOpacity="0.5"
              />

              {/* Render Node Markers */}
              {filteredNodes.map((node) => {
                const { x, y } = projectCoordinates(node.lat, node.lng);
                const isSelected = selectedNode?.id === node.id;
                const isHovered = hoveredNode?.id === node.id;
                const isCritical = node.edgeAI.localDecision === 'CRITICAL_ALERT';
                const isWatch = node.edgeAI.localDecision === 'ELEVATED_WATCH';

                return (
                  <g
                    key={node.id}
                    transform={`translate(${x}, ${y})`}
                    className="cursor-pointer transition-all duration-300"
                    onClick={() => onSelectNode(node)}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Animated Pulsing Halo for Critical Nodes */}
                    {isCritical && (
                      <circle
                        r="22"
                        className="fill-rose-500/20 stroke-rose-500/40 animate-ping origin-center"
                      />
                    )}
                    {isWatch && (
                      <circle
                        r="18"
                        className="fill-amber-500/20 stroke-amber-500/40 animate-pulse origin-center"
                      />
                    )}

                    {/* Outer ring */}
                    <circle
                      r={isSelected ? "16" : "12"}
                      className={`transition-all duration-200 ${
                        isSelected 
                          ? 'fill-slate-900 stroke-emerald-400 stroke-2' 
                          : isCritical 
                          ? 'fill-slate-900 stroke-rose-500 stroke-2' 
                          : isWatch
                          ? 'fill-slate-900 stroke-amber-500 stroke-2'
                          : 'fill-slate-900 stroke-emerald-500 stroke-2'
                      }`}
                    />

                    {/* Inner core status beacon */}
                    <circle
                      r={isSelected ? "7" : "5"}
                      className={`${
                        isCritical ? 'fill-rose-500' : isWatch ? 'fill-amber-400' : 'fill-emerald-400'
                      }`}
                    />

                    {/* Node label text on canvas */}
                    <text
                      x="16"
                      y="4"
                      className={`text-[10px] font-mono select-none ${
                        isSelected ? 'fill-emerald-300 font-bold' : 'fill-slate-300'
                      }`}
                    >
                      {node.name.split(' ')[0]} ({node.edgeAI.hazardProbability}%)
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredNode && (
              <div 
                className="absolute top-4 left-4 bg-slate-900/95 border border-slate-700 p-3 rounded-xl shadow-2xl backdrop-blur-md max-w-xs z-10 pointer-events-none transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs text-white">{hoveredNode.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getHazardBadgeColor(hoveredNode.primaryHazard)}`}>
                    {hoveredNode.primaryHazard.toUpperCase()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mb-2">{hoveredNode.zone}</div>
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500">Hazard Risk:</span>
                    <div className="font-bold text-amber-400">{hoveredNode.edgeAI.hazardProbability}%</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Inference:</span>
                    <div className="font-mono text-emerald-400">{hoveredNode.edgeAI.inferenceTimeMs} ms</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Connectivity:</span>
                    <div className="font-medium text-slate-200">{hoveredNode.hardware.connectivity}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Power:</span>
                    <div className="font-medium text-slate-200">{hoveredNode.hardware.batteryLevel}% Solar</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Node List Carousel */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => onSelectNode(node)}
                  className={`flex-shrink-0 text-left p-2.5 rounded-xl border transition-all ${
                    isSelected 
                      ? 'bg-slate-800 border-emerald-500/80 shadow-md ring-1 ring-emerald-500/30' 
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`p-1 rounded ${getHazardBadgeColor(node.primaryHazard)}`}>
                      {getHazardIcon(node.primaryHazard, "w-3 h-3")}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white truncate max-w-[130px]">{node.name}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(node.edgeAI.localDecision)}`}></span>
                        <span>{node.edgeAI.hazardProbability}% Risk</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Selected Node Live Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {selectedNode ? (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl shadow-slate-950/50 space-y-4">
              
              {/* Node Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getHazardBadgeColor(selectedNode.primaryHazard)}`}>
                      {selectedNode.primaryHazard.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{selectedNode.id}</span>
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">{selectedNode.name}</h3>
                  <p className="text-xs text-slate-400">{selectedNode.zone}</p>
                </div>

                <div className="text-right">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                    selectedNode.edgeAI.localDecision === 'CRITICAL_ALERT'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                      : selectedNode.edgeAI.localDecision === 'ELEVATED_WATCH'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(selectedNode.edgeAI.localDecision)}`}></span>
                    {selectedNode.edgeAI.localDecision.replace('_', ' ')}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1">Inference: {selectedNode.edgeAI.inferenceTimeMs}ms</div>
                </div>
              </div>

              {/* Edge AI Engine Details (Slide 2 & 3 Highlight) */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    Edge AI / TinyML Core
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Qualcomm Ready</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Model: <span className="text-slate-200 font-semibold">{selectedNode.edgeAI.model}</span>
                </div>
                
                {/* Risk Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Hazard Probability Score:</span>
                    <span className="font-bold text-white">{selectedNode.edgeAI.hazardProbability}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        selectedNode.edgeAI.hazardProbability > 75 
                          ? 'bg-rose-500' 
                          : selectedNode.edgeAI.hazardProbability > 45 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${selectedNode.edgeAI.hazardProbability}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Anomaly Threshold: <strong className="text-slate-200">{(selectedNode.edgeAI.anomalyScore * 100).toFixed(0)}%</strong></span>
                  <span>Sampling Duty Cycle: <strong className="text-slate-200">{selectedNode.edgeAI.dutyCycleIntervalSec}s</strong></span>
                </div>
              </div>

              {/* Live Telemetry Gauges */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-300">Live Multi-Sensor Sampling</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedNode.telemetry.waterLevelMeters !== undefined && (
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Water Depth</div>
                      <div className="text-base font-bold text-cyan-400">
                        {selectedNode.telemetry.waterLevelMeters} m
                      </div>
                    </div>
                  )}

                  {selectedNode.telemetry.rainfallMmPerHour !== undefined && (
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Rainfall Rate</div>
                      <div className="text-base font-bold text-blue-400">
                        {selectedNode.telemetry.rainfallMmPerHour} mm/hr
                      </div>
                    </div>
                  )}

                  {selectedNode.telemetry.smokePpm !== undefined && (
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Smoke / Particulate</div>
                      <div className="text-base font-bold text-amber-400">
                        {selectedNode.telemetry.smokePpm} ppm
                      </div>
                    </div>
                  )}

                  {selectedNode.telemetry.pm25 !== undefined && (
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">PM 2.5 Index</div>
                      <div className="text-base font-bold text-purple-400">
                        {selectedNode.telemetry.pm25} µg/m³
                      </div>
                    </div>
                  )}

                  {selectedNode.telemetry.soilMoisturePct !== undefined && (
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Soil Moisture</div>
                      <div className="text-base font-bold text-emerald-400">
                        {selectedNode.telemetry.soilMoisturePct} %
                      </div>
                    </div>
                  )}

                  {selectedNode.telemetry.vibrationG !== undefined && (
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-[11px] text-slate-400">Seismic Vibration</div>
                      <div className="text-base font-bold text-rose-400">
                        {selectedNode.telemetry.vibrationG} g
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Ambient Temp</div>
                    <div className="text-base font-bold text-slate-200">
                      {selectedNode.telemetry.tempCelsius} °C
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Relative Humidity</div>
                    <div className="text-base font-bold text-slate-200">
                      {selectedNode.telemetry.humidityPct} %
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware & Power Integrity (Slide 4 Highlight) */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Hardware & Power State</span>
                  <span className="text-[10px] text-emerald-400 font-mono">{selectedNode.hardware.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500">MCU:</span>
                    <div className="font-mono text-slate-300 truncate">{selectedNode.hardware.mcu}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Connectivity:</span>
                    <div className="text-slate-300">{selectedNode.hardware.connectivity} ({selectedNode.hardware.rssi} dBm)</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Power:</span>
                    <div className="text-slate-300">{selectedNode.hardware.powerSource} ({selectedNode.hardware.batteryLevel}%)</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Solar Yield:</span>
                    <div className="text-amber-400">{selectedNode.hardware.solarInputWatts} Watts Active</div>
                  </div>
                </div>

                {selectedNode.hardware.status === 'OFFLINE_BUFFERING' && (
                  <div className="bg-amber-950/40 border border-amber-800/60 p-2 rounded-lg text-amber-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Edge-resilience active: {selectedNode.edgeAI.offlineBufferCount} telemetry frames buffered in Flash for LoRa fallback.</span>
                  </div>
                )}
              </div>

              {/* Interactive Presentation Trigger Buttons */}
              <div className="pt-1">
                <div className="text-xs font-semibold text-slate-400 mb-2">SIH Jury Live Demonstration:</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (selectedNode.primaryHazard === 'flood') onSimulate(selectedNode.id, 'flood_surge');
                      else if (selectedNode.primaryHazard === 'wildfire') onSimulate(selectedNode.id, 'fire_outbreak');
                      else if (selectedNode.primaryHazard === 'landslide') onSimulate(selectedNode.id, 'landslide_tremor');
                      else onSimulate(selectedNode.id, 'flood_surge');
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-600/20 text-rose-300 border border-rose-500/40 hover:bg-rose-600/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 text-rose-400" />
                    Trigger Hazard Surge
                  </button>

                  <button
                    onClick={() => onSimulate(selectedNode.id, 'network_outage')}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700/80 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Radio className="w-3.5 h-3.5 text-amber-400" />
                    Cut Cloud / LoRa Buffer
                  </button>

                  <button
                    onClick={() => onSimulate(selectedNode.id, 'normal')}
                    className="col-span-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-950 text-slate-400 border border-slate-800 hover:text-white transition-all text-center"
                  >
                    Reset to Baseline Normal
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
              <Radio className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-300">Select a sentinel node on the map</p>
              <p className="text-xs text-slate-500 mt-1">Click on any marker to inspect real-time TinyML telemetry and trigger hazard surge simulations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
