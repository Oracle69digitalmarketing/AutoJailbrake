
import React, { useState, useMemo } from 'react';
import type { Device, Tweak } from '../types';
import { ArrowDownTrayIcon } from './icons';

interface TweakInstallerViewProps {
    device: Device;
    onBack: () => void;
}

const MOCK_TWEAKS: Tweak[] = [
    { id: 'cylinder', name: 'Cylinder Reborn', author: 'ryannair05', description: 'Make your icons dance. Cylinder Reborn provides a huge variety of animations for scrolling through your home screen pages.', version: '1.1.0', repository: 'Chariz', isInstalled: false },
    { id: 'snowboard', name: 'SnowBoard', author: 'SparkDev', description: 'The ultimate theming engine for iOS. Customize icons, UI elements, and much more with thousands of available themes.', version: '1.4.20', repository: 'SparkDev', isInstalled: true },
    { id: 'icleaner', name: 'iCleaner Pro', author: 'Ivano Bilenchi', description: 'The first real iOS system cleaner and optimizer. It removes unnecessary files from your device, and allows you to tweak it to your wish.', version: '7.9.1', repository: 'BigBoss', isInstalled: true },
    { id: 'newterm', name: 'NewTerm 2', author: 'haskal', description: 'A powerful, modern terminal emulator for iOS. It provides full access to the underlying command-line environment.', version: '2.5', repository: 'Chariz', isInstalled: false },
    { id: 'shuffle', name: 'Shuffle', author: 'CreatureSurvive', description: 'Organize your settings page. Groups tweaks, apps, and system settings into separate, easy-to-navigate sections.', version: '1.2.9', repository: 'CreatureCoding', isInstalled: true },
    { id: 'choicy', name: 'Choicy', author: 'opa334', description: 'Advanced tweak configurator allowing you to disable tweak injection in applications and daemons.', version: '1.4.5', repository: 'BigBoss', isInstalled: false },
    { id: 'crane', name: 'Crane', author: 'opa334', description: 'Multiple containers for any app. Log into multiple accounts on apps like Instagram, Snapchat, and more.', version: '1.2.2', repository: 'Havoc', isInstalled: false },
];


const TweakInstallerView: React.FC<TweakInstallerViewProps> = ({ device, onBack }) => {
    const [tweaks, setTweaks] = useState<Tweak[]>(MOCK_TWEAKS);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggleInstall = (tweakId: string) => {
        setTweaks(currentTweaks =>
            currentTweaks.map(t =>
                t.id === tweakId ? { ...t, isInstalled: !t.isInstalled } : t
            )
        );
    };

    const filteredTweaks = useMemo(() => {
        return tweaks.filter(tweak =>
            tweak.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tweak.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tweak.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [tweaks, searchTerm]);

    if (device.status !== 'Jailbroken') {
        return (
            <div className="text-center animate-fade-in">
                <div className="mb-6">
                    <button onClick={onBack} className="text-sm font-medium text-[var(--primary-500)] hover:underline">
                    &larr; Back to Orchestrator
                    </button>
                </div>
                <h2 className="text-2xl font-bold">Jailbreak Required</h2>
                <p className="mt-2 text-[var(--neutral-400)]">
                    The Tweak Installer is only available for jailbroken devices.
                </p>
            </div>
        );
    }
    
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
                    Browse and manage popular tweaks for your jailbroken <strong>{device.name}</strong>.
                </p>
            </div>
            
             <div className="mt-8 mb-6">
                <input
                    type="text"
                    placeholder="Search for tweaks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full rounded-md border-[var(--neutral-700)] bg-[var(--neutral-800)]/50 text-white shadow-sm focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)] sm:text-sm p-3"
                />
            </div>

            <div className="overflow-hidden rounded-lg border border-[var(--neutral-800)]">
                <table className="min-w-full divide-y divide-[var(--neutral-800)]">
                    <thead className="bg-[var(--neutral-800)]/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tweak</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Version</th>
                            <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Repository</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Install</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-[var(--neutral-900)] divide-y divide-[var(--neutral-800)]">
                        {filteredTweaks.map(tweak => (
                            <tr key={tweak.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-white">{tweak.name}</div>
                                    <div className="text-sm text-[var(--neutral-400)]">{tweak.author}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-400)]">{tweak.version}</td>
                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-400)]">{tweak.repository}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => handleToggleInstall(tweak.id)}
                                        className={`flex items-center justify-center gap-2 w-28 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                                            tweak.isInstalled
                                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                        }`}
                                    >
                                        {tweak.isInstalled ? (
                                            'Uninstall'
                                        ) : (
                                            <>
                                                <ArrowDownTrayIcon className="h-4 w-4" />
                                                Install
                                            </>
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredTweaks.length === 0 && (
                    <div className="text-center py-8 text-[var(--neutral-400)]">
                        No tweaks found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};


export default TweakInstallerView;
