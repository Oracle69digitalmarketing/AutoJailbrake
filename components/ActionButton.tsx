import React from 'react';
import { Exploit, ExploitType } from '../types';
import { JailbreakIcon, RecoveryIcon, UnlockIcon } from './icons';

interface ActionButtonProps {
    exploit: Exploit;
    onClick: (actionName: string) => void;
    disabled?: boolean;
}

const exploitIcons: Record<ExploitType, React.ElementType> = {
    [ExploitType.Jailbreak]: JailbreakIcon,
    [ExploitType.Unlock]: UnlockIcon,
    [ExploitType.Recovery]: RecoveryIcon,
};

const ActionButton: React.FC<ActionButtonProps> = ({ exploit, onClick, disabled = false }) => {
    const Icon = exploitIcons[exploit.type] || JailbreakIcon;
    const buttonText = `Start ${exploit.name}`;

    const buttonClasses = exploit.type === ExploitType.Recovery 
        ? "bg-[var(--neutral-600)] hover:bg-[var(--neutral-500)] text-[var(--neutral-100)]"
        : "bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white";

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 p-6 transition-transform hover:scale-[1.02] hover:border-[var(--neutral-700)]">
            <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[var(--neutral-700)] text-[var(--primary-500)]">
                    <Icon className="h-7 w-7" />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">{exploit.name}</h4>
                </div>
            </div>
            <p className="flex-grow text-[var(--neutral-400)] text-sm">{exploit.description}</p>
            <button 
                onClick={() => onClick(exploit.name)}
                disabled={disabled}
                className={`mt-auto flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors ${buttonClasses} disabled:opacity-50 disabled:cursor-not-allowed`}>
                {buttonText}
            </button>
        </div>
    );
};

export default ActionButton;
