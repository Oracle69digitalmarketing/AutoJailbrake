
import type { Device, Backup, RecoveryModule } from './types';
import { DeviceStatus } from './types';
import { PhotoIcon, MessageIcon, ContactIcon, DocumentIcon } from './components/icons';

export const MOCK_DEVICES: Device[] = [
    {
        id: 'iphone-13-pro-1',
        name: 'iPhone 13 Pro',
        os: 'iOS',
        osVersion: '15.4.1',
        imageUrl: 'https://picsum.photos/seed/iphone13pro/400/600',
        status: DeviceStatus.Unlocked,
        serial: 'C39L2ZJ9P28L',
        storage: '256GB',
        imei: '358734098213457'
    },
    {
        id: 'iphone-x-2',
        name: 'iPhone X',
        os: 'iOS',
        osVersion: '14.8',
        imageUrl: 'https://picsum.photos/seed/iphonex/400/600',
        status: DeviceStatus.Locked,
        serial: 'G6TPL0R3JCLF',
        storage: '64GB',
        imei: '354898091238765'
    },
    {
        id: 'galaxy-s21-3',
        name: 'Galaxy S21',
        os: 'Android',
        osVersion: '12.0',
        imageUrl: 'https://picsum.photos/seed/galaxys21/400/600',
        status: DeviceStatus.Unlocked,
        serial: 'R58R30P5Z5B',
        storage: '128GB',
        imei: '351987093456789'
    },
     {
        id: 'iphone-11-4',
        name: 'iPhone 11',
        os: 'iOS',
        osVersion: '14.3',
        imageUrl: 'https://picsum.photos/seed/iphone11/400/600',
        status: DeviceStatus.Jailbroken,
        serial: 'F17Z4QWERTY',
        storage: '128GB',
        imei: '352456098765432'
    },
];

export const RECOVERY_MODULES: RecoveryModule[] = [
    { name: 'Scan for Photos', description: 'Search for deleted photos and images from the device\'s internal storage.', icon: PhotoIcon },
    { name: 'Scan for Messages', description: 'Attempt to recover deleted SMS, iMessage, and WhatsApp conversations.', icon: MessageIcon },
    { name: 'Scan for Contacts', description: 'Find and restore deleted contacts from the address book.', icon: ContactIcon },
    { name: 'Scan for Documents', description: 'Recover deleted documents, notes, and other text-based files.', icon: DocumentIcon },
];

export const MOCK_BACKUPS: Backup[] = [
    { id: 'backup-1', name: 'Pre-Jailbreak Backup', type: 'Full System', date: '2023-10-26', size: '15.4 GB' },
    { id: 'backup-2', name: 'Weekly Snapshot', type: 'Full System', date: '2023-10-22', size: '14.9 GB' },
    { id: 'backup-3', name: 'Photos Only', type: 'Partial', date: '2023-09-15', size: '8.2 GB' },
];
