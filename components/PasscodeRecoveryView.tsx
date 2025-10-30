import React, { useState } from 'react';
import type { Device, BruteForceUpdate } from '../types';
import { UnlockIcon, ChevronDownIcon, CheckCircleIcon } from './icons';
import { orchestrator } from '../services/orchestrator';

interface PasscodeRecoveryViewProps {
    device: Device;
    onBack: () => void;
}

type ProcessStatus = 'idle' | 'running' | 'success';

const PasscodeRecoveryView: React.FC<PasscodeRecoveryViewProps> = ({ device, onBack }) => {
    const [status, setStatus] = useState<ProcessStatus>('idle');
    const [pinLength, setPinLength] = useState<4 | 6>(4);
    const [update, setUpdate] = useState<BruteForceUpdate | null>(null);

    const handleStart = async () => {
        setStatus('running');
        for await (const newUpdate of orchestrator.startPasscodeBruteForce(pinLength)) {
            setUpdate(newUpdate);
            if (newUpdate.foundPin) {
                setStatus('success');
                break;
            }
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setUpdate(null);
    }
    
    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mb-6">
                <button onClick={onBack} className="text-sm font-medium text-[var(--primary-500)] hover:underline" disabled={status === 'running'}>
                    &larr; Back to Orchestrator
                </button>
            </div>

            <div className="text-center max-w-2xl mx-auto">
                 <div className="flex justify-center mb-4">
                    <div className="flex size-16 items-center justify-center rounded-full bg-[var(--neutral-800)] text-[var(--primary-500)] border border-[var(--neutral-700)]">
                        <UnlockIcon className="h-8 w-8" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Passcode Recovery</h1>
                <p className="mt-2 text-[var(--neutral-400)]">
                    This tool attempts to brute-force the passcode for <strong>{device.name}</strong>.
                </p>
            </div>
            
            <div className="mt-8 p-8 rounded-lg border border-[var(--neutral-800)] bg-[var(--neutral-800)]/30 max-w-lg mx-auto">
                {status === 'idle' && <InitialView onStart={handleStart} pinLength={pinLength} setPinLength={setPinLength} />}
                {status === 'running' && <RunningView update={update} pinLength={pinLength} />}
                {status === 'success' && <SuccessView foundPin={update?.foundPin} onReset={handleReset} />}
            </div>
        </div>
    );
};

// Sub-components for each state
const InitialView: React.FC<{onStart: () => void, pinLength: number, setPinLength: (l: 4 | 6) => void}> = ({ onStart, pinLength, setPinLength }) => (
    <>
        <h3 className="text-lg font-semibold text-center">Ready to Begin?</h3>
        <p className="text-sm text-center text-[var(--neutral-400)] mt-2">
            Ensure the device remains connected. This process can be very time-consuming and is not guaranteed to succeed.
        </p>
        <div className="mt-6">
             <label htmlFor="pinLength" className="block text-sm font-medium text-white mb-2">PIN Length</label>
             <div className="relative">
                <select
                    id="pinLength"
                    value={pinLength}
                    onChange={(e) => setPinLength(parseInt(e.target.value, 10) as 4 | 6)}
                    className="appearance-none w-full rounded-md border-[var(--neutral-700)] bg-[var(--neutral-900)] text-white p-3 focus:border-[var(--primary-500)] focus:ring-[var(--primary-500)]"
                >
                    <option value={4}>4-Digit PIN</option>
                    <option value={6}>6-Digit PIN</option>
                </select>
                <ChevronDownIcon className="h-5 w-5 text-[var(--neutral-400)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
        </div>
        <div className="mt-6">
            <button
                onClick={onStart}
                className="w-full flex justify-center rounded-md bg-[var(--primary-500)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-600)] transition-colors"
            >
                Begin Bypass
            </button>
        </div>
    </>
);

const RunningView: React.FC<{update: BruteForceUpdate | null, pinLength: number}> = ({ update, pinLength }) => (
    <div className="text-center">
        <h3 className="text-lg font-semibold">Brute-force in Progress...</h3>
        <p className="text-sm text-[var(--neutral-400)] mt-2">Please do not disconnect the device.</p>
        <div className="mt-6 space-y-4">
            <div className="p-4 bg-[var(--neutral-900)] rounded-md font-mono text-3xl tracking-widest text-center text-yellow-400">
                {update?.currentAttemptPin || '----'}
            </div>
             <div className="h-2 w-full rounded-full bg-[var(--neutral-700)] overflow-hidden">
                <div 
                    className="h-2 rounded-full bg-[var(--primary-500)] transition-all duration-500 ease-linear" 
                    style={{ width: `${update?.progress || 0}%` }}>
                </div>
            </div>
            <div className="text-sm text-[var(--neutral-400)] flex justify-between">
                <span>Attempt: {update?.attemptCount.toLocaleString() || 0} / {Math.pow(10, pinLength).toLocaleString()}</span>
                <span>{Math.round(update?.progress || 0)}%</span>
            </div>
        </div>
    </div>
);

const SuccessView: React.FC<{foundPin?: string, onReset: () => void}> = ({ foundPin, onReset }) => (
    <div className="text-center">
        <div className="flex justify-center mb-4">
            <CheckCircleIcon className="h-12 w-12 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold">Passcode Found!</h3>
        <p className="text-sm text-[var(--neutral-400)] mt-2">The device passcode has been successfully recovered.</p>
        <div className="my-6 p-4 bg-[var(--neutral-900)] rounded-md font-mono text-4xl tracking-widest text-center text-green-400">
            {foundPin}
        </div>
        <button
            onClick={onReset}
            className="w-full flex justify-center rounded-md bg-[var(--neutral-700)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--neutral-600)] transition-colors"
        >
            Run Another Process
        </button>
    </div>
);


export default PasscodeRecoveryView;
