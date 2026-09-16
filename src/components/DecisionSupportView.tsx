import React, { useState } from 'react';
import { SensorNode, DisasterAdvice } from '../types';
import { 
  Radio, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  Users, 
  MapPin, 
  ArrowRight,
  RefreshCw,
  Send
} from 'lucide-react';

interface DecisionSupportViewProps {
  nodes: SensorNode[];
  selectedNode: SensorNode | null;
  onSelectNode: (node: SensorNode) => void;
}

export const DecisionSupportView: React.FC<DecisionSupportViewProps> = ({
  nodes,
  selectedNode,
  onSelectNode
}) => {
  const activeNode = selectedNode || nodes[0];
  const [loadingAI, setLoadingAI] = useState(false);
  const [advice, setAdvice] = useState<DisasterAdvice | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [broadcastLanguage, setBroadcastLanguage] = useState<'en' | 'hi'>('en');

  // Trigger Gemini AI advisor call via server endpoint
  const handleGenerateAIAdvice = async () => {
    setLoadingAI(true);
    try {
      const response = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodeId: activeNode.id,
          hazardType: activeNode.primaryHazard,
          location: activeNode.zone,
          telemetry: activeNode.telemetry,
          severity: activeNode.edgeAI.localDecision
        })
      });
      const data = await response.json();
      if (data.success && data.advice) {
        setAdvice(data.advice);
      }
    } catch (err) {
      console.error('Failed to get AI advice:', err);
    } finally {
      setLoadingAI(false);
    }
  };

  // Text-to-Speech Siren & Broadcast Announcement Preview
  const handlePlayVoice = (text: string, lang: string) => {
    if (!('speechSynthesis' in window)) return;
    
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                STAGE 5: ACT — Early Warning & Decision Support
              </span>
              <span className="text-xs font-mono text-slate-400">NDMA & CAP Protocol Aligned</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Actionable Alerts & Multi-Tier Authority Response
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Shifting from reactive disaster relief to proactive risk prevention. Edge AI detects the threat and immediately generates bilingual community sirens, NDMA SOP actions, and SDRF troop mobilizations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateAIAdvice}
              disabled={loadingAI}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 active:scale-95"
            >
              {loadingAI ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{loadingAI ? 'Synthesizing...' : 'Generate Gemini SOP Directive'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Node Selector Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <span className="text-xs font-semibold text-slate-400 flex-shrink-0">Active Incident Node:</span>
        {nodes.map(n => {
          const isSelected = n.id === activeNode.id;
          return (
            <button
              key={n.id}
              onClick={() => {
                onSelectNode(n);
                setAdvice(null); // reset advice for new node
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {n.name} ({n.edgeAI.hazardProbability}%)
            </button>
          );
        })}
      </div>

      {/* Main Grid: Authority Action Plan + Citizen Bilingual Broadcast */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Authority Incident Command & SOP (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Incident Overview Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400">
                  {advice?.ndmaProtocolCode || "NDMA-PROTOCOL-ACT-2026"}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {advice?.incidentTitle || `${activeNode.name} — Threat Mitigation`}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeNode.zone}</span>
                  <span>•</span>
                  <span className="font-mono text-amber-400">Risk Score: {activeNode.edgeAI.hazardProbability}%</span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                <ShieldAlert className="w-4 h-4" />
                {advice?.threatLevel || (activeNode.edgeAI.hazardProbability > 70 ? 'CRITICAL' : 'ELEVATED')}
              </div>
            </div>

            {/* Immediate Actions for District Authorities (Slide 5: Authorities) */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Mandatory Immediate Actions for District Collector & Emergency Operations:
              </h4>
              <ul className="space-y-2 text-xs">
                {(advice?.immediateActionsAuthorities || [
                  "Activate District Emergency Operation Center (DEOC) & alert SDRF/NDRF Battalions.",
                  "Enforce section 144 around dangerous river causeways and riparian flood zones.",
                  "Pre-position high-discharge dewatering pumps and motorized inflatable rescue boats (IRBs).",
                  "Trigger automated siren broadcasts via local Panchayat public address horns."
                ]).map((action, idx) => (
                  <li key={idx} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 flex items-start gap-2.5 text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resource Dispatch & Staging */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-cyan-400" />
                First Responder & Equipment Dispatch Matrix:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">SDRF / NDRF Units</div>
                  <div className="font-semibold text-white mt-0.5">
                    {advice?.resourceDispatch?.sdrfTeams || "2 Battalions (48 personnel)"}
                  </div>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">Specialized Gear</div>
                  <div className="font-semibold text-white mt-0.5 truncate">
                    {advice?.resourceDispatch?.equipment?.[0] || "Inflatable Rescue Boats & Pumps"}
                  </div>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500">Medical Triage Staging</div>
                  <div className="font-semibold text-white mt-0.5 truncate">
                    {advice?.resourceDispatch?.medicalStagingArea || "District Civil Hospital Wing"}
                  </div>
                </div>
              </div>
            </div>

            {/* Edge Resilience Note (Slide 4: Network outages) */}
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-300 flex items-start gap-2.5">
              <Radio className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-400" />
              <div>
                <span className="font-bold">Edge Resiliency Guarantee: </span>
                <span>
                  {advice?.edgeResilienceNote || 
                    "Local Qualcomm/ESP32 sensor node buffered 100% of telemetry frames in flash storage and triggered local warning horn via LoRa relay without waiting for cloud packet confirmation."}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Hyperlocal Community Warning & Audio Broadcast (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Public Siren & Voice Broadcast Card (Slide 5: Communities) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  Hyperlocal Citizen Warning
                </h3>
                <p className="text-xs text-slate-400">Panchayat siren & Common Alerting Protocol (CAP)</p>
              </div>

              {/* Language Switcher */}
              <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setBroadcastLanguage('en')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    broadcastLanguage === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setBroadcastLanguage('hi')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    broadcastLanguage === 'hi' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  हिंदी (Hindi)
                </button>
              </div>
            </div>

            {/* Broadcast Message Box */}
            <div className="bg-slate-950 border border-rose-500/30 rounded-xl p-4 relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between text-[11px] text-rose-400 font-mono font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  EMERGENCY SIREN BROADCAST
                </span>
                <span>CH-868 LoRaWAN</span>
              </div>

              <p className="text-sm font-medium text-slate-100 leading-relaxed">
                {broadcastLanguage === 'hi'
                  ? (advice?.communityWarningHindi || "चेतावनी: नदी का जलस्तर खतरे के निशान से ऊपर बढ़ रहा है। निचले इलाकों के निवासी तुरंत ऊंचे सुरक्षित राहत शिविरों में जाएं।")
                  : (advice?.communityWarningEnglish || "URGENT FLOOD ALERT: Rapid hydrological rise detected in Brahmaputra basin. Residents in low-lying riparian sectors must evacuate immediately to designated higher ground shelters.")
                }
              </p>

              {/* Audio Speech Synthesis Button */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <span className="text-[11px] text-slate-500">Public Address Audio Synthesis:</span>
                <button
                  onClick={() => {
                    const textToSpeak = broadcastLanguage === 'hi'
                      ? (advice?.communityWarningHindi || "चेतावनी: नदी का जलस्तर खतरे के निशान से ऊपर बढ़ रहा है।")
                      : (advice?.communityWarningEnglish || "Urgent flood alert. Evacuate low lying areas immediately.");
                    handlePlayVoice(textToSpeak, broadcastLanguage);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isPlayingAudio
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Stop Siren</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Play Siren & Voice</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Designated Evacuation Corridors */}
            <div>
              <h4 className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4 text-cyan-400" />
                Designated Safe Evacuation Corridors:
              </h4>
              <div className="space-y-1.5 text-xs">
                {(advice?.evacuationCorridors || [
                  "Route 7A Elevated Bypass to District Stadium High Shelter",
                  "Eastern Ring Road towards Primary Health Center Safe Zone"
                ]).map((corridor, idx) => (
                  <div key={idx} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{corridor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick SMS & WhatsApp Dispatch Simulator */}
            <div className="border-t border-slate-800 pt-3">
              <div className="text-[11px] text-slate-400 mb-2">Simulate Mass Citizen Cell Broadcast:</div>
              <button
                onClick={() => alert(`[EnviGuard Broadcast Simulated]\nTransmitted priority warning to 42,500 citizen handsets in ${activeNode.zone} via Cell Broadcast Service (CBS).`)}
                className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700/80 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                Broadcast to 42,500 Registered Handsets (CBS)
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
