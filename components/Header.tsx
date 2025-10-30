import React from 'react';
import { UsbIcon } from './icons';

const Header: React.FC = () => {
    return (
        <header className="border-b border-[var(--neutral-800)] bg-[var(--neutral-900)]/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <UsbIcon className="h-8 w-8 text-[var(--primary-500)]" />
                    <h1 className="text-xl font-bold tracking-tight">
                        Auto<span className="text-[var(--primary-500)]">Jailbreak</span>
                    </h1>
                </div>
                <div className="text-xs font-mono text-[var(--neutral-500)]">
                    v2.5.0
                </div>
            </div>
        </header>
    );
};

export default Header;
