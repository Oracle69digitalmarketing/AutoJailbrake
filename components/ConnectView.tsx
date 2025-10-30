import React, { useEffect, useState } from 'react';
import { deviceDetector } from '../services/deviceDetector';
import type { Device } from '../types';
import { UsbIcon } from './icons';

interface ConnectViewProps {
  onDeviceSelected: (device: Device) => void;
  onManualSelect: () => void;
}

const ConnectView: React.FC<ConnectViewProps> = ({ onDeviceSelected, onManualSelect }) => {
  const [status, setStatus] = useState('Initializing...');
  const [error, setError] = useState<string | null>(null);
  const [detectedDevices, setDetectedDevices] = useState<Device[]>([]);

  useEffect(() => {
    setStatus('Scanning for devices...');
    const subscription = deviceDetector.subscribe({
      onConnect: (devices) => {
        setError(null);
        setStatus(`Found ${devices.length} device(s). Please select one to continue.`);
        setDetectedDevices(devices);
      },
      onDisconnect: () => {
        setStatus('Device disconnected. Waiting for connection...');
        setDetectedDevices([]);
      },
      onError: (errorMessage) => {
        setError(errorMessage);
        setStatus('Error connecting to service.');
        setDetectedDevices([]);
      }
    });

    deviceDetector.start();

    return () => {
      subscription.unsubscribe();
      deviceDetector.stop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center pt-16 animate-fade-in">
      <div className="relative flex items-center justify-center w-40 h-40">
        <div className={`absolute inset-0 bg-[var(--primary-500)]/10 rounded-full ${detectedDevices.length === 0 && !error ? 'animate-pulse' : ''}`}></div>
        <div className="relative bg-[var(--neutral-800)] rounded-full p-8 border-2 border-[var(--neutral-700)]">
          <UsbIcon className={`w-16 h-16 ${error ? 'text-red-500' : 'text-[var(--primary-500)]'}`} />
        </div>
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight">Connect Your Device</h1>
      <p className="mt-2 text-[var(--neutral-400)] max-w-md">
        Plug in your device via USB. The backend service will detect it automatically.
      </p>

      <div className="mt-6 font-mono p-2 bg-[var(--neutral-800)] rounded-md min-h-[40px] flex items-center justify-center">
        <p className={`text-sm font-semibold ${error ? 'text-red-400' : 'text-white'}`}>
            {error || status}
        </p>
      </div>
      
      {detectedDevices.length > 0 && (
          <div className="mt-6 w-full max-w-md space-y-3">
              {detectedDevices.map(device => (
                  <button key={device.id} onClick={() => onDeviceSelected(device)} className="w-full text-left p-4 rounded-md bg-[var(--neutral-700)] hover:bg-[var(--neutral-600)] transition-colors flex justify-between items-center">
                      <div>
                          <p className="font-semibold">{device.name}</p>
                          <p className="text-xs text-[var(--neutral-400)]">{device.os} {device.osVersion}</p>
                      </div>
                      <span className="text-xs font-mono text-[var(--neutral-500)]">{device.serial}</span>
                  </button>
              ))}
          </div>
      )}

      <div className="mt-8 border-t border-[var(--neutral-800)] w-full max-w-sm pt-6">
        <p className="text-sm text-[var(--neutral-400)]">
          If your device is not detected, check the backend service or identify it manually.
        </p>
        <button
          onClick={onManualSelect}
          className="mt-4 rounded-md bg-[var(--neutral-700)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--neutral-600)] transition-colors"
        >
          Identify Device Manually
        </button>
      </div>
    </div>
  );
};

export default ConnectView;
