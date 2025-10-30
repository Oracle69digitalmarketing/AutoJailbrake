import React, { useState, useMemo } from 'react';
import type { LogEntry } from '../types';
import { useAnalytics } from '../hooks/useAnalytics';
import BarChart from './BarChart';
import { HashtagIcon, CheckBadgeIcon, ExclamationTriangleIcon } from './icons';

const logTypeClasses: Record<LogEntry['type'], string> = {
  info: 'text-blue-400',
  success: 'text-green-400',
  error: 'text-red-400',
};

const AnalyticsView: React.FC = () => {
    const { logs, stats } = useAnalytics();
    const [filter, setFilter] = useState<'all' | 'success' | 'error'>('all');

    const filteredLogs = useMemo(() => {
        if (filter === 'all') {
            return logs;
        }
        return logs.filter(log => log.type === filter);
    }, [logs, filter]);

    return (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight text-white">Analytics Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <StatCard icon={HashtagIcon} title="Total Operations" value={stats.totalOperations} />
                <StatCard icon={CheckBadgeIcon} title="Success Rate" value={`${stats.successRate}%`} />
                <StatCard icon={ExclamationTriangleIcon} title="Errors" value={stats.errorCount} />
            </div>

            {/* Chart */}
            <div className="mt-8">
                <BarChart data={stats.chartData} title="Operations in Last 7 Days" />
            </div>
            
            {/* Log History Table */}
            <div className="mt-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h2 className="text-xl font-semibold text-white">Log History</h2>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                            className="block w-full rounded-md border-[var(--neutral-700)] bg-[var(--neutral-800)] py-2 pl-3 pr-10 text-base text-white focus:border-[var(--primary-500)] focus:outline-none focus:ring-[var(--primary-500)] sm:text-sm"
                        >
                            <option value="all">All</option>
                            <option value="success">Success</option>
                            <option value="error">Error</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-[var(--neutral-700)]">
                                    <thead className="bg-[var(--neutral-800)]">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Message</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Status</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--neutral-800)] bg-[var(--neutral-900)]">
                                        {filteredLogs.map((log, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">{log.message}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span className={`font-semibold ${logTypeClasses[log.type]}`}>{log.type.toUpperCase()}</span>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-[var(--neutral-400)] font-mono">{log.timestamp}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{icon: React.ElementType, title: string, value: string | number}> = ({icon: Icon, title, value}) => (
    <div className="overflow-hidden rounded-lg bg-[var(--neutral-800)]/50 px-4 py-5 shadow sm:p-6 border border-[var(--neutral-800)]">
        <dt className="truncate text-sm font-medium text-[var(--neutral-400)] flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {title}
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{value}</dd>
    </div>
);


export default AnalyticsView;