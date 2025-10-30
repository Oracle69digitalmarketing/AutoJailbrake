import React, { useState, useEffect } from 'react';
import { networkService } from '../services/networkService';
import type { Device } from '../types';
import { DevicePhoneMobileIcon, SparkleIcon } from './icons';
import StatusBadge from './StatusBadge';
import { showNotification } from '../services/notification';


const MobileApp: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

    useEffect(() => {
        const scan = async () => {
            setIsLoading(true);
            try {
                const foundDevices = await networkService.scanForDevices();
                setDevices(foundDevices);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        scan();
    }, []);

    if (selectedDevice) {
        return <MobileDeviceDetail device={selectedDevice} onBack={() => setSelectedDevice(null)} />;
    }

    return (
        <div className="p-4">
            <header className="flex items-center justify-between pb-4 border-b border-[var(--neutral-700)]">
                <div className="flex items-center gap-3">
                    <DevicePhoneMobileIcon className="h-6 w-6 text-[var(--primary-500)]" />
                    <h1 className="text-xl font-bold">Remote Dashboard</h1>
                </div>
            </header>
            
            <div className="mt-4">
                {isLoading && <p className="text-center text-[var(--neutral-400)]">Scanning for devices...</p>}
                {!isLoading && devices.length === 0 && <p className="text-center text-[var(--neutral-400)]">No devices found.</p>}
                
                <div className="space-y-3">
                    {devices.map(device => (
                        <div key={device.id} onClick={() => setSelectedDevice(device)} className="p-4 rounded-lg bg-[var(--neutral-800)] border border-[var(--neutral-700)]">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{device.name}</p>
                                    <p className="text-xs text-[var(--neutral-400)]">{device.os} {device.osVersion}</p>
                                </div>
                                <StatusBadge status={device.status} />
                            </div>
                            <p className="text-xs font-mono text-[var(--neutral-500)] mt-2">{device.ipAddress}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const MobileDeviceDetail: React.FC<{ device: Device; onBack: () => void; }> = ({ device, onBack }) => {
    
    const handleAction = (actionName: string) => {
        console.log(`[MOBILE] Requesting action '${actionName}' for device ${device.id} at ${device.ipAddress}`);
        // In a real app, this would make a POST request to the server at device.ipAddress
        showNotification({
            title: 'Action Requested',
            message: `Sent '${actionName}' command to server.`,
            type: 'success',
        });
    };

    return (
        <div className="p-4">
             <header className="pb-4">
                <button onClick={onBack} className="text-sm font-medium text-[var(--primary-500)] hover:underline">
                    &larr; Back to Device List
                </button>
            </header>
            <div className="mt-2 text-center">
                <img src={device.imageUrl} className="w-32 h-48 object-cover mx-auto rounded-lg shadow-lg" />
                <h1 className="text-2xl font-bold mt-4">{device.name}</h1>
                <p className="text-md text-[var(--neutral-400)]">{device.os} {device.osVersion}</p>
                <div className="mt-2 flex justify-center">
                    <StatusBadge status={device.status} />
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    <SparkleIcon className="h-5 w-5 text-yellow-400" />
                    Remote Actions
                </h3>
                <button onClick={() => handleAction('Start Jailbreak')} className="w-full p-4 text-left rounded-lg bg-[var(--neutral-700)] hover:bg-[var(--neutral-600)]">Jailbreak</button>
                <button onClick={() => handleAction('Start Unlock')} className="w-full p-4 text-left rounded-lg bg-[var(--neutral-700)] hover:bg-[var(--neutral-600)]">Unlock</button>
                <button onClick={() => handleAction('Start Data Recovery')} className="w-full p-4 text-left rounded-lg bg-[var(--neutral-700)] hover:bg-[var(--neutral-600)]">Recover Data</button>
            </div>
        </div>
    );
}

export default MobileApp;
