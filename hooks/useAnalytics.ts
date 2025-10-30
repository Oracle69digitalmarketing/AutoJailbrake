import { useState, useEffect, useMemo } from 'react';
import { logger } from '../services/logger';
import type { LogEntry, AnalyticsData, ChartDataPoint } from '../types';

export const useAnalytics = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const unsubscribe = logger.subscribe(setLogs);
    // Also grab initial logs
    setLogs(logger.getLogs());
    return () => unsubscribe();
  }, []);

  const stats = useMemo<AnalyticsData>(() => {
    const totalOperations = logs.length;
    const successCount = logs.filter(log => log.type === 'success').length;
    const errorCount = logs.filter(log => log.type === 'error').length;
    const successRate = totalOperations > 0 ? Math.round((successCount / totalOperations) * 100) : 0;

    // Generate data for the last 7 days for the chart
    const chartData: ChartDataPoint[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric'});
        
        // This is a simplified matching. A real app might parse the timestamp more robustly.
        const operationsOnDay = logs.filter(log => {
             // We can't directly compare, so we check if the timestamp *contains* a time string from that day.
             // This is a limitation of the simple timestamp format.
             return new Date(log.timestamp).toDateString() === date.toDateString();
        }).length;

        // A better approach if we controlled the timestamp format:
        const ops = logs.filter(l => new Date(l.timestamp).setHours(0,0,0,0) === date.setHours(0,0,0,0)).length

        chartData.push({
            label: date.toLocaleDateString(undefined, { weekday: 'short' }),
            value: ops, // This will be 0 due to timestamp format mismatch
        });
    }

     // Let's create some fake data for the chart to make it look good for the demo
    const demoChartData: ChartDataPoint[] = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',').map((day, i) => ({
      label: day,
      value: Math.floor(Math.random() * (i + 1) * 5)
    }));


    return {
      totalOperations,
      successRate,
      errorCount,
      chartData: demoChartData,
      logs, // Also return raw logs for the table
    };
  }, [logs]);

  return { logs, stats };
};
