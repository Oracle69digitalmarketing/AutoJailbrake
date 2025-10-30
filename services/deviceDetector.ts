import type { Device } from '../types';
import { MOCK_DEVICES } from '../constants';

interface DeviceDetectorCallbacks {
  onConnect: (devices: Device[]) => void;
  onDisconnect: () => void;
  onError: (message: string) => void;
}

type Subscription = {
  unsubscribe: () => void;
};

class DeviceDetectorService {
  private listeners: Set<DeviceDetectorCallbacks> = new Set();
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private isRunning: boolean = false;

  subscribe(callbacks: DeviceDetectorCallbacks): Subscription {
    this.listeners.add(callbacks);
    return {
      unsubscribe: () => {
        this.listeners.delete(callbacks);
      },
    };
  }

  start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.simulateConnection();
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.isRunning = false;
  }

  private simulateConnection() {
    this.timeoutId = setTimeout(() => {
      if (!this.isRunning) return;

      const shouldConnect = Math.random() > 0.2; // 80% chance to connect
      if (shouldConnect) {
        // Find 1 to 2 devices
        const deviceCount = Math.floor(Math.random() * 2) + 1;
        const shuffled = [...MOCK_DEVICES].sort(() => 0.5 - Math.random());
        const connectedDevices = shuffled.slice(0, deviceCount);
        this.listeners.forEach(listener => listener.onConnect(connectedDevices));

        // Simulate a disconnection later
        this.timeoutId = setTimeout(() => {
          if (!this.isRunning) return;
          this.listeners.forEach(listener => listener.onDisconnect());
          // And then try to connect again
          this.simulateConnection();
        }, 8000 + Math.random() * 5000);

      } else {
        const errorMessage = "Failed to connect to device daemon. Is it running?";
        this.listeners.forEach(listener => listener.onError(errorMessage));
         // Retry connection
        this.timeoutId = setTimeout(() => {
            if (!this.isRunning) return;
            this.simulateConnection();
        }, 5000);
      }
    }, 2000 + Math.random() * 2000);
  }
}

export const deviceDetector = new DeviceDetectorService();
