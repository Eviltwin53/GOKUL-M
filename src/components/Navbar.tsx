import React from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  MapPin, 
  Radio, 
  FileText, 
  AlertTriangle, 
  Activity,
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'map' | 'nodes' | 'decision' | 'sih-slides';
  setActiveTab: (tab: 'map' | 'nodes' | 'decision' | 'sih-slides') => void;
  onOpenSimulateModal: () => void;
  criticalAlertCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSimulateModal,
  criticalAlertCount
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      {/* Top micro-banner for SIH 2026 accreditation */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950/40 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 text-[11px]">
            SMART INDIA HACKATHON 2026
          </span>
          <span className="text-slate-400">|</span>
          <span className="font-mono text-emerald-400 font-medium">PS ID: SIH26178</span>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline text-slate-300 font-medium">Theme: Disaster Management (Hardware)</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-400">Partner: <span className="text-white font-semibold">Qualcomm Inc.</span></span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Team: <span className="text-emerald-400 font-semibold">NEXT GEN THINMER</span></span>
        </div>
      </div>

      {/* Main navigation toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand & Project Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('map')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <ShieldAlert className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">
                  ENVIGUARD <span className="text-emerald-400 font-extrabold">AI</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Edge Mesh
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Distributed Environmental Intelligence Network
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
            <button
              id="nav-tab-map"
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'map'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              GIS Hazard Command
            </button>

            <button
              id="nav-tab-nodes"
              onClick={() => setActiveTab('nodes')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'nodes'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              Edge Nodes & TinyML
            </button>

            <button
              id="nav-tab-decision"
              onClick={() => setActiveTab('decision')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                activeTab === 'decision'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Radio className="h-3.5 w-3.5" />
              Early Warning (Act)
              {criticalAlertCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-pulse">
                  {criticalAlertCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-slides"
              onClick={() => setActiveTab('sih-slides')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'sih-slides'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              SIH Project Blueprint
            </button>
          </nav>

          {/* Quick Simulation CTA & Status */}
          <div className="flex items-center gap-3">
            <button
              id="btn-simulate-hazard"
              onClick={onOpenSimulateModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-semibold hover:from-amber-400 hover:to-rose-400 transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>Simulate Hazard Incident</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
              activeTab === 'map' ? 'bg-emerald-600 text-white' : 'text-slate-400'
            }`}
          >
            GIS Command
          </button>
          <button
            onClick={() => setActiveTab('nodes')}
            className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
              activeTab === 'nodes' ? 'bg-emerald-600 text-white' : 'text-slate-400'
            }`}
          >
            Edge Nodes
          </button>
          <button
            onClick={() => setActiveTab('decision')}
            className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
              activeTab === 'decision' ? 'bg-emerald-600 text-white' : 'text-slate-400'
            }`}
          >
            Early Warning ({criticalAlertCount})
          </button>
          <button
            onClick={() => setActiveTab('sih-slides')}
            className={`flex-shrink-0 px-3 py-1 rounded-md text-xs font-medium ${
              activeTab === 'sih-slides' ? 'bg-emerald-600 text-white' : 'text-slate-400'
            }`}
          >
            SIH Blueprint
          </button>
        </div>
      </div>
    </header>
  );
};
