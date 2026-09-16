import React, { useState, useEffect } from 'react';
import { SensorNode } from './types';
import { INITIAL_NODES } from './data/mockNodes';
import { Navbar } from './components/Navbar';
import { InteractiveMap } from './components/InteractiveMap';
import { NodeListView } from './components/NodeListView';
import { DecisionSupportView } from './components/DecisionSupportView';
import { ArchitecturePresentationView } from './components/ArchitecturePresentationView';
import { QuickSimulateModal } from './components/QuickSimulateModal';
import { ShieldCheck, Heart, Radio, ExternalLink } from 'lucide-react';

export default function App() {
  const [nodes, setNodes] = useState<SensorNode[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<SensorNode | null>(INITIAL_NODES[0]);
  const [activeTab, setActiveTab] = useState<'map' | 'nodes' | 'decision' | 'sih-slides'>('map');
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Fetch initial nodes from backend or fallback to initial data
  useEffect(() => {
    fetch('/api/nodes')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.nodes) {
          setNodes(data.nodes);
          setSelectedNode(data.nodes[0]);
        }
      })
      .catch(() => {
        // use local state fallback
      });
  }, []);

  const handleSimulate = async (nodeId: string, anomalyType: string) => {
    try {
      const res = await fetch(`/api/nodes/${nodeId}/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ simulatedAnomaly: anomalyType })
      });
      const data = await res.json();
      if (data.success && data.node) {
        setNodes(prev => prev.map(n => n.id === nodeId ? data.node : n));
        if (selectedNode?.id === nodeId) {
          setSelectedNode(data.node);
        }
        showNotification(`Simulated ${anomalyType.replace('_', ' ').toUpperCase()} on ${data.node.name}`);
      }
    } catch {
      // Local state fallback if backend call isn't reachable
      setNodes(prev => prev.map(n => {
        if (n.id !== nodeId) return n;
        const updated = { ...n };
        if (anomalyType === 'flood_surge') {
          updated.telemetry = { ...updated.telemetry, waterLevelMeters: 9.4, rainfallMmPerHour: 75 };
          updated.edgeAI = { ...updated.edgeAI, anomalyScore: 0.95, hazardProbability: 96, localDecision: 'CRITICAL_ALERT' };
        } else if (anomalyType === 'fire_outbreak') {
          updated.telemetry = { ...updated.telemetry, smokePpm: 240, tempCelsius: 48.5 };
          updated.edgeAI = { ...updated.edgeAI, anomalyScore: 0.92, hazardProbability: 91, localDecision: 'CRITICAL_ALERT' };
        } else if (anomalyType === 'landslide_tremor') {
          updated.telemetry = { ...updated.telemetry, vibrationG: 0.38, soilMoisturePct: 99 };
          updated.edgeAI = { ...updated.edgeAI, anomalyScore: 0.98, hazardProbability: 97, localDecision: 'CRITICAL_ALERT' };
        } else if (anomalyType === 'network_outage') {
          updated.hardware = { ...updated.hardware, status: 'OFFLINE_BUFFERING' };
          updated.edgeAI = { ...updated.edgeAI, offlineBufferCount: updated.edgeAI.offlineBufferCount + 10 };
        } else {
          updated.edgeAI = { ...updated.edgeAI, anomalyScore: 0.12, hazardProbability: 15, localDecision: 'NORMAL' };
          updated.hardware = { ...updated.hardware, status: 'ONLINE' };
        }
        return updated;
      }));
      showNotification(`Simulated ${anomalyType.replace('_', ' ').toUpperCase()}`);
    }
  };

  const showNotification = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => {
      setStatusNotification(null);
    }, 4000);
  };

  const criticalCount = nodes.filter(n => n.edgeAI.localDecision === 'CRITICAL_ALERT').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white font-sans">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSimulateModal={() => setIsSimulateModalOpen(true)}
        criticalAlertCount={criticalCount}
      />

      {/* Temporary Notification Banner */}
      {statusNotification && (
        <div className="bg-emerald-600/90 text-white text-xs font-semibold py-2 px-4 text-center sticky top-20 z-40 backdrop-blur-md shadow-lg flex items-center justify-center gap-2 animate-in slide-in-from-top-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{statusNotification}</span>
        </div>
      )}

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'map' && (
          <InteractiveMap
            nodes={nodes}
            selectedNode={selectedNode}
            onSelectNode={setSelectedNode}
            onSimulate={handleSimulate}
          />
        )}

        {activeTab === 'nodes' && (
          <NodeListView
            nodes={nodes}
            selectedNode={selectedNode}
            onSelectNode={setSelectedNode}
            onSimulate={handleSimulate}
          />
        )}

        {activeTab === 'decision' && (
          <DecisionSupportView
            nodes={nodes}
            selectedNode={selectedNode}
            onSelectNode={setSelectedNode}
          />
        )}

        {activeTab === 'sih-slides' && (
          <ArchitecturePresentationView />
        )}
      </main>

      {/* Quick Simulate Modal */}
      <QuickSimulateModal
        isOpen={isSimulateModalOpen}
        onClose={() => setIsSimulateModalOpen(false)}
        nodes={nodes}
        onSimulate={handleSimulate}
      />

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-800/80 py-6 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight">ENVIGUARD AI</span>
            <span>•</span>
            <span className="font-mono text-emerald-400">SIH 2026 (Problem Statement ID: SIH26178)</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span>Sponsored by <strong className="text-slate-200">Qualcomm Inc.</strong></span>
            <span>•</span>
            <span>Developed by <strong className="text-emerald-400">NEXT GEN THINMER</strong></span>
            <span>•</span>
            <span>NDMA & IMD Integrated</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
