import React from 'react';
import type { Device } from '../types';
import { RECOVERY_MODULES } from '../constants';
import RecoveryCard from './RecoveryCard';

interface RecoveryViewProps {
    device: Device;
    onExecuteAction: (actionName: string) => void;
    onBack: () => void;
}

const RecoveryView: React.FC<RecoveryViewProps> = ({ device, onExecuteAction, onBack }) => {
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mb-6">
                <button onClick={onBack} className="text-sm font-medium text-[var(--primary-500)] hover:underline">
                &larr; Back to Orchestrator
                </button>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Data Recovery Suite</h1>
                <p className="mt-2 text-[var(--neutral-400)] max-w-2xl mx-auto">
                    Select a recovery module to scan for lost data on your <strong>{device.name}</strong>. Data is recovered to your local machine.
                </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {RECOVERY_MODULES.map(module => (
                    <RecoveryCard 
                        key={module.name}
                        module={module}
                        onExecute={() => onExecuteAction(module.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecoveryView;