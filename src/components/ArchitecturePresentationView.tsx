import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Cpu, 
  Radio, 
  Sun, 
  ShieldCheck, 
  Map, 
  Layers, 
  Users, 
  Building2, 
  TreePine, 
  FileText, 
  BookOpen, 
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

export const ArchitecturePresentationView: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(1);

  const slides = [
    { id: 1, title: 'Cover & SIH Metadata' },
    { id: 2, title: 'Proposed Solution & Flow' },
    { id: 3, title: 'Technical Approach & Stack' },
    { id: 4, title: 'Feasibility & Risk Matrix' },
    { id: 5, title: 'Impact & Multi-Sector Benefits' },
    { id: 6, title: 'Research & References' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Slide Navigation Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">
            SIH 2026 Presentation Blueprint & Technical Dossier
          </h2>
        </div>

        {/* Slide Indicator Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {slides.map(slide => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(slide.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeSlide === slide.id
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Slide {slide.id}: {slide.title}
            </button>
          ))}
        </div>
      </div>

      {/* Slide 1: Cover & Problem Statement */}
      {activeSlide === 1 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="border-b border-slate-800 pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Smart India Hackathon 2026
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Hardware Edition
              </span>
              <span className="text-xs font-mono text-slate-400">Organization: Qualcomm Inc.</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              ENVIGUARD <span className="text-emerald-400">AI</span>
            </h1>
            <p className="text-lg text-slate-300 mt-2 font-medium">
              Distributed Environmental Intelligence Network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Problem Statement ID: SIH26178
              </span>
              <h3 className="text-sm font-semibold text-white">Problem Statement Title:</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                "A resilient, AI-powered environmental monitoring network that provides early detection, localized intelligence, and actionable alerts for floods, forest fires, pollution events, and other environmental hazards common in India, enabling authorities and communities to shift from reactive disaster response to proactive risk prevention."
              </p>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                Submission Credentials
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Theme:</span>
                  <span className="font-semibold text-white">Disaster Management</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">PS Category:</span>
                  <span className="font-semibold text-white">Hardware</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Organization:</span>
                  <span className="font-semibold text-amber-300">Qualcomm Inc.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Team Name:</span>
                  <span className="font-semibold text-emerald-400 font-mono">NEXT GEN THINMER</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide 2: Proposed Solution & Flow */}
      {activeSlide === 2 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              Slide 02 • Core Architecture
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Proposed Solution: SENSE • MAP • THINK • ACT
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              End-to-end distributed hazard pipeline engineered for high uptime in remote Indian terrains
            </p>
          </div>

          {/* 4-Stage Architecture Flow Visual */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="text-sm font-bold text-white">Sensor Nodes</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Solar-powered sensor nodes continuously capture water level, rainfall, smoke, air quality, gas, temperature, soil moisture, and vibration.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="text-sm font-bold text-white">Edge AI Risk Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Edge AI detects anomalies and estimates hazard probability locally, keeping critical decisions working during weak or no connectivity.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="text-sm font-bold text-white">GIS Risk Map</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Risk scores, summaries, and critical events are sent to a central GIS dashboard for real-time multi-hazard mapping across India.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 relative">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h3 className="text-sm font-bold text-white">Alerts + Decision Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Severity-based mobile and web alerts reach district authorities and nearby vulnerable communities with clear, actionable warnings.
              </p>
            </div>
          </div>

          {/* Key Proposition Takeaway */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-950 to-cyan-950/40 p-5 rounded-xl border border-emerald-500/20 flex items-center gap-4">
            <Sparkles className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">Core Innovation: </span>
              By embedding TinyML quantization directly into Qualcomm-capable edge microcontrollers, EnviGuard eliminates the single-point-of-failure inherent in cloud-only disaster solutions.
            </div>
          </div>
        </div>
      )}

      {/* Slide 3: Technical Approach & Stack */}
      {activeSlide === 3 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              Slide 03 • Technology Stack & Flow
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Technical Approach & 5-Step Implementation Flow
            </h2>
          </div>

          {/* Implementation Flow (5 Steps from Slide 3) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Implementation Flow:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { step: '1', title: 'Sense', desc: 'Multi-sensor continuous sampling' },
                { step: '2', title: 'Edge AI', desc: 'Clean + detect anomalies locally' },
                { step: '3', title: 'Risk', desc: 'Hazard score + confidence estimate' },
                { step: '4', title: 'Map', desc: 'GIS hotspot + time-series trend map' },
                { step: '5', title: 'Act', desc: 'Alert + response recommendation' }
              ].map(s => (
                <div key={s.step} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs mx-auto flex items-center justify-center mb-1.5">
                    {s.step}
                  </div>
                  <div className="text-xs font-bold text-white">{s.title}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 font-mono">Sensors & Edge Hardware</span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• <strong>Sensors:</strong> Water level (depth LiDAR/ultrasonic), Rain gauge, Smoke optical chamber, PM2.5/PM10 laser counters, Multi-gas NDIR, Temperature/Humidity, Soil moisture capacitive probe, 3-axis seismic vibration.</li>
                <li>• <strong>Edge MCUs:</strong> ESP32-S3 / STM32WB55 prototype + Qualcomm-capable edge AI platform.</li>
                <li>• <strong>ML Framework:</strong> TinyML / ONNX Runtime INT8 Quantization.</li>
              </ul>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 font-mono">Connectivity & GIS/AI Backend</span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• <strong>Connectivity Protocols:</strong> LoRaWAN (868 MHz), NB-IoT, Wi-Fi 6, 4G/5G, MQTT telemetry broker with offline buffer queues.</li>
                <li>• <strong>AI & GIS Pipeline:</strong> Python anomaly detection, time-series forecasting, multi-sensor Bayesian fusion, confidence scoring, PostGIS, and React Dashboard.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Slide 4: Feasibility and Viability */}
      {activeSlide === 4 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              Slide 04 • Feasibility & Risk Engineering
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Feasibility & Risk Mitigation Matrix
            </h2>
          </div>

          {/* 4 Feasibility Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                title: 'Solar & Low Power',
                desc: 'Solar + low-power operation supports remote and infrastructure-poor Indian locations.'
              },
              {
                title: 'Modular Hardware',
                desc: 'Add or remove sensors by hazard zone (flood vs wildfire) without redesigning the entire node.'
              },
              {
                title: 'Open Protocols',
                desc: 'GIS-ready open data make integration with existing NDMA / SDMA control rooms practical.'
              },
              {
                title: 'Edge-First Architecture',
                desc: 'Edge-first architecture reduces bandwidth, latency, and dependence on continuous cloud connectivity.'
              }
            ].map((f, i) => (
              <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-xs font-bold text-white mb-1">{f.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Challenges & Mitigations Table from Slide 4 */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Challenges & Engineered Mitigations:</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono">
                    <th className="p-3">Challenge / Risk Factor</th>
                    <th className="p-3">Engineered Technical Mitigation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-rose-300">Sensor drift / false alarms</td>
                    <td className="p-3 text-slate-300">Auto-calibration algorithms + confidence scoring + multi-sensor confirmation</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-rose-300">Network outages</td>
                    <td className="p-3 text-slate-300">Local TinyML inference + buffered flash events + LoRa/NB-IoT fallback</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-rose-300">Power constraints</td>
                    <td className="p-3 text-slate-300">Dynamic duty cycling + solar MPPT harvesting + low-power communications</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-semibold text-rose-300">Model generalization</td>
                    <td className="p-3 text-slate-300">Region-specific calibration + continuous retraining from verified historical events</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Slide 5: Impact and Benefits */}
      {activeSlide === 5 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              Slide 05 • Societal & Multi-Sector Impact
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Impact and Stakeholder Benefits
            </h2>
          </div>

          {/* 4 Stakeholder Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mx-auto flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-cyan-400 uppercase">Authorities</h4>
              <p className="text-xs text-slate-300">
                Prioritized incidents, live GIS risk maps, and actionable decision support for NDMA/SDMA.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mx-auto flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase">Communities</h4>
              <p className="text-xs text-slate-300">
                Earlier, location-aware multilingual warnings (English & Hindi) and clear evacuation directions.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mx-auto flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-amber-400 uppercase">Industry</h4>
              <p className="text-xs text-slate-300">
                Emission and toxic leak anomaly detection with automated industrial safety escalations.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 mx-auto flex items-center justify-center">
                <TreePine className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-purple-400 uppercase">Environment</h4>
              <p className="text-xs text-slate-300">
                Continuous high-fidelity evidence for disaster prevention, ecological planning, and long-term recovery.
              </p>
            </div>
          </div>

          {/* 5 Core Differentiator Badges */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              5 Core Strategic Advantages Over Legacy Systems:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Faster detection:</strong> Act on sensor evidence before hazards escalate.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Hyperlocal intelligence:</strong> Risk is mapped at panchayat & hotspot level.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Lower bandwidth:</strong> Transmit critical insights instead of raw continuous streams.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Scalable economics:</strong> Modular nodes can grow from one village to a city or state.</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span><strong>Multi-hazard coverage:</strong> One unified platform across floods, fire, pollution, heat, landslides, and toxic leaks.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide 6: Research & References */}
      {activeSlide === 6 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              Slide 06 • Scientific Grounding & References
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Research & Institutional References
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 font-mono">[1] SIH 2026 PS SIH26178</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Requirements: distributed sensor nodes, on-device AI, multi-hazard alerts, regional risk mapping, community/authority notification, and hybrid edge-cloud architecture.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 font-mono">[2] SIH 2026 Idea Presentation Template</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Six-slide submission structure, concise technical points/diagrams, and required evaluation sections strictly implemented in this platform.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 font-mono">[3] NDMA / IMD / ISRO Ecosystem</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reference context for India’s disaster-management and environmental monitoring landscape; the proposed system complements existing Indian radar & satellite telemetry.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 font-mono">[4] Technical Research Direction</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Edge AI + IoT sensor fusion + GIS + time-series forecasting + confidence-based alerting; prototype validation tested with real sensor streams and historical Indian hazard datasets.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Slide Navigation footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setActiveSlide(prev => Math.max(1, prev - 1))}
          disabled={activeSlide === 1}
          className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
        >
          ← Previous Slide
        </button>

        <span className="text-xs text-slate-500 font-mono">
          Slide {activeSlide} of {slides.length}
        </span>

        <button
          onClick={() => setActiveSlide(prev => Math.min(slides.length, prev + 1))}
          disabled={activeSlide === slides.length}
          className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
        >
          Next Slide →
        </button>
      </div>
    </div>
  );
};
