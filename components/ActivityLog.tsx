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
        <div className="rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 p-4">
            <h3 className="text-md font-semibold mb-2">Activity Log</h3>
            <div ref={logContainerRef} className="h-48 resize-y overflow-y-auto rounded-md bg-[var(--neutral-900)] p-2 font-mono text-xs">
                {logs.map((log, index) => (
                    <div key={index} className="flex gap-2">
                        <span className="text-[var(--neutral-500)]">{log.timestamp}</span>
                        <span className={`${logTypeClasses[log.type]} font-bold`}>{log.type.toUpperCase()}</span>
                        <span className="text-[var(--neutral-300)] flex-1">{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityLog;
