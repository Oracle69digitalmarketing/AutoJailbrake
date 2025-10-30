import React, { useState, useEffect } from 'react';
import type { Device, Exploit } from '../types';
import StatusBadge from './StatusBadge';
import ActionButton from './ActionButton';
import { getAvailableExploits } from '../services/api';

interface DeviceDetailsProps {
  device: Device;
  onBack: () => void;
  onExecuteAction: (actionName: string) => void;
}

const DeviceDetails: React.FC<DeviceDetailsProps> = ({ device, onBack, onExecuteAction }) => {
  const [exploits, setExploits] = useState<Exploit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExploits = async () => {
      setIsLoading(true);
      const availableExploits = await getAvailableExploits(device);
      setExploits(availableExploits);
      setIsLoading(false);
    };
    fetchExploits();
  }, [device]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mb-6">
        <button onClick={onBack} className="text-sm font-medium text-[var(--primary-500)] hover:underline">
          &larr; Back to Orchestrator
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Left Column: Device Info */}
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="sticky top-24">
            <div className="overflow-hidden rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30">
              <img src={device.imageUrl} alt={device.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{device.name}</h2>
                    <p className="text-md text-[var(--neutral-400)]">{device.os} {device.osVersion}</p>
                  </div>
                  <StatusBadge status={device.status} />
                </div>
                <div className="mt-6 space-y-3 border-t border-[var(--neutral-700)] pt-4 text-sm">
                  <InfoRow label="Serial" value={device.serial} />
                  <InfoRow label="IMEI" value={device.imei} />
                  <InfoRow label="Storage" value={device.storage} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="w-full lg:w-2/3">
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-4">Manual Actions</h3>
            {isLoading ? <p className="text-[var(--neutral-400)]">Loading available actions...</p> :
              (exploits.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {exploits.map(exploit => (
                        <ActionButton
                            key={exploit.name}
                            exploit={exploit}
                            onClick={() => onExecuteAction(exploit.name)}
                        />
                    ))}
                </div>
              ) : (
                <p className="text-[var(--neutral-400)]">No specific manual actions available for this device configuration.</p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-[var(--neutral-400)]">{label}</span>
    <span className="font-mono text-white">{value}</span>
  </div>
);

export default DeviceDetails;