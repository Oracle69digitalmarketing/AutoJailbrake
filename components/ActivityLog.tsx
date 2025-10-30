import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import type { LogEntry } from '../types';

const logTypeClasses: Record<LogEntry['type'], string> = {
  info: 'text-blue-400',
  success: 'text-green-400',
  error: 'text-red-400',
};

const ActivityLog: React.FC = () => {
    const { logs } = useAnalytics();

    // Show latest 5 logs, reversed to show newest first
    const recentLogs = logs.slice(-5).reverse();

    return (
        <div className="h-48 overflow-y-auto space-y-2 text-sm font-mono text-[var(--neutral-400)] pr-2">
            {recentLogs.length > 0 ? (
                recentLogs.map((log, index) => (
                    <div key={index} className="flex gap-2 items-start">
                        <span className="shrink-0 text-[var(--neutral-500)]">{log.timestamp}</span>
                        <span className={`shrink-0 font-semibold w-12 text-center rounded-sm ${logTypeClasses[log.type]}`}>{log.type.toUpperCase()}</span>
                        <p className="whitespace-normal break-words" title={log.message}>{log.message}</p>
                    </div>
                ))
            ) : (
                <p className="flex items-center justify-center h-full">No activity yet.</p>
            )}
        </div>
    );
};

export default ActivityLog;
