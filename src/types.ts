export type HazardType = 'flood' | 'wildfire' | 'pollution' | 'landslide' | 'gas_leak';

export interface HardwareSpec {
  mcu: string;
  edgeEngine: string;
  connectivity: 'LoRaWAN' | 'NB-IoT' | '4G/5G' | 'Wi-Fi' | 'Satellite-fallback';
  powerSource: 'Solar + LiFePO4' | 'Grid + Battery' | 'Ultra-Capacitor Solar';
  batteryLevel: number;
  solarInputWatts: number;
  rssi: number;
  status: 'ONLINE' | 'OFFLINE_BUFFERING' | 'LOW_POWER_SLEEP';
}

export interface TelemetryData {
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
}

export interface EdgeAIStats {
  model: string;
  anomalyScore: number;
  hazardProbability: number;
  inferenceTimeMs: number;
  dutyCycleIntervalSec: number;
  localDecision: 'NORMAL' | 'ELEVATED_WATCH' | 'CRITICAL_ALERT';
  offlineBufferCount: number;
  lastUpdated: string;
}

export interface SensorNode {
  id: string;
  name: string;
  zone: string;
  state: string;
  lat: number;
  lng: number;
  primaryHazard: HazardType;
  hardware: HardwareSpec;
  telemetry: TelemetryData;
  edgeAI: EdgeAIStats;
}

export interface DisasterAdvice {
  incidentTitle: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
  ndmaProtocolCode: string;
  immediateActionsAuthorities: string[];
  communityWarningEnglish: string;
  communityWarningHindi: string;
  evacuationCorridors: string[];
  resourceDispatch: {
    sdrfTeams: string;
    equipment: string[];
    medicalStagingArea: string;
  };
  edgeResilienceNote: string;
}
