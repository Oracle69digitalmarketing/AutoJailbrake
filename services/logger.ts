
import type { LogEntry } from '../types';

// A simple in-memory log store for the ActivityLog component
const logStore: LogEntry[] = [];
const listeners: ((logs: LogEntry[]) => void)[] = [];

const createLogEntry = (type: LogEntry['type'], message: string): LogEntry => {
  return {
    type,
    message,
    timestamp: new Date().toLocaleTimeString(),
  };
};

const notifyListeners = () => {
  listeners.forEach(listener => listener([...logStore]));
};

const addLog = (type: LogEntry['type'], message: string, consoleMethod: (message?: any, ...optionalParams: any[]) => void) => {
  const style = {
    info: 'background: #0ea5e9; color: white; padding: 2px 8px; border-radius: 4px;',
    success: 'background: #22c55e; color: white; padding: 2px 8px; border-radius: 4px;',
    error: 'background: #ef4444; color: white; padding: 2px 8px; border-radius: 4px;',
  };
  consoleMethod(`%c${type.toUpperCase()}`, style[type], message);
  const logEntry = createLogEntry(type, message);
  logStore.push(logEntry);
  if (logStore.length > 100) { // Keep log history manageable
    logStore.shift();
  }
  notifyListeners();
};

export const logger = {
  info: (message: string) => addLog('info', message, console.info),
  success: (message: string) => addLog('success', message, console.log),
  error: (message: string) => addLog('error', message, console.error),
  getLogs: () => [...logStore],
  subscribe: (listener: (logs: LogEntry[]) => void) => {
    listeners.push(listener);
    // Immediately notify with current logs
    listener([...logStore]);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  },
};
