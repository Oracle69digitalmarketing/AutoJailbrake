
import type { Device, RecoveryModule } from './types';
import { DeviceStatus, RecoveryAction } from './types';
import { PhotoIcon, ChatBubbleLeftRightIcon, GlobeAltIcon, CircleStackIcon } from './components/icons';

export const MOCK_DEVICES: Device[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    os: 'iOS',
    osVersion: '16.2',
    imageUrl: 'https://picsum.photos/id/11/400/600',
    status: DeviceStatus.Unlocked,
    serial: 'C39Q87X2J19C',
    storage: '256GB',
    imei: '356789012345678',
  },
  {
    id: '2',
    name: 'Galaxy Tab S8',
    os: 'Android',
    osVersion: '13',
    imageUrl: 'https://picsum.photos/id/12/600/400',
    status: DeviceStatus.Locked,
    serial: 'R52R301 ABCDE',
    storage: '128GB',
    imei: '351234567890123',
  },
  {
    id: '3',
    name: 'iPhone 12 Mini',
    os: 'iOS',
    osVersion: '15.7',
    imageUrl: 'https://picsum.photos/id/13/400/600',
    status: DeviceStatus.Jailbroken,
    serial: 'F17F1234PL6L',
    storage: '64GB',
    imei: '359876543210987',
  },
  {
    id: '4',
    name: 'Pixel 7 Pro',
    os: 'Android',
    osVersion: '14',
    imageUrl: 'https://picsum.photos/id/14/400/600',
    status: DeviceStatus.Unlocked,
    serial: '2A211FDH123456',
    storage: '128GB',
    imei: '355551111222333',
  },
  {
    id: '5',
    name: 'iPad Pro 11"',
    os: 'iOS',
    osVersion: '16.5',
    imageUrl: 'https://picsum.photos/id/15/600/400',
    status: DeviceStatus.Locked,
    serial: 'DLXABCD12345',
    storage: '512GB',
    imei: 'N/A',
  },
  {
    id: '6',
    name: 'OnePlus 11',
    os: 'Android',
    osVersion: '13',
    imageUrl: 'https://picsum.photos/id/16/400/600',
    status: DeviceStatus.Unlocked,
    serial: 'OP11A1B2C3D4',
    storage: '256GB',
    imei: '354448888777666',
  },
];

export const RECOVERY_MODULES: RecoveryModule[] = [
    {
        name: RecoveryAction.ScanPhotos,
        description: 'Perform a deep scan of the device storage to find and recover deleted photos and videos.',
        icon: PhotoIcon,
    },
    {
        name: RecoveryAction.RecoverChats,
        description: 'Attempt to recover deleted messages and chat histories from apps like iMessage and WhatsApp.',
        icon: ChatBubbleLeftRightIcon,
    },
    {
        name: RecoveryAction.ExtractBrowserData,
        description: 'Scan for and extract browser history, bookmarks, and cached credentials from Safari or Chrome.',
        icon: GlobeAltIcon,
    },
    {
        name: RecoveryAction.FullFilesystemScan,
        description: 'A comprehensive scan of the entire filesystem for all recoverable file types. May take a long time.',
        icon: CircleStackIcon,
    }
]
