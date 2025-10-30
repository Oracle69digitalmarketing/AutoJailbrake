import type { ElementType } from 'react';

export type View = 
  | 'connect'
  | 'manual-id'
  | 'orchestrator'
  | 'device-details'
  | 'process'
  | 'recovery'
  | 'results'
  | 'passcode-recovery'
  | 'logs'
  | 'dashboard';

export enum DeviceStatus {
  Unlocked = 'Unlocked',
  Locked = 'Locked',
  Jailbroken = 'Jailbroken',
}

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
}

export interface RecoveryResult {
  id: string;
  preview: string;
  date: string;
}

export enum RecoveryAction {
    ScanPhotos = "Scan for Photos & Videos",
    RecoverChats = "Recover Chat Logs",
    ExtractBrowserData = "Extract Browser Data",
    FullFilesystemScan = "Full Filesystem Scan",
    PasscodeRecovery = "Passcode Brute-force",
}

export interface RecoveryModule {
    name: RecoveryAction;
    description: string;
    icon: ElementType;
}

export enum ExploitType {
  Jailbreak = 'Jailbreak',
  Unlock = 'Unlock',
  Recovery = 'Recovery',
}

export interface Exploit {
  name: string;
  description: string;
  type: ExploitType;
  cve?: string;
  compatibility: {
    os: 'iOS' | 'Android' | 'any';
    versions: string[] | ['*'];
  };
}

export interface Recommendation {
  title: string;
  description: string;
  action: string;
}

export interface OrchestratorPlan extends Recommendation {
    steps: string[];
}

export interface UpdateCheckResult {
  isUpdateAvailable: boolean;
  version?: string;
  releaseNotes?: string;
}

export interface LogEntry {
  type: 'info' | 'success' | 'error';
  message: string;
  timestamp: string;
}

export interface Settings {
  theme: 'dark' | 'light';
  enableAutoUpdateCheck: boolean;
  notifications: boolean;
}

export interface NotificationData {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error';
}

export interface BruteForceUpdate {
  currentAttemptPin: string;
  attemptCount: number;
  progress: number;
  foundPin?: string;
}
