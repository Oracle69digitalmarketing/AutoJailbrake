

import React, { useEffect, useState } from 'react';
import type { NotificationData } from '../types';
import { dismissNotification } from '../services/notification';
// FIX: Replace ExclamationCircleIcon with ExclamationTriangleIcon as it is the available icon for errors.
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from './icons';

interface NotificationProps {
  notification: NotificationData;
}

const icons = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
  // FIX: Use ExclamationTriangleIcon for error status.
  error: <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />,
};

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsExiting(true);
        // The dismiss call is handled by the service, but this cleans up the animation
        setTimeout(() => dismissNotification(notification.id), 300);
    }, 4700); // Start exit animation just before it's removed

    return () => clearTimeout(timer);
  }, [notification.id]);

  const handleDismiss = () => {
      setIsExiting(true);
      setTimeout(() => dismissNotification(notification.id), 300);
  };
  
  // Assumes animation classes are defined in a global stylesheet.
  const animationClasses = isExiting 
    ? 'animate-notification-exit' 
    : 'animate-notification-enter';

  return (
    <div className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-[var(--neutral-800)] shadow-lg ring-1 ring-black ring-opacity-5 ${animationClasses}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icons[notification.type]}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-white">{notification.title}</p>
            <p className="mt-1 text-sm text-[var(--neutral-400)]">{notification.message}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={handleDismiss}
              className="inline-flex rounded-md bg-[var(--neutral-800)] text-[var(--neutral-400)] hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[var(--neutral-800)]"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
