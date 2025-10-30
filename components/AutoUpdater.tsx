import React, { useState, useEffect } from 'react';
import { getSettings } from '../services/settings';
import { checkForUpdates } from '../services/api';
import type { UpdateCheckResult } from '../types';

const AutoUpdater: React.FC = () => {
    const [status, setStatus] = useState<string>('Checking for updates...');
    const [updateInfo, setUpdateInfo] = useState<UpdateCheckResult | null>(null);

    useEffect(() => {
        const settings = getSettings();
        if (!settings.enableAutoUpdateCheck) {
            setStatus('Auto-update check is disabled in settings.');
            return;
        }

        const check = async () => {
            const result = await checkForUpdates();
            if (result.isUpdateAvailable) {
                setStatus(`Update available: Version ${result.version}`);
                setUpdateInfo(result);
            } else {
                setStatus('Your software is up to date.');
            }
        };

        check();
    }, []);
    
    if (!updateInfo?.isUpdateAvailable) {
        return (
            <div className="mb-6 rounded-md border border-[var(--neutral-700)] bg-[var(--neutral-800)]/50 p-4 text-center text-sm text-[var(--neutral-400)]">
                {status}
            </div>
        );
    }

    return (
        <div className="mb-6 rounded-lg border border-[var(--primary-500)]/30 bg-[var(--neutral-800)] p-6">
            <h3 className="text-lg font-bold text-white">🎉 New Update Available!</h3>
            <p className="mt-1 text-[var(--neutral-300)]">Version <strong>{updateInfo.version}</strong> is now available.</p>
            <div className="mt-4">
                <h4 className="font-semibold text-white">Release Notes:</h4>
                <pre className="mt-2 whitespace-pre-wrap rounded-md bg-[var(--neutral-900)] p-3 font-mono text-sm text-[var(--neutral-400)]">
                    {updateInfo.releaseNotes}
                </pre>
            </div>
            <div className="mt-6 flex justify-end">
                <button className="rounded-md bg-[var(--primary-500)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-600)] transition-colors">
                    Download & Install
                </button>
            </div>
        </div>
    );
};

export default AutoUpdater;
