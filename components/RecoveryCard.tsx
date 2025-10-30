import React from 'react';
import type { RecoveryModule } from '../types';

interface RecoveryCardProps {
    module: RecoveryModule;
    onExecute: () => void;
}

const RecoveryCard: React.FC<RecoveryCardProps> = ({ module, onExecute }) => {
    const Icon = module.icon;
    return (
        <div className="flex flex-col gap-4 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 p-6 transition-transform hover:scale-[1.02] hover:border-[var(--neutral-700)]">
            <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[var(--neutral-700)] text-[var(--primary-500)]">
                    <Icon className="h-7 w-7" />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{module.name}</h4>
                </div>
            </div>
            <p className="flex-grow text-[var(--neutral-400)] text-sm">{module.description}</p>
            <button 
                onClick={onExecute}
                className="mt-auto flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors bg-[var(--neutral-700)] hover:bg-[var(--neutral-600)] text-white">
                Start Scan
            </button>
        </div>
    );
};

export default RecoveryCard;