
import React, { useState, useEffect, useRef } from 'react';
import { logger } from '../services/logger';
import type { LogEntry } from '../types';

const logTypeClasses = {
    info: 'text-blue-400',
    success: 'text-green-400',
    error: 'text-red-400',
};

const ActivityLog: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = logger.subscribe(setLogs);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex flex-col gap-3">
            <p className="text-sm text-[var(--neutral-400)]">Real-time log of all application activities.</p>
            <div ref={logContainerRef} className="h-64 overflow-y-auto rounded-md bg-[var(--neutral-900)] p-4 font-mono text-sm text-[var(--neutral-300)]">
                {logs.length === 0 && <p className="text-[var(--neutral-500)]">No activity yet.</p>}
                {logs.map((log, index) => (
                    <div key={index} className="flex gap-4">
                        <span className="text-[var(--neutral-500)]">{log.timestamp}</span>
                        <span className={`font-bold ${logTypeClasses[log.type]}`}>{log.type.toUpperCase()}</span>
                        <span>{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLog;
