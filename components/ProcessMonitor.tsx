import React, { useEffect, useRef, useState, useCallback } from 'react';
import { orchestrator } from '../services/orchestrator';
import type { RecoveryResult } from '../types';

interface ProcessMonitorProps {
  actionName: string;
  onComplete: (results?: RecoveryResult[]) => void;
}

const ProcessMonitor: React.FC<ProcessMonitorProps> = ({ actionName, onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Starting...');
  const logsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleComplete = useCallback((results?: RecoveryResult[]) => {
    setTimeout(() => onComplete(results), 2000);
  }, [onComplete]);

  useEffect(() => {
    orchestrator.register({
        onLog: (log) => setLogs(prev => [...prev, log]),
        onProgressUpdate: setProgress,
        onStatusUpdate: setStatus,
        onComplete: handleComplete,
    });
    
    orchestrator.startProcess(actionName);

    return () => {
        orchestrator.unregister();
    };
  }, [actionName, handleComplete]);

  return (
    <div className="flex flex-col gap-6 rounded-md border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 p-6 animate-fade-in">
      <h2 className="text-2xl font-bold">Process Monitor: <span className="text-[var(--primary-500)]">{actionName}</span></h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Overall Progress</p>
          <p className="text-sm font-medium text-[var(--neutral-400)]">{Math.round(progress)}%</p>
        </div>
        <div className="h-2 w-full rounded-full bg-[var(--neutral-700)] overflow-hidden">
          <div 
            className="h-2 rounded-full bg-[var(--primary-500)] transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}>
          </div>
        </div>
        <p className="text-sm text-[var(--neutral-400)]">
          Current status: <span className="font-semibold text-[var(--neutral-100)]">{status}</span>
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Logs</h3>
        <div ref={logsContainerRef} className="h-48 resize-y overflow-y-auto rounded-md bg-[var(--neutral-900)] p-4 font-mono text-sm text-[var(--neutral-400)]">
          {logs.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessMonitor;
