import React, { useState } from 'react';
import { MOCK_DEVICES } from '../constants';
import type { Device } from '../types';
import { DeviceStatus } from '../types';

interface ManualIDViewProps {
  onDeviceIdentified: (device: Device) => void;
  onBack: () => void;
}

const ManualIDView: React.FC<ManualIDViewProps> = ({ onDeviceIdentified, onBack }) => {
  const [os, setOs] = useState<'iOS' | 'Android'>('iOS');
  const [model, setModel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model) return;

    // Create a mock device object based on user input
    const mockDevice: Device = {
        id: 'manual-' + Date.now(),
        name: model,
        os: os,
        osVersion: 'Unknown',
        imageUrl: `https://picsum.photos/seed/${model}/400/600`,
        status: DeviceStatus.Locked, // Assume locked for manual entry
        serial: 'N/A',
        storage: 'N/A',
        imei: 'N/A',
    };
    onDeviceIdentified(mockDevice);
  };

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="mb-6">
        <button onClick={onBack} className="text-sm font-medium text-[var(--primary-500)] hover:underline">
          &larr; Back to Auto-Detection
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center">Manual Device Identification</h1>
      <p className="text-center text-[var(--neutral-400)] mt-2">
        If your device cannot be detected, please provide its details below.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 p-8 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 space-y-6">
        <div>
            <label htmlFor="os" className="block text-sm font-medium text-white">Operating System</label>
            <select
                id="os"
                value={os}
                onChange={(e) => setOs(e.target.value as 'iOS' | 'Android')}
                className="mt-1 block w-full rounded-md border-[var(--neutral-700)] bg-[var(--neutral-900)] text-white shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm p-3"
            >
                <option>iOS</option>
                <option>Android</option>
            </select>
        </div>

        <div>
            <label htmlFor="model" className="block text-sm font-medium text-white">Device Model</label>
            <p className="text-xs text-[var(--neutral-400)] mb-1">e.g., "iPhone 13 Pro", "Galaxy S22 Ultra"</p>
            <input
                type="text"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter device model name"
                required
                className="mt-1 block w-full rounded-md border-[var(--neutral-700)] bg-[var(--neutral-900)] text-white shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm p-3"
            />
        </div>
        
        <div className="pt-4">
            <button 
                type="submit"
                className="w-full flex justify-center rounded-md bg-[var(--primary-500)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-600)] transition-colors disabled:opacity-50"
                disabled={!model}
            >
                Analyze Device
            </button>
        </div>
      </form>
    </div>
  );
};

export default ManualIDView;
