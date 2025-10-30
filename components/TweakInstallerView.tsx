import React from 'react';
import { MOCK_TWEAKS } from '../constants';
import type { Tweak } from '../types';

interface TweakInstallerViewProps {
    onExecuteAction: (actionName: string) => void;
    onBack: () => void;
}

const TweakInstallerView: React.FC<TweakInstallerViewProps> = ({ onExecuteAction, onBack }) => {
    return (
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mb-6">
                <button onClick={onBack} className="text-sm font-medium text-[var(--primary-500)] hover:underline">
                    &larr; Back to Dashboard
                </button>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Tweak Installer</h1>
                <p className="mt-2 text-[var(--neutral-400)] max-w-2xl mx-auto">
                    Browse and install popular packages for your jailbroken device.
                </p>
            </div>

            <div className="mt-8 space-y-4">
                {MOCK_TWEAKS.map(tweak => (
                    <TweakCard 
                        key={tweak.id}
                        tweak={tweak}
                        onInstall={() => onExecuteAction(`Install ${tweak.name}`)}
                    />
                ))}
            </div>
        </div>
    );
};

interface TweakCardProps {
    tweak: Tweak;
    onInstall: () => void;
}

const TweakCard: React.FC<TweakCardProps> = ({ tweak, onInstall }) => {
    return (
        <div className="flex items-center gap-4 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 p-4">
            <img src={tweak.iconUrl} alt={tweak.name} className="h-16 w-16 rounded-md object-cover" />
            <div className="flex-grow">
                <h3 className="font-semibold text-white">{tweak.name} <span className="text-xs font-mono text-[var(--neutral-500)]">{tweak.version}</span></h3>
                <p className="text-sm text-[var(--neutral-400)]">by {tweak.author}</p>
                <p className="text-xs text-[var(--neutral-500)] mt-1">{tweak.description}</p>
            </div>
            <button
                onClick={onInstall}
                className="rounded-md bg-[var(--neutral-700)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--neutral-600)] transition-colors shrink-0"
            >
                Install
            </button>
        </div>
    );
};

export default TweakInstallerView;
