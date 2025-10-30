
import React from 'react';
import { DeviceStatus } from '../types';

interface StatusBadgeProps {
  status: DeviceStatus;
}

const statusConfig = {
  [DeviceStatus.Unlocked]: {
    color: 'green',
    text: 'Unlocked',
    badgeClasses: 'bg-green-500/20 text-green-400',
    dotClasses: 'text-green-400',
  },
  [DeviceStatus.Locked]: {
    color: 'red',
    text: 'Locked',
    badgeClasses: 'bg-red-500/20 text-red-400',
    dotClasses: 'text-red-400',
  },
  [DeviceStatus.Jailbroken]: {
    color: 'yellow',
    text: 'Jailbroken',
    badgeClasses: 'bg-yellow-500/20 text-yellow-400',
    dotClasses: 'text-yellow-400',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.badgeClasses}`}>
      <svg className={`-ml-0.5 mr-1.5 h-2 w-2 ${config.dotClasses}`} fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3"></circle>
      </svg>
      {config.text}
    </span>
  );
};

export default StatusBadge;