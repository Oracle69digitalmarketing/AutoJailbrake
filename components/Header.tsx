import React from 'react';
import type { AppView } from '../types';
import { UsbIcon, ServerStackIcon, ChartBarIcon } from './icons';

interface HeaderProps {
  currentView: AppView['name'];
  onNavigate: (view: AppView['name']) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { name: 'connect' as AppView['name'], label: 'Dashboard', icon: UsbIcon },
    { name: 'network' as AppView['name'], label: 'Network', icon: ServerStackIcon },
    { name: 'analytics' as AppView['name'], label: 'Analytics', icon: ChartBarIcon },
  ];

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--neutral-800)] bg-[var(--neutral-900)]/80 px-4 sm:px-6 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-[var(--primary-500)] text-lg font-bold">
            AJ
        </div>
        <h1 className="text-xl font-bold tracking-tighter">AutoJailbreak</h1>
      </div>

      <nav className="hidden md:flex items-center gap-2 rounded-full bg-[var(--neutral-800)] p-1">
        {navItems.map((item) => {
          const isActive = 
            (item.name === 'connect' && ['connect', 'manual_id', 'dashboard', 'recovery', 'passcode', 'tweaks', 'restore', 'processing', 'results'].includes(currentView)) ||
            item.name === currentView;
          
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-[var(--primary-500)] text-white'
                  : 'text-[var(--neutral-400)] hover:bg-[var(--neutral-700)] hover:text-white'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="text-xs font-mono text-[var(--neutral-500)]">
        v2.5.0
      </div>
    </header>
  );
};

export default Header;
