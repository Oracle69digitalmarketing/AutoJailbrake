
import React from 'react';
import { SparkleIcon } from './icons';

interface OnboardingViewProps {
  onComplete: () => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <SparkleIcon className="w-16 h-16 text-[var(--primary-500)] mb-4" />
      <h1 className="text-2xl font-bold tracking-tight">Welcome to AutoJailbreak</h1>
      <p className="mt-2 max-w-2xl text-md text-[var(--neutral-300)]">
        The all-in-one toolkit for device recovery, jailbreaking, and unlocking. This tool uses AI to recommend the best course of action for your connected device.
      </p>
      <div className="mt-6 text-left w-full bg-[var(--neutral-900)] p-4 rounded-md border border-[var(--neutral-700)]">
        <h2 className="text-lg font-semibold text-center mb-3">Key Features</h2>
        <ul className="text-[var(--neutral-300)] text-sm space-y-2 list-disc list-inside">
          <li>Get AI-powered recommendations for your device.</li>
          <li>Perform automated jailbreaks and unlocks.</li>
          <li>Recover deleted photos, messages, and other data.</li>
          <li>Manually run specific exploits and tools.</li>
        </ul>
      </div>
      <p className="mt-6 text-xs text-[var(--neutral-500)]">
        Disclaimer: This is a demonstration application. Use of this software is at your own risk. The creators are not responsible for any damage to your device.
      </p>
      <button
        onClick={onComplete}
        className="mt-6 w-full rounded-md bg-[var(--primary-500)] px-8 py-3 text-base font-semibold text-white hover:bg-[var(--primary-600)] transition-colors"
      >
        Get Started
      </button>
    </div>
  );
};

export default OnboardingView;
