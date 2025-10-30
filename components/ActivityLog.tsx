
import React, { useState, useEffect } from 'react';
import type { LogEntry } from '../types';
import { logger } from '../services/logger';

const ActivityLog: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    useEffect(() => {
        const unsubscribe = logger.subscribe(setLogs);
        return () => unsubscribe();
    }, []);

    const logTypeClasses: Record<LogEntry['type'], string> = {
        info: 'text-blue-400',
        success: 'text-green-400',
        error: 'text-red-400',
    };

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
            <p className="mt-2 text-[var(--neutral-400)]">
                Real-time logs from all toolkit operations.
            </p>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-lg border border-[var(--neutral-800)]">
                            <table className="min-w-full divide-y divide-[var(--neutral-800)]">
                                <thead className="bg-[var(--neutral-800)]/50">
                                    <tr>
                                        <th scope="col" className="w-24 px-3 py-3.5 text-left text-sm font-semibold text-white">
                                            Type
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                            Message
                                        </th>
                                        <th scope="col" className="w-28 px-3 py-3.5 text-left text-sm font-semibold text-white">
                                            Timestamp
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[var(--neutral-800)] bg-[var(--neutral-900)]">
                                    {logs.slice().reverse().map((log, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`font-bold ${logTypeClasses[log.type]}`}>
                                                    {log.type.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-3 py-4 text-sm text-[var(--neutral-300)] font-mono">{log.message}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-[var(--neutral-400)]">{log.timestamp}</td>
                                        </tr>
                                    ))}
                                    {logs.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="text-center py-8 text-[var(--neutral-400)]">No activity yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityLog;
