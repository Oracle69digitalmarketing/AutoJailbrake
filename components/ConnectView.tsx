import React, { useEffect, useState } from 'react';
import { deviceDetector } from '../services/deviceDetector';
import type { Device } from '../types';
import { UsbIcon } from './icons';

interface ConnectViewProps {
  onDeviceDetected: (device: Device) => void;
  onManualSelect: () => void;
}

const ConnectView: React.FC<ConnectViewProps> = ({ onDeviceDetected, onManualSelect }) => {
  const [status, setStatus] = useState('Waiting for device connection...');

  useEffect(() => {
    setStatus('Scanning USB ports...');
    const subscription = deviceDetector.subscribe({
      onConnect: (device) => {
        setStatus(`Device detected: ${device.name}`);
        setTimeout(() => onDeviceDetected(device), 1000);
      },
      onDisconnect: () => {
        setStatus('Device disconnected. Waiting for connection...');
      },
    });

    // Simulate connection for demo
    deviceDetector.start();

    return () => {
      subscription.unsubscribe();
      deviceDetector.stop();
    };
  }, [onDeviceDetected]);

  return (
    <div className="flex flex-col items-center justify-center text-center pt-16 animate-fade-in">
        <div className="relative flex items-center justify-center w-40 h-40">
            <div className="absolute inset-0 bg-[var(--primary-500)]/10 rounded-full animate-pulse"></div>
            <div className="relative bg-[var(--neutral-800)] rounded-full p-8 border-2 border-[var(--neutral-700)]">
                <UsbIcon className="w-16 h-16 text-[var(--primary-500)]" />
            </div>
        </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight">Connect Your Device</h1>
      <p className="mt-2 text-[var(--neutral-400)] max-w-md">
        Plug in your iOS or Android device via USB to begin the automated analysis process.
      </p>
      
      <p className="mt-6 text-sm font-semibold text-white font-mono p-2 bg-[var(--neutral-800)] rounded-md">
        {status}
      </p>

      <div className="mt-8 border-t border-[var(--neutral-800)] w-full max-w-sm pt-6">
        <p className="text-sm text-[var(--neutral-400)]">
          If your device is not detected or is unresponsive, you can identify it manually.
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
