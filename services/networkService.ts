import type { Device } from '../types';
import { MOCK_DEVICES } from '../constants';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getRemoteDevices = async (): Promise<Device[]> => {
    await sleep(2500); // Simulate network scan delay

    // Simulate finding 1 to 3 devices on the network
    const deviceCount = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...MOCK_DEVICES].sort(() => 0.5 - Math.random());
    
    return shuffled.slice(0, deviceCount).map((device, i) => ({
        ...device,
        id: `net-${device.id}`,
        ipAddress: `192.168.1.10${i + 2}`, // Assign mock IP addresses
        name: `${device.name} (Network)`,
    }));
};

export const networkService = {
    scanForDevices: getRemoteDevices,
};