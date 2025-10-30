
import React from 'react';
import type { Device } from '../types';
import StatusBadge from './StatusBadge';

interface DeviceCardProps {
  device: Device;
  onSelect: (device: Device) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onSelect }) => {
  return (
    <div 
      className="flex flex-col overflow-hidden rounded-lg border border-[var(--neutral-700)] bg-[var(--neutral-800)] shadow-lg transition-transform hover:scale-105 cursor-pointer"
      onClick={() => onSelect(device)}
    >
      <div className="relative h-48 w-full">
        <img src={device.imageUrl} alt={device.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold">{device.name}</h3>
          <p className="text-sm text-[var(--neutral-400)]">{device.os} {device.osVersion}</p>
        </div>
        <div className="absolute right-4 top-4">
          <StatusBadge status={device.status} />
        </div>
      </div>
      <div className="flex-1 p-4">
        <p className="mb-4 text-sm text-[var(--neutral-400)]">Quick actions for your device.</p>
        <div className="flex gap-3">
          <button onClick={(e) => e.stopPropagation()} className="flex-1 rounded-md bg-[var(--primary-500)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-600)] transition-colors">Recovery</button>
          <button onClick={(e) => e.stopPropagation()} className="flex-1 rounded-md bg-[var(--neutral-700)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--neutral-600)] transition-colors">
            {device.status === 'Locked' ? 'Unlock' : 'Jailbreak'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
