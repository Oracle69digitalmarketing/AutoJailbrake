import React, { useState, useEffect } from 'react';
import { networkService } from '../services/networkService';
import type { TrafficData } from '../types';

const NetworkView: React.FC = () => {
    const [packets, setPackets] = useState<TrafficData[]>([]);
    const [isMonitoring, setIsMonitoring] = useState(false);

    useEffect(() => {
        let unsubscribe: (() => void) | null = null;
        if (isMonitoring) {
            networkService.start();
            unsubscribe = networkService.subscribe((packet) => {
                setPackets(prev => [packet, ...prev.slice(0, 49)]);
            });
        } else {
            networkService.stop();
        }

        return () => {
            networkService.stop();
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [isMonitoring]);

    return (
        <div className="rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-semibold">Live Network Traffic</h3>
                <button
                    onClick={() => setIsMonitoring(!isMonitoring)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md ${isMonitoring ? 'bg-red-500/30 text-red-400' : 'bg-green-500/30 text-green-400'}`}
                >
                    {isMonitoring ? 'Stop' : 'Start'}
                </button>
            </div>
            <div className="h-40 overflow-y-auto bg-[var(--neutral-900)] p-2 rounded-md font-mono text-xs">
                {packets.length === 0 && <p className="text-center text-[var(--neutral-500)] text-[10px]">Start monitoring to see traffic.</p>}
                {packets.map((p, i) => (
                    <div key={`${p.timestamp}-${i}`} className="flex justify-between p-1 text-[10px]">
                        <span className="text-blue-400 w-1/3 truncate">{p.source} &rarr; {p.destination}</span>
                        <span className="text-yellow-400">{p.protocol}</span>
                        <span className="text-white">{p.length}b</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NetworkView;
