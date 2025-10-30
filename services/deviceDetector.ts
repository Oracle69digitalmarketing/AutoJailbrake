import { MOCK_DEVICES } from '../constants';
import type { Device } from '../types';

type Subscription = {
  onConnect: (device: Device) => void;
  onDisconnect: () => void;
};

class DeviceDetectorService {
  // FIX: Use ReturnType<typeof setInterval> for browser compatibility instead of NodeJS.Timeout
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<Subscription> = new Set();
  private isConnected = false;

  start() {
    this.stop(); // Ensure no multiple intervals running
    this.intervalId = setInterval(() => {
      if (!this.isConnected) {
        // Pick a random device to simulate connection
        const randomDevice = MOCK_DEVICES[Math.floor(Math.random() * MOCK_DEVICES.length)];
        this.isConnected = true;
        this.listeners.forEach(listener => listener.onConnect(randomDevice));
      }
    }, 5000); // Simulate connection after 5 seconds
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isConnected = false;
  }

  subscribe(subscription: Subscription) {
    this.listeners.add(subscription);
    return {
      unsubscribe: () => {
        this.listeners.delete(subscription);
      },
    };
  }
}

export const deviceDetector = new DeviceDetectorService();
