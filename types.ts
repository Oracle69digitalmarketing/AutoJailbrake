import type React from 'react';

// Main application view state
export type AppView = 
  | { name: 'connect' }
  | { name: 'manual_id' }
  | { name: 'dashboard', device: Device }
  | { name: 'recovery', device: Device }
  | { name: 'passcode', device: Device }
  | { name: 'tweaks', device: Device }
  | { name: 'restore', device: Device }
  | { name: 'network' }
  | { name: 'analytics' }
  | { name: 'processing', actionName: string, device: Device, previousViewName: AppView['name'] }
  | { name: 'results', results: RecoveryResult[], actionName: string, device: Device, previousViewName: AppView['name'] };

// Enum for device connection status
export enum DeviceStatus {
  Unlocked = 'Unlocked',
  Locked = 'Locked',
  Jailbroken = 'Jailbroken',
}

// Represents a connected device
export interface Device {
  id: string;
  name: string;
  os: 'iOS' | 'Android';
  osVersion: string;
  imageUrl: string;
  status: DeviceStatus;
  serial: string;
  storage: string;
  imei: string;
  ipAddress?: string; // For network devices
}

// Enum for exploit types
export enum ExploitType {
  Jailbreak = 'Jailbreak',
  Unlock = 'Unlock',
  Recovery = 'Recovery',
}

// Represents a software exploit
export interface Exploit {
  name: string;
  description: string;
  type: ExploitType;
  cve?: string;
  compatibility: {
    os: 'iOS' | 'Android' | 'any';
    versions: string[];
  };
}

// Represents the AI-generated recommendation plan
export interface OrchestratorPlan {
  title: string;
  description: string;
  action: string;
  steps: string[];
}
// Alias for AI recommendation in UI
export type Recommendation = OrchestratorPlan;

// Result from the update check API
export interface UpdateCheckResult {
  isUpdateAvailable: boolean;
  version?: string;
  releaseNotes?: string;
}

// Represents a log entry
export interface LogEntry {
  type: 'info' | 'success' | 'error';
  message: string;
  timestamp: string;
}

// Application settings
export interface Settings {
  theme: 'dark' | 'light';
  enableAutoUpdateCheck: boolean;
  notifications: boolean;
}

// Data for a UI notification
export interface NotificationData {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error';
}

// Represents a single recovered item (e.g., a photo)
export interface RecoveryResult {
  id: string;
  preview: string; // URL to a preview image
  date: string;
}

// Defines a data recovery module
export interface RecoveryModule {
  name: string;
  description: string;
  icon: React.ElementType;
}

// Represents an update during a passcode brute-force attack
export interface BruteForceUpdate {
  currentAttemptPin: string;
  attemptCount: number;
  progress: number;
  foundPin?: string;
}

// Represents a device backup
export interface Backup {
    id: string;
    name: string;
    type: 'Full' | 'Partial';
    date: string;
    size: string;
}

// Represents a tweak for a jailbroken device
export interface Tweak {
    id: string;
    name: string;
    author: string;
    description: string;
    version: string;
    iconUrl: string;
}

// Data structures for the Analytics Dashboard
export interface AnalyticsData {
  totalOperations: number;
  successRate: number;
  errorCount: number;
  chartData: ChartDataPoint[];
}

export interface ChartDataPoint {
  label: string;
  value: number;
}
