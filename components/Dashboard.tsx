import React, { useState } from 'react';
import type { Device } from '../types';
import { DeviceStatus } from '../types';
import StatusBadge from './StatusBadge';
import AIRecommender from './AIRecommender';
import AutoUpdater from './AutoUpdater';
import ActivityLog from './ActivityLog';
import Modal from './Modal';
import Settings from './Settings';
import NetworkView from './NetworkView';
import BarChart from './BarChart';

type OrchestratorSubView = 'dashboard' | 'process' | 'results' | 'recovery' | 'restore' | 'passcode' | 'tweaks';

interface DashboardProps {
  device: Device;
  onExecuteAction: (actionName: string) => void;
  onNavigate: (view: OrchestratorSubView) => void;
  onDisconnect: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ device, onExecuteAction, onNavigate, onDisconnect }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    <AutoUpdater />
                    <AIRecommender device={device} onExecute={onExecuteAction} />
                    
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-4">Toolkit</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ToolkitCard title="Data Recovery" description="Scan for deleted files." onClick={() => onNavigate('recovery')} />
                            <ToolkitCard title="System Restore" description="Restore from backup." onClick={() => onNavigate('restore')} />
                            <ToolkitCard title="Passcode Bypass" description="Attempt to brute-force the passcode." onClick={() => onNavigate('passcode')} disabled={device.status !== DeviceStatus.Locked} />
                            <ToolkitCard title="Tweak Installer" description="Manage jailbreak packages." onClick={() => onNavigate('tweaks')} disabled={device.status !== DeviceStatus.Jailbroken} />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <NetworkView />
                        <BarChart title="Recovery Success Rate" data={[{label: 'Photos', value: 87}, {label: 'Msgs', value: 92}, {label: 'Docs', value: 65}]} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div className="sticky top-24 space-y-6">
                        <div className="rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">{device.name}</h2>
                                    <p className="text-sm text-[var(--neutral-400)]">{device.os} {device.osVersion}</p>
                                </div>
                                <StatusBadge status={device.status} />
                            </div>
                            <div className="mt-4 space-y-2 border-t border-[var(--neutral-700)] pt-4 text-sm">
                                <InfoRow label="Serial" value={device.serial} />
                                <InfoRow label="IMEI" value={device.imei} />
                            </div>
                             <div className="mt-4 flex gap-2">
                                <button onClick={() => setIsSettingsOpen(true)} className="flex-1 rounded-md bg-[var(--neutral-700)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--neutral-600)] transition-colors">Settings</button>
                                <button onClick={onDisconnect} className="flex-1 rounded-md bg-[var(--neutral-700)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--neutral-600)] transition-colors">Disconnect</button>
                            </div>
                        </div>
                        <ActivityLog />
                    </div>
                </div>
            </div>
            <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Application Settings">
                <Settings />
            </Modal>
        </div>
    );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-[var(--neutral-400)]">{label}</span>
    <span className="font-mono text-white">{value}</span>
  </div>
);

const ToolkitCard: React.FC<{title: string, description: string, onClick: () => void, disabled?: boolean}> = ({ title, description, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className="p-4 text-left rounded-lg bg-[var(--neutral-800)]/50 border border-[var(--neutral-800)] hover:border-[var(--neutral-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-xs text-[var(--neutral-400)] mt-1">{description}</p>
    </button>
);


export default Dashboard;
