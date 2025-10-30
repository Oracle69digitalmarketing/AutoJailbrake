import React from 'react';
import type { Device, Backup } from '../types';
import { MOCK_BACKUPS } from '../constants';
import { ArrowUturnLeftIcon } from './icons';

interface RestoreViewProps {
    device: Device;
    onExecuteAction: (actionName: string) => void;
    onBack: () => void;
}

const RestoreView: React.FC<RestoreViewProps> = ({ device, onExecuteAction, onBack }) => {
    return (
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mb-6">
                <button onClick={onBack} className="text-sm font-medium text-[var(--primary-500)] hover:underline">
                    &larr; Back to Orchestrator
                </button>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">System Restore</h1>
                <p className="mt-2 text-[var(--neutral-400)] max-w-2xl mx-auto">
                    Restore <strong>{device.name}</strong> to a previous state. This can undo a jailbreak or fix software issues. This process may erase data created after the backup date.
                </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-lg border border-[var(--neutral-800)]">
                <table className="min-w-full divide-y divide-[var(--neutral-800)]">
                    <thead className="bg-[var(--neutral-800)]/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Backup Point</th>
                            <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                            <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Size</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Restore</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-[var(--neutral-900)] divide-y divide-[var(--neutral-800)]">
                        {MOCK_BACKUPS.map(backup => (
                            <tr key={backup.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <ArrowUturnLeftIcon className="h-5 w-5 text-[var(--neutral-400)]" />
                                        <div>
                                            <div className="font-medium text-white">{backup.name}</div>
                                            <div className="text-sm text-[var(--neutral-400)]">{backup.type}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-400)]">{backup.date}</td>
                                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-[var(--neutral-400)] font-mono">{backup.size}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onExecuteAction(`Restore to '${backup.name}'`)}
                                        className="rounded-md bg-[var(--primary-500)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--primary-600)] transition-colors"
                                    >
                                        Restore
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestoreView;