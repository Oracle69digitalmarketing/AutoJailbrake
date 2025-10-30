import React from 'react';
import type { Device } from '../types';

interface TweakInstallerViewProps {
    device: Device;
    onBack: () => void;
}

const MOCK_TWEAKS = [
    { name: 'Cylinder Reborn', description: 'Animated home screen icon transitions.' },
    { name: 'SnowBoard', description: 'Themable icons and UI elements.' },
    { name: 'iCleaner Pro', description: 'System maintenance and cleanup tool.' },
    { name: 'Filza File Manager', description: 'Full access to the device filesystem.' },
];

const TweakInstallerView: React.FC<TweakInstallerViewProps> = ({ device, onBack }) => {
    return (
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mb-6">
                <button onClick={onBack} className="text-sm font-medium text-[var(--primary-500)] hover:underline">
                    &larr; Back to Orchestrator
                </button>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Tweak Installer</h1>
                <p className="mt-2 text-[var(--neutral-400)] max-w-2xl mx-auto">
                    Install popular packages and tweaks on your jailbroken <strong>{device.name}</strong>.
                </p>
            </div>

            <div className="mt-8 space-y-4">
                {MOCK_TWEAKS.map(tweak => (
                    <div key={tweak.name} className="flex items-center justify-between p-4 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/50">
                        <div>
                            <h4 className="font-semibold text-white">{tweak.name}</h4>
                            <p className="text-sm text-[var(--neutral-400)]">{tweak.description}</p>
                        </div>
                        <button 
                            onClick={() => alert(`Installing ${tweak.name}... (Feature not implemented)`)}
                            className="rounded-md bg-[var(--primary-500)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--primary-600)] transition-colors"
                        >
                            Install
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TweakInstallerView;
