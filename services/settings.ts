
import type { Settings } from '../types';

const SETTINGS_KEY = 'device-toolkit-settings';

const DEFAULT_SETTINGS: Settings = {
    theme: 'dark',
    enableAutoUpdateCheck: true,
    notifications: true,
};

export const getSettings = (): Settings => {
    try {
        const storedSettings = localStorage.getItem(SETTINGS_KEY);
        if (storedSettings) {
            return { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) };
        }
    } catch (error) {
        console.error("Failed to parse settings from localStorage", error);
    }
    return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: Partial<Settings>): Settings => {
    const currentSettings = getSettings();
    const newSettings = { ...currentSettings, ...settings };
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
        console.error("Failed to save settings to localStorage", error);
    }
    return newSettings;
};
