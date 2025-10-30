
import React, { useState, useEffect } from 'react';
import type { Settings } from '../types';
import { getSettings, saveSettings } from '../services/settings';

const Settings: React.FC = () => {
    const [settings, setSettings] = useState<Settings>(getSettings());
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    const handleSettingChange = (key: keyof Settings, value: boolean) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        saveSettings(settings);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="space-y-6 text-[var(--neutral-300)]">
            <p className="text-sm text-[var(--neutral-400)]">Manage your application preferences.</p>
            <div className="space-y-4">
                <Toggle
                    label="Enable Auto Update Check"
                    description="Automatically check for new exploit packages on startup."
                    enabled={settings.enableAutoUpdateCheck}
                    onChange={(value) => handleSettingChange('enableAutoUpdateCheck', value)}
                />
                <Toggle
                    label="Enable Notifications"
                    description="Show system notifications for completed processes."
                    enabled={settings.notifications}
                    onChange={(value) => handleSettingChange('notifications', value)}
                />
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-[var(--neutral-700)]">
                <button
                    onClick={handleSave}
                    className="flex items-center justify-center rounded-md bg-[var(--primary-500)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-600)] transition-colors disabled:opacity-50"
                    disabled={isSaved}
                >
                    {isSaved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

interface ToggleProps {
    label: string;
    description: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, description, enabled, onChange }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="font-medium text-white">{label}</span>
                <span className="text-sm text-[var(--neutral-400)]">{description}</span>
            </div>
            <button
                type="button"
                onClick={() => onChange(!enabled)}
                className={`${
                    enabled ? 'bg-[var(--primary-500)]' : 'bg-[var(--neutral-600)]'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:ring-offset-2 focus:ring-offset-[var(--neutral-900)]`}
            >
                <span
                    className={`${
                        enabled ? 'translate-x-5' : 'translate-x-0'
                    } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
            </button>
        </div>
    );
};

export default Settings;
