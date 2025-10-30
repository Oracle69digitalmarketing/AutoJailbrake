import type { Device } from '../types';

type Subscription = {
  onConnect: (devices: Device[]) => void;
  onDisconnect: () => void;
  onError: (error: string) => void;
};

class DeviceDetectorService {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<Subscription> = new Set();
  private isConnected = false;

  start() {
    this.stop(); 
    this.fetchDevices(); // Initial fetch
    this.intervalId = setInterval(() => this.fetchDevices(), 5000); // Poll every 5 seconds
  }

  async fetchDevices() {
    try {
      const response = await fetch('http://127.0.0.1:5000/detect');
      if (!response.ok) {
        throw new Error(`Backend server responded with status: ${response.status}`);
      }
      const devices: Device[] = await response.json();
      
      if (devices && devices.length > 0) {
          if (!this.isConnected) {
            this.isConnected = true;
            this.listeners.forEach(listener => listener.onConnect(devices));
          }
      } else {
          if (this.isConnected) {
            this.isConnected = false;
            this.listeners.forEach(listener => listener.onDisconnect());
          }
      }

    } catch (error) {
      console.error("Failed to fetch devices from backend:", error);
      this.listeners.forEach(listener => listener.onError('Could not connect to backend service.'));
      this.stop();
    }
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
