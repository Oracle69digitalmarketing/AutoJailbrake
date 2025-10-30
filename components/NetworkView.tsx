import React, { useState, useEffect } from 'react';
import { networkService } from '../services/networkService';
import type { Device } from '../types';
import { ServerStackIcon } from './icons';

interface NetworkViewProps {
  onDeviceSelected: (device: Device) => void;
}

const NetworkView: React.FC<NetworkViewProps> = ({ onDeviceSelected }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [devices, setDevices] = useState<Device[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const scan = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const foundDevices = await networkService.scanForDevices();
                setDevices(foundDevices);
            } catch (e) {
                setError("Failed to scan the network. Ensure the server is running.");
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        scan();
    }, []);

    return (
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Network Devices</h1>
                <p className="mt-2 text-[var(--neutral-400)] max-w-2xl mx-auto">
                    Discover and manage devices running AutoJailbreak on your local network.
                </p>
            </div>
            
            <div className="mt-8">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center text-center p-12 rounded-lg border border-dashed border-[var(--neutral-700)]">
                        <ServerStackIcon className="h-12 w-12 text-[var(--primary-500)] animate-pulse" />
                        <p className="mt-4 font-semibold">Scanning local network...</p>
                        <p className="text-sm text-[var(--neutral-400)]">Looking for other AutoJailbreak instances.</p>
                    </div>
                )}
                {!isLoading && error && (
                     <div className="p-12 text-center text-red-400">
                        <p>{error}</p>
                    </div>
                )}
                {!isLoading && !error && devices.length === 0 && (
                     <div className="p-12 text-center text-[var(--neutral-400)]">
                        <p>No other devices found on the network.</p>
                    </div>
                )}
                {!isLoading && !error && devices.length > 0 && (
                    <div className="space-y-4">
                        {devices.map(device => (
                            <button key={device.id} onClick={() => onDeviceSelected(device)} className="w-full text-left p-4 rounded-md bg-[var(--neutral-800)]/60 hover:bg-[var(--neutral-700)] transition-colors flex justify-between items-center border border-[var(--neutral-700)]">
                                <div>
                                    <p className="font-semibold">{device.name}</p>
                                    <p className="text-xs text-[var(--neutral-400)]">{device.os} {device.osVersion}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-mono">{device.ipAddress}</p>
                                    <p className="text-xs text-[var(--neutral-500)]">{device.status}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NetworkView;
