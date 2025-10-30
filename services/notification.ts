import type { NotificationData } from '../types';

let nextId = 0;
const notifications: NotificationData[] = [];
const listeners: ((notifications: NotificationData[]) => void)[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener([...notifications]));
};

export const showNotification = (notification: Omit<NotificationData, 'id'>) => {
  // FIX: Explicitly type `newNotification` to ensure all properties from `NotificationData` are present.
  const newNotification: NotificationData = { ...notification, id: nextId++ };
  notifications.push(newNotification);
  notifyListeners();

  // Also show browser notification if permission is granted
  if (window.Notification && Notification.permission === 'granted') {
    new Notification(newNotification.title, { body: newNotification.message });
  }

  // Automatically dismiss after 5 seconds
  setTimeout(() => dismissNotification(newNotification.id), 5000);
};

export const dismissNotification = (id: number) => {
  const index = notifications.findIndex(n => n.id === id);
  if (index > -1) {
    notifications.splice(index, 1);
    notifyListeners();
  }
};

export const subscribe = (listener: (notifications: NotificationData[]) => void) => {
  listeners.push(listener);
  listener([...notifications]); // Immediately notify with current notifications
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Request permission on load
if (window.Notification && Notification.permission !== 'denied') {
  Notification.requestPermission();
}