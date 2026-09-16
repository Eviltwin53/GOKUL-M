import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory state for distributed sensor nodes across India hazard zones
export interface SensorNode {
  id: string;
  name: string;
  zone: string;
  state: string;
  lat: number;
  lng: number;
  primaryHazard: 'flood' | 'wildfire' | 'pollution' | 'landslide' | 'gas_leak';
  hardware: {
    mcu: string;
    edgeEngine: string;
    connectivity: 'LoRaWAN' | 'NB-IoT' | '4G/5G' | 'Wi-Fi' | 'Satellite-fallback';
    powerSource: 'Solar + LiFePO4' | 'Grid + Battery' | 'Ultra-Capacitor Solar';
    batteryLevel: number; // 0-100%
    solarInputWatts: number;
    rssi: number; // dBm
    status: 'ONLINE' | 'OFFLINE_BUFFERING' | 'LOW_POWER_SLEEP';
  };
  telemetry: {
    waterLevelMeters?: number;
    rainfallMmPerHour?: number;
    smokePpm?: number;
    pm25?: number;
    pm10?: number;
    vocGasPpm?: number;
    tempCelsius: number;
    humidityPct: number;
    soilMoisturePct?: number;
    vibrationG?: number;
  };
  edgeAI: {
    model: string;
    anomalyScore: number; // 0 to 1
    hazardProbability: number; // 0 to 100%
    inferenceTimeMs: number;
    dutyCycleIntervalSec: number;
    localDecision: 'NORMAL' | 'ELEVATED_WATCH' | 'CRITICAL_ALERT';
    offlineBufferCount: number;
    lastUpdated: string;
  };
}

let nodes: SensorNode[] = [
  {
    id: "NODE-AS-01",
    name: "Brahmaputra Basin Sentinel",
    zone: "Kaziranga Floodplain, Assam",
    state: "Assam",
    lat: 26.58,
    lng: 93.17,
    primaryHazard: "flood",
    hardware: {
      mcu: "ESP32-S3 + Qualcomm NPU edge board",
      edgeEngine: "TinyML Onnx INT8",
      connectivity: "LoRaWAN",
      powerSource: "Solar + LiFePO4",
      batteryLevel: 94,
      solarInputWatts: 14.2,
      rssi: -78,
      status: "ONLINE"
    },
    telemetry: {
      waterLevelMeters: 7.85,
      rainfallMmPerHour: 48.5,
      tempCelsius: 27.2,
      humidityPct: 88,
      soilMoisturePct: 92
    },
    edgeAI: {
      model: "HydroCast-V3 (Hydrological Flow Inundation)",
      anomalyScore: 0.88,
      hazardProbability: 84,
      inferenceTimeMs: 14,
      dutyCycleIntervalSec: 15,
      localDecision: "CRITICAL_ALERT",
      offlineBufferCount: 0,
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: "NODE-UK-02",
    name: "Garhwal Canopy Guardian",
    zone: "Rishikesh-Chamba Ridge, Uttarakhand",
    state: "Uttarakhand",
    lat: 30.34,
    lng: 78.41,
    primaryHazard: "wildfire",
    hardware: {
      mcu: "STM32WB55 + Qualcomm Edge AI Module",
      edgeEngine: "TinyML Multi-Spectral Thermal/Gas",
      connectivity: "NB-IoT",
      powerSource: "Solar + LiFePO4",
      batteryLevel: 89,
      solarInputWatts: 18.0,
      rssi: -82,
      status: "ONLINE"
    },
    telemetry: {
      smokePpm: 125,
      tempCelsius: 41.5,
      humidityPct: 18,
      vocGasPpm: 8.5
    },
    edgeAI: {
      model: "PyroGuard-Tiny (Fire Radiance & Combustion Rate)",
      anomalyScore: 0.74,
      hazardProbability: 71,
      inferenceTimeMs: 18,
      dutyCycleIntervalSec: 30,
      localDecision: "ELEVATED_WATCH",
      offlineBufferCount: 0,
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: "NODE-KL-03",
    name: "Wayanad Slope Stability Node",
    zone: "Meppadi-Chooralmala Escarpment, Kerala",
    state: "Kerala",
    lat: 11.53,
    lng: 76.13,
    primaryHazard: "landslide",
    hardware: {
      mcu: "ESP32-WROOM + 3-Axis Seismic Accelerometer",
      edgeEngine: "SeismoNet ONNX Lite",
      connectivity: "LoRaWAN",
      powerSource: "Solar + LiFePO4",
      batteryLevel: 76,
      solarInputWatts: 5.4,
      rssi: -91,
      status: "ONLINE"
    },
    telemetry: {
      soilMoisturePct: 96,
      vibrationG: 0.082,
      rainfallMmPerHour: 62.0,
      tempCelsius: 22.4,
      humidityPct: 95
    },
    edgeAI: {
      model: "GeoSlide-Predict (Soil Pore Pressure & Shear Drift)",
      anomalyScore: 0.81,
      hazardProbability: 79,
      inferenceTimeMs: 12,
      dutyCycleIntervalSec: 10,
      localDecision: "CRITICAL_ALERT",
      offlineBufferCount: 0,
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: "NODE-DL-04",
    name: "NCR Tropospheric Air Mesh",
    zone: "Anand Vihar Transport & Industrial Hub, Delhi",
    state: "Delhi",
    lat: 28.65,
    lng: 77.31,
    primaryHazard: "pollution",
    hardware: {
      mcu: "Qualcomm RB5 / Snapdragon Edge Micro",
      edgeEngine: "AeroVision Optical Dust Fusion",
      connectivity: "4G/5G",
      powerSource: "Grid + Battery",
      batteryLevel: 99,
      solarInputWatts: 0,
      rssi: -65,
      status: "ONLINE"
    },
    telemetry: {
      pm25: 382,
      pm10: 512,
      vocGasPpm: 24.2,
      tempCelsius: 21.0,
      humidityPct: 62
    },
    edgeAI: {
      model: "AeroFore-Deep (Particulate Stagnation Inversion)",
      anomalyScore: 0.93,
      hazardProbability: 92,
      inferenceTimeMs: 28,
      dutyCycleIntervalSec: 60,
      localDecision: "CRITICAL_ALERT",
      offlineBufferCount: 0,
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: "NODE-MH-05",
    name: "Mithi Urban Drainage Node",
    zone: "BKC Culvert Inflow, Mumbai, Maharashtra",
    state: "Maharashtra",
    lat: 19.06,
    lng: 72.86,
    primaryHazard: "flood",
    hardware: {
      mcu: "ESP32-S3 + Ultrasonic Depth LiDAR",
      edgeEngine: "TidalUrban Flow Lite",
      connectivity: "4G/5G",
      powerSource: "Solar + LiFePO4",
      batteryLevel: 82,
      solarInputWatts: 9.8,
      rssi: -72,
      status: "ONLINE"
    },
    telemetry: {
      waterLevelMeters: 4.1,
      rainfallMmPerHour: 34.0,
      tempCelsius: 29.5,
      humidityPct: 84
    },
    edgeAI: {
      model: "CulvertSurge-Tiny (Tidal Backflow Anomaly)",
      anomalyScore: 0.62,
      hazardProbability: 58,
      inferenceTimeMs: 16,
      dutyCycleIntervalSec: 30,
      localDecision: "ELEVATED_WATCH",
      offlineBufferCount: 0,
      lastUpdated: new Date().toISOString()
    }
  },
  {
    id: "NODE-AP-06",
    name: "Coromandel Petrochem Sentinel",
    zone: "Visakhapatnam SEZ Chemical Belt, AP",
    state: "Andhra Pradesh",
    lat: 17.69,
    lng: 83.21,
    primaryHazard: "gas_leak",
    hardware: {
      mcu: "STM32F4 + Multi-Gas NDIR Cluster",
      edgeEngine: "GasPlume Diffusion ONNX",
      connectivity: "LoRaWAN",
      powerSource: "Ultra-Capacitor Solar",
      batteryLevel: 91,
      solarInputWatts: 16.5,
      rssi: -84,
      status: "ONLINE"
    },
    telemetry: {
      vocGasPpm: 68.4,
      smokePpm: 32,
      tempCelsius: 32.1,
      humidityPct: 75
    },
    edgeAI: {
      model: "VaporTrack (Toxic Gas Plume Dispersion)",
      anomalyScore: 0.85,
      hazardProbability: 82,
      inferenceTimeMs: 15,
      dutyCycleIntervalSec: 15,
      localDecision: "CRITICAL_ALERT",
      offlineBufferCount: 0,
      lastUpdated: new Date().toISOString()
    }
  }
];

// Lazy initialization of Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  }
  return geminiClient;
}

// REST API Endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    system: "EnviGuard AI Core",
    sihProject: "SIH26178",
    organization: "Qualcomm Inc.",
    team: "NEXT GEN THINMER",
    theme: "Disaster Management",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/nodes", (req, res) => {
  res.json({
    success: true,
    count: nodes.length,
    nodes
  });
});

// Simulate sensor changes / edge AI inference trigger
app.post("/api/nodes/:id/simulate", (req, res) => {
  const { id } = req.params;
  const { hazardProbability, anomalyScore, localDecision, simulatedAnomaly } = req.body;

  const nodeIndex = nodes.findIndex(n => n.id === id);
  if (nodeIndex === -1) {
    return res.status(404).json({ error: "Node not found" });
  }

  const node = nodes[nodeIndex];
  if (hazardProbability !== undefined) node.edgeAI.hazardProbability = hazardProbability;
  if (anomalyScore !== undefined) node.edgeAI.anomalyScore = anomalyScore;
  if (localDecision) node.edgeAI.localDecision = localDecision;

  if (simulatedAnomaly === 'flood_surge') {
    node.telemetry.waterLevelMeters = Number(((node.telemetry.waterLevelMeters || 4) + 1.8).toFixed(2));
    node.telemetry.rainfallMmPerHour = Number(((node.telemetry.rainfallMmPerHour || 20) + 35).toFixed(1));
    node.edgeAI.anomalyScore = 0.94;
    node.edgeAI.hazardProbability = 94;
    node.edgeAI.localDecision = "CRITICAL_ALERT";
  } else if (simulatedAnomaly === 'fire_outbreak') {
    node.telemetry.tempCelsius = Number((node.telemetry.tempCelsius + 8.5).toFixed(1));
    node.telemetry.smokePpm = Number(((node.telemetry.smokePpm || 10) + 140).toFixed(1));
    node.edgeAI.anomalyScore = 0.91;
    node.edgeAI.hazardProbability = 89;
    node.edgeAI.localDecision = "CRITICAL_ALERT";
  } else if (simulatedAnomaly === 'landslide_tremor') {
    node.telemetry.vibrationG = 0.38;
    node.telemetry.soilMoisturePct = 99;
    node.edgeAI.anomalyScore = 0.96;
    node.edgeAI.hazardProbability = 95;
    node.edgeAI.localDecision = "CRITICAL_ALERT";
  } else if (simulatedAnomaly === 'network_outage') {
    node.hardware.status = "OFFLINE_BUFFERING";
    node.edgeAI.offlineBufferCount += 12;
  } else if (simulatedAnomaly === 'normal') {
    node.edgeAI.anomalyScore = 0.12;
    node.edgeAI.hazardProbability = 14;
    node.edgeAI.localDecision = "NORMAL";
    node.hardware.status = "ONLINE";
    node.edgeAI.offlineBufferCount = 0;
  }

  node.edgeAI.lastUpdated = new Date().toISOString();
  nodes[nodeIndex] = node;

  res.json({ success: true, node });
});

// AI Advisor for Disaster Management & Authority Action
app.post("/api/ai/advisor", async (req, res) => {
  try {
    const { nodeId, hazardType, location, telemetry, severity } = req.body;

    const prompt = `You are the AI Disaster Intelligence Officer for EnviGuard AI (Smart India Hackathon 2026, Problem Statement SIH26178: "Resilient, AI-powered environmental monitoring network for floods, forest fires, and pollution in India" sponsored by Qualcomm Inc.).
    
A critical environmental hazard has been detected by edge IoT sensor nodes.
Location: ${location || "Regional Hotspot, India"}
Hazard Category: ${hazardType}
Severity: ${severity}
Telemetry: ${JSON.stringify(telemetry || {})}

Provide a comprehensive, authoritative Disaster Management Directive in clean structured JSON with the following schema:
{
  "incidentTitle": "string",
  "threatLevel": "CRITICAL" | "HIGH" | "MODERATE",
  "ndmaProtocolCode": "string (e.g., NDMA-SOP-FLD-04)",
  "immediateActionsAuthorities": ["string", "string", "string"],
  "communityWarningEnglish": "string (clear, calm, actionable instructions for public broadcast)",
  "communityWarningHindi": "string (Hindi translation for local panchayat / siren alert)",
  "evacuationCorridors": ["string", "string"],
  "resourceDispatch": {
    "sdrfTeams": "string",
    "equipment": ["string", "string"],
    "medicalStagingArea": "string"
  },
  "edgeResilienceNote": "string (how the Qualcomm/ESP32 edge nodes maintain situational awareness if cellular grid fails)"
}`;

    if (process.env.GEMINI_API_KEY) {
      const client = getGeminiClient();
      const response = await client.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text;
      if (responseText) {
        try {
          const parsed = JSON.parse(responseText);
          return res.json({ success: true, advice: parsed });
        } catch {
          // fall through to fallback
        }
      }
    }

    // High quality contextual fallback if Gemini key is pending or network is isolated
    const fallbackMap: Record<string, any> = {
      flood: {
        incidentTitle: `Rapid Inundation Risk — ${location || "River Basin"}`,
        threatLevel: "CRITICAL",
        ndmaProtocolCode: "NDMA-SOP-FLD-2026-IV",
        immediateActionsAuthorities: [
          "Activate District Emergency Operation Center (DEOC) & alert SDRF/NDRF 1st Battalion.",
          "Close low-lying causeways and restrict vehicular movement along river embankments.",
          "Pre-position high-discharge dewatering pumps and motorized inflatable rescue boats (IRBs)."
        ],
        communityWarningEnglish: "URGENT FLOOD ALERT: Water levels rising rapidly. Residents in low-lying riparian sectors must move immediately to designated higher ground shelters.",
        communityWarningHindi: "चेतावनी: नदी का जलस्तर खतरे के निशान से ऊपर बढ़ रहा है। निचले इलाकों के निवासी तुरंत ऊंचे सुरक्षित राहत शिविरों में जाएं।",
        evacuationCorridors: ["Route 7A Elevated Bypass to District Stadium", "Eastern Ring Road towards Primary Health Center"],
        resourceDispatch: {
          sdrfTeams: "2 Battalions (48 personnel) mobilized",
          equipment: ["12 Motorized Inflatable Rescue Boats", "6 Dewatering Submersible Units", "Emergency SATCOM Terminals"],
          medicalStagingArea: "Sub-divisional Civil Hospital & Mobile First-Aid Van 3"
        },
        edgeResilienceNote: "Local ESP32/Qualcomm Edge nodes are buffering river crest telemetry over LoRa mesh; early warning sirens triggered autonomously without cloud latency."
      },
      wildfire: {
        incidentTitle: `Canopy Wildfire & Rapid Combustion Surge — ${location || "Forest Zone"}`,
        threatLevel: "HIGH",
        ndmaProtocolCode: "NDMA-SOP-FRF-2026-II",
        immediateActionsAuthorities: [
          "Deploy Forest Department Quick Response Fire Tenders to northern fireline boundary.",
          "Enforce immediate exclusion zone for tourists, trekkers, and forest fringe settlements.",
          "Mobilize thermal aerial drone surveys to monitor wind-driven embers."
        ],
        communityWarningEnglish: "WILDFIRE ADVISORY: Forest fire detected near ridge perimeter. Keep windows sealed, prepare evacuation kit, and do not enter forest trails.",
        communityWarningHindi: "जंगल की आग की चेतावनी: पहाड़ी ढलान पर आग फैल रही है। धुएं से बचें, खिड़कियां बंद रखें और वन क्षेत्र में जाने से बचें।",
        evacuationCorridors: ["Valley Downslope Main Highway towards Tehsil HQ", "Southbound Collector Road"],
        resourceDispatch: {
          sdrfTeams: "Forest Range Strike Team + SDRF Fire Unit",
          equipment: ["High-pressure mist backpacks", "Earthmovers for counter-fire trenches", "N95 particulate masks"],
          medicalStagingArea: "Community Health Center & Burns Triage Camp"
        },
        edgeResilienceNote: "Multi-sensor fusion (PM10 + VOC + IR thermopile) running ONNX TinyML locally; flagged thermal rise 22 minutes before satellite pass."
      },
      landslide: {
        incidentTitle: `Slope Liquefaction & Shear Drift Alarm — ${location || "Hilly Slopes"}`,
        threatLevel: "CRITICAL",
        ndmaProtocolCode: "NDMA-SOP-LND-2026-I",
        immediateActionsAuthorities: [
          "Immediate evacuation of houses situated along 30-degree incline debris chutes.",
          "Halt heavy vehicle traffic on hill highway ghat sections.",
          "Deploy geotechnical rapid assessment team to inspect crown fissures."
        ],
        communityWarningEnglish: "CRITICAL LANDSLIDE WARNING: Excessive soil saturation and vibration detected. Evacuate designated hillside zones immediately.",
        communityWarningHindi: "भूस्खलन की गंभीर चेतावनी: मिट्टी में भारी नमी और कंपन दर्ज किया गया है। ढलान वाले घरों को तुरंत खाली कर सुरक्षित स्थान पर जाएं।",
        evacuationCorridors: ["Ridge Crest Road to Panchayat Community Center", "Ghat Road Sector 4 Safe Pad"],
        resourceDispatch: {
          sdrfTeams: "NDRF 4th Battalion Mountain Rescue Specialists",
          equipment: ["Hydraulic cutters", "Acoustic life detectors", "Earth-clearing excavators"],
          medicalStagingArea: "District Sports Complex Emergency Trauma Ward"
        },
        edgeResilienceNote: "3-axis seismic vibration fusion with pore-pressure threshold alerted local alarm horn in 1.4 seconds before network dropout."
      },
      pollution: {
        incidentTitle: `Hazardous Atmospheric Smog & Particulate Spike — ${location || "Urban Metro"}`,
        threatLevel: "HIGH",
        ndmaProtocolCode: "CPCB-GRAP-STAGE-IV",
        immediateActionsAuthorities: [
          "Implement Graded Response Action Plan (GRAP-IV) restrictions across district.",
          "Halt all non-essential diesel commercial transport and construction demolition.",
          "Deploy anti-smog mist cannons along major arterial transit corridors."
        ],
        communityWarningEnglish: "SEVERE AIR QUALITY HAZARD: AQI exceeding safe thresholds. Sensitive groups, elderly, and children must stay indoors.",
        communityWarningHindi: "वायु गुणवत्ता गंभीर स्तर पर: हवा में प्रदूषण खतरनाक स्तर पर है। बुजुर्ग व बच्चे बाहर न निकलें, मास्क का उपयोग करें।",
        evacuationCorridors: ["Not applicable; shelter-in-place in filtered air spaces advised"],
        resourceDispatch: {
          sdrfTeams: "Municipal Pollution Control Quick Squads",
          equipment: ["Mobile Anti-Smog Guns", "Aerosol monitoring vans", "Civil defense mask distribution kiosks"],
          medicalStagingArea: "Primary Respiratory Care Dispensary"
        },
        edgeResilienceNote: "Dual-laser PM2.5/PM10 optical sensors calibrate locally via dynamic humidity curves to prevent mist false-positives."
      }
    };

    const advice = fallbackMap[hazardType] || fallbackMap.flood;
    return res.json({ success: true, advice, isSimulated: !process.env.GEMINI_API_KEY });
  } catch (error: any) {
    console.error("AI Advisor error:", error);
    res.status(500).json({ error: error.message || "Failed to generate disaster response plan" });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EnviGuard AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
