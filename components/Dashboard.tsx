import React from 'react';
import type { AppView, Device } from '../types';
import AIRecommender from './AIRecommender';
import DeviceDetails from './DeviceDetails';
import ActivityLog from './ActivityLog';
import Settings from './Settings';
import AutoUpdater from './AutoUpdater';
import { RecoveryIcon, ArrowUturnLeftIcon, UnlockIcon, PuzzlePieceIcon, ServerStackIcon } from './icons';

interface DashboardProps {
  device: Device;
  onDisconnect: () => void;
  onNavigate: (view: AppView['name']) => void;
  onExecuteAction: (actionName: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ device, onDisconnect, onNavigate, onExecuteAction }) => {
  const isJailbroken = device.status === 'Jailbroken';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      <div className="lg:col-span-2 space-y-8">
        <AutoUpdater />
        <AIRecommender device={device} onExecute={onExecuteAction} />
        <DeviceDetails device={device} onBack={onDisconnect} onExecuteAction={onExecuteAction} />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <div className="p-6 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30">
          <h3 className="text-lg font-bold mb-4">Toolkit</h3>
          <div className="grid grid-cols-2 gap-4">
            <ToolButton label="Recovery" icon={RecoveryIcon} onClick={() => onNavigate('recovery')} />
            <ToolButton label="Restore" icon={ArrowUturnLeftIcon} onClick={() => onNavigate('restore')} />
            <ToolButton label="Passcode" icon={UnlockIcon} onClick={() => onNavigate('passcode')} />
            <ToolButton label="Tweaks" icon={PuzzlePieceIcon} onClick={() => onNavigate('tweaks')} disabled={!isJailbroken} />
          </div>
        </div>
        <div className="p-6 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30">
          <h3 className="text-lg font-bold mb-4">Activity Log</h3>
          <ActivityLog />
        </div>
        <div className="p-6 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30">
          <h3 className="text-lg font-bold mb-4">Settings</h3>
          <Settings />
        </div>
      </div>
    </div>
  );
};

const ToolButton: React.FC<{ label: string; icon: React.ElementType; onClick: () => void; disabled?: boolean }> = ({ label, icon: Icon, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="flex flex-col items-center justify-center p-4 text-center rounded-md bg-[var(--neutral-700)] hover:bg-[var(--neutral-600)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
    <Icon className="h-6 w-6 mb-2" />
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

export default Dashboard;
