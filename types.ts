import React from 'react';

export enum DeviceStatus {
    Unlocked = 'Unlocked',
    Locked = 'Locked',
    Jailbroken = 'Jailbroken',
}

export interface Device {
    id: string;
    name: string;
    os: 'iOS' | 'Android' | string;
    osVersion: string;
    imageUrl: string;
    status: DeviceStatus;
    serial: string;
    storage: string;
    imei: string;
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
        versions: string[] | string;
    };
}

export interface RecoveryModule {
    name: string;
    description: string;
    icon: React.ElementType;
}

export interface Backup {
    id: string;
    name: string;
    type: 'Full System' | 'Partial';
    date: string;
    size: string;
}

export interface Recommendation {
    title: string;
    description: string;
    action: string;
}

export interface OrchestratorPlan extends Recommendation {
    steps: string[];
}

export interface RecoveryResult {
    id: string;
    preview: string;
    date: string;
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

export interface TrafficData {
    timestamp: number;
    source: string;
    destination: string;
    protocol: string;
    length: number;
}
