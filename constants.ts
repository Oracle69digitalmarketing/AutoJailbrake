import {
    Device, DeviceStatus, Backup, RecoveryModule, Tweak
} from './types';
import {
    PhotoIcon, MessageIcon, ContactIcon, DocumentIcon,
} from './components/icons';

export const MOCK_DEVICES: Device[] = [
  {
    id: 'dev-1',
    name: 'iPhone 13 Pro',
    os: 'iOS',
    osVersion: '15.1',
    imageUrl: 'https://picsum.photos/seed/iphone13/400/600',
    status: DeviceStatus.Unlocked,
    serial: 'C39L2ZJ8P282',
    storage: '256GB',
    imei: '353929071234567',
  },
  {
    id: 'dev-2',
    name: 'Samsung Galaxy S22',
    os: 'Android',
    osVersion: '12.0',
    imageUrl: 'https://picsum.photos/seed/s22/400/600',
    status: DeviceStatus.Locked,
    serial: 'R58R20ABCDE',
    storage: '128GB',
    imei: '354587098765432',
  },
  {
    id: 'dev-3',
    name: 'iPhone X',
    os: 'iOS',
    osVersion: '14.3',
    imageUrl: 'https://picsum.photos/seed/iphonex/400/600',
    status: DeviceStatus.Jailbroken,
    serial: 'G65V3XYZJCLF',
    storage: '64GB',
    imei: '353012345678901',
  },
];

export const RECOVERY_MODULES: RecoveryModule[] = [
    {
        name: 'Scan for Photos',
        description: 'Deep scan the device storage for deleted or inaccessible photos and videos.',
        icon: PhotoIcon,
    },
    {
        name: 'Recover Messages',
        description: 'Attempt to recover deleted SMS, iMessage, and WhatsApp conversations.',
        icon: MessageIcon,
    },
    {
        name: 'Extract Contacts',
        description: 'Scan and extract contacts from the device, including deleted entries.',
        icon: ContactIcon,
    },
    {
        name: 'Retrieve Documents',
        description: 'Search for documents, notes, and other file types on the device\'s filesystem.',
        icon: DocumentIcon,
    },
];

export const MOCK_BACKUPS: Backup[] = [
    {
        id: 'backup-1',
        name: 'Pre-Jailbreak Backup',
        type: 'Full',
        date: '2023-10-26',
        size: '15.2 GB',
    },
    {
        id: 'backup-2',
        name: 'Weekly Sync',
        type: 'Partial',
        date: '2023-10-20',
        size: '8.1 GB',
    },
    {
        id: 'backup-3',
        name: 'Initial Setup',
        type: 'Full',
        date: '2023-01-15',
        size: '5.4 GB',
    }
];

export const MOCK_TWEAKS: Tweak[] = [
    {
        id: 'tweak-1',
        name: 'Cylinder Reborn',
        author: 'Ryan Petrich',
        description: 'Adds cool animations to your home screen icon scrolling.',
        version: '1.1.0',
        iconUrl: 'https://picsum.photos/seed/cylinder/100',
    },
    {
        id: 'tweak-2',
        name: 'SnowBoard',
        author: 'SparkDev',
        description: 'A powerful theming engine for iOS. Customize your icons, UI, and more.',
        version: '1.4.20',
        iconUrl: 'https://picsum.photos/seed/snowboard/100',
    },
    {
        id: 'tweak-3',
        name: 'iCleaner Pro',
        author: 'Ivano Bilenchi',
        description: 'The ultimate tool to clean up your iOS device and free up space.',
        version: '7.9.1',
        iconUrl: 'https://picsum.photos/seed/icleaner/100',
    },
     {
        id: 'tweak-4',
        name: 'Filza File Manager',
        author: 'TIGI Software',
        description: 'A powerful file manager that gives you full access to your device\'s filesystem.',
        version: '3.9.0',
        iconUrl: 'https://picsum.photos/seed/filza/100',
    }
];
