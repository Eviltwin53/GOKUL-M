import { SensorNode } from '../types';

export const INITIAL_NODES: SensorNode[] = [
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
      lastUpdated: "Just now"
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
      lastUpdated: "1 min ago"
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
      lastUpdated: "Just now"
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
      lastUpdated: "Just now"
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
      lastUpdated: "2 mins ago"
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
      lastUpdated: "Just now"
    }
  }
];

export const HISTORICAL_TELEMETRY = [
  { time: "00:00", waterLevel: 4.2, rainRate: 12, smoke: 15, aqi: 180, vibration: 0.01 },
  { time: "03:00", waterLevel: 4.5, rainRate: 18, smoke: 18, aqi: 195, vibration: 0.02 },
  { time: "06:00", waterLevel: 5.1, rainRate: 25, smoke: 22, aqi: 240, vibration: 0.02 },
  { time: "09:00", waterLevel: 5.9, rainRate: 32, smoke: 45, aqi: 310, vibration: 0.04 },
  { time: "12:00", waterLevel: 6.8, rainRate: 40, smoke: 88, aqi: 385, vibration: 0.06 },
  { time: "15:00", waterLevel: 7.4, rainRate: 52, smoke: 110, aqi: 420, vibration: 0.09 },
  { time: "18:00", waterLevel: 7.85, rainRate: 48, smoke: 125, aqi: 480, vibration: 0.08 }
];
