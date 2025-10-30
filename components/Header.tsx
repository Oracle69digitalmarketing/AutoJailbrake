import React from 'react';
import { Cog8ToothIcon, SparkleIcon } from './icons';
import { View } from '../types';

interface HeaderProps {
    activeView: View;
    onNavigate: (view: 'dashboard' | 'logs') => void;
    onOpenSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, onOpenSettings }) => {
    
    // FIX: The highlighting logic for the dashboard link was incorrect.
    // It now correctly identifies any view that isn't 'logs' as part of the dashboard flow.
    const getLinkClasses = (view: 'dashboard' | 'logs') => {
        const isDashboardActive = view === 'dashboard' && activeView !== 'logs';
        const isLogsActive = view === 'logs' && activeView === 'logs';
        return `text-sm font-medium transition-colors ${
            isDashboardActive || isLogsActive ? 'text-white' : 'text-[var(--neutral-400)] hover:text-white'
        }`;
    }

    return (
        <header className="sticky top-0 z-10 border-b border-[var(--neutral-800)] bg-[var(--neutral-900)]/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                         <SparkleIcon className="h-7 w-7 text-[var(--primary-500)]" />
                        <h1 className="text-xl font-bold">AutoJailbreak</h1>
                    </div>
                    <nav className="hidden items-center gap-4 md:flex">
                        {/* FIX: The link class was checking for 'connect' instead of 'dashboard'. */}
                        <button onClick={() => onNavigate('dashboard')} className={getLinkClasses('dashboard')}>
                            Dashboard
                        </button>
                        <button onClick={() => onNavigate('logs')} className={getLinkClasses('logs')}>
                            Activity Log
                        </button>
                    </nav>
                </div>
                <button 
                    onClick={onOpenSettings} 
                    className="p-2 rounded-md hover:bg-[var(--neutral-800)] transition-colors"
                    aria-label="Settings"
                >
                    <Cog8ToothIcon className="h-6 w-6 text-[var(--neutral-400)]" />
                </button>
            </div>
        </header>
    );
};

export default Header;
