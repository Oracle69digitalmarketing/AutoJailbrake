// FIX: Provide a mock implementation for the network service to resolve module errors.
import type { TrafficData } from '../types';

const MOCK_IPS = [
  '192.168.1.10',
  '10.0.0.5',
  'g.co',
  'apple.com',
  'api.icloud.com',
  'fb.com',
  'analytics.google.com'
];

const MOCK_PROTOCOLS = ['TCP', 'UDP', 'HTTPS', 'DNS'];

class NetworkService {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<(packet: TrafficData) => void> = new Set();

  private generatePacket(): TrafficData {
    const source = MOCK_IPS[Math.floor(Math.random() * MOCK_IPS.length)];
    let destination = MOCK_IPS[Math.floor(Math.random() * MOCK_IPS.length)];
    while (destination === source) {
        destination = MOCK_IPS[Math.floor(Math.random() * MOCK_IPS.length)];
    }
    
    return {
      timestamp: Date.now(),
      source,
      destination,
      protocol: MOCK_PROTOCOLS[Math.floor(Math.random() * MOCK_PROTOCOLS.length)],
      length: Math.floor(Math.random() * 1500) + 40,
    };
  }

  start() {
    this.stop();
    this.intervalId = setInterval(() => {
      const packet = this.generatePacket();
      this.listeners.forEach(listener => listener(packet));
    }, 800 + Math.random() * 1000); // Simulate random packet arrival
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(listener: (packet: TrafficData) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const networkService = new NetworkService();
