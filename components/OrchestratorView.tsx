import React from 'react';
import type { Device } from '../types';
import { DeviceStatus } from '../types';
import StatusBadge from './StatusBadge';
import AIRecommender from './AIRecommender';
import { RecoveryIcon, JailbreakIcon, UnlockIcon } from './icons';

interface OrchestratorViewProps {
  device: Device;
  onExecuteAction: (actionName: string) => void;
  onNavigateTo: (view: 'device-details' | 'recovery' | 'passcode-recovery') => void;
  onDisconnect: () => void;
  isActionRunning: boolean;
}

const OrchestratorView: React.FC<OrchestratorViewProps> = ({ device, onExecuteAction, onNavigateTo, onDisconnect, isActionRunning }) => {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Orchestrator</h1>
                <p className="mt-2 text-[var(--neutral-400)] flex items-center gap-2">
                    <span>{device.name} ({device.os} {device.osVersion})</span>
                    <StatusBadge status={device.status} />
                </p>
            </div>
            <button 
                onClick={onDisconnect}
                className="text-sm font-medium text-red-400 hover:underline self-start md:self-center"
            >
                Disconnect Device
            </button>
        </div>
      
      <div className="mt-8 space-y-12">
        <AIRecommender device={device} onExecute={onExecuteAction} disabled={isActionRunning} />

        <div>
            <h3 className="text-2xl font-bold tracking-tight mb-4">Manual Toolkits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ToolkitCard
                    icon={JailbreakIcon}
                    title="Advanced Actions"
                    description="Manually select and run specific exploits or jailbreak tools."
                    buttonText="View All Actions"
                    onClick={() => onNavigateTo('device-details')}
                    disabled={device.status === DeviceStatus.Jailbroken}
                />
                <ToolkitCard
                    icon={RecoveryIcon}
                    title="Data Recovery"
                    description="Scan for deleted photos, messages, browser data, and more."
                    buttonText="Open Recovery Suite"
                    onClick={() => onNavigateTo('recovery')}
                />
                 <ToolkitCard
                    icon={UnlockIcon}
                    title="Passcode Recovery"
                    description="Attempt to brute-force and recover the device's screen lock passcode."
                    buttonText="Start Passcode Recovery"
                    onClick={() => onNavigateTo('passcode-recovery')}
                    disabled={device.status !== DeviceStatus.Locked}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

interface ToolkitCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    buttonText: string;
    onClick: () => void;
    disabled?: boolean;
}

const ToolkitCard: React.FC<ToolkitCardProps> = ({ icon: Icon, title, description, buttonText, onClick, disabled = false }) => (
    <div className={`flex flex-col gap-4 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 p-6 ${disabled ? 'opacity-50' : 'transition-colors hover:border-[var(--neutral-700)]'}`}>
        <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[var(--neutral-700)] text-[var(--primary-500)]">
                <Icon className="h-7 w-7" />
            </div>
            <h4 className="text-lg font-semibold">{title}</h4>
        </div>
        <p className="flex-grow text-sm text-[var(--neutral-400)]">{description}</p>
        <button
            onClick={onClick}
            disabled={disabled}
            className="mt-auto w-full rounded-md bg-[var(--neutral-700)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--neutral-600)] disabled:cursor-not-allowed disabled:bg-[var(--neutral-800)] disabled:text-[var(--neutral-500)]"
        >
            {buttonText}
        </button>
    </div>
);

export default OrchestratorView;
