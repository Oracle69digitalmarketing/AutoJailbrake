import React, { useState, useEffect } from 'react';
import { subscribe } from '../services/notification';
import type { NotificationData } from '../types';
import Notification from './Notification';

const NotificationHost: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationData[]>([]);

    useEffect(() => {
        const unsubscribe = subscribe(setNotifications);
        return () => unsubscribe();
    }, []);

    return (
        <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50">
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {notifications.map((notification) => (
                    <Notification key={notification.id} notification={notification} />
                ))}
            </div>
        </div>
    );
};

export default NotificationHost;
