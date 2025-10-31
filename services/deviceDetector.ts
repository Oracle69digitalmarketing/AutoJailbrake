import { MOCK_DEVICES } from '../constants';
import type { Device } from '../types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const detectDevices = async (): Promise<Device[]> => {
    await sleep(2000); // Simulate detection delay

    // Simulate finding a random number of devices up to the max available
    const deviceCount = Math.floor(Math.random() * (MOCK_DEVICES.length + 1));
    
    if (deviceCount === 0) {
        return [];
    }

    // Return a shuffled subset of mock devices
    const shuffled = [...MOCK_DEVICES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, deviceCount);
};
