import React from 'react';
import { SparkleIcon, ExclamationTriangleIcon } from './icons';

interface OnboardingViewProps {
  onComplete: () => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  return (
    <div className="flex flex-col text-left">
      <div className="flex items-center gap-3 mb-4">
        <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400 shrink-0" />
        <h1 className="text-2xl font-bold tracking-tight">Important Disclaimer</h1>
      </div>
      <div className="space-y-3 text-sm text-[var(--neutral-300)] max-h-[60vh] overflow-y-auto pr-2">
        <p>
            This software is a powerful tool designed for educational, research, and forensic purposes on devices you legally own.
            Misuse of this software may be illegal and can cause irreversible damage to your device.
        </p>
        <p>
            <strong className="font-semibold text-white">By using this software, you acknowledge and agree to the following:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
            <li>You will only use this software on devices that you personally own.</li>
            <li>You understand that jailbreaking, rooting, or unlocking your device may void its warranty.</li>
            <li>You accept all risks of data loss, device malfunction, or security vulnerabilities that may arise from using this tool.</li>
            <li>The creators of AutoJailbreak are not liable for any damage or legal consequences resulting from your use of this software.</li>
        </ul>
         <p className="pt-2 font-semibold text-yellow-400">
            Always back up your device before proceeding with any action.
        </p>
      </div>

      <button
        onClick={onComplete}
        className="mt-6 w-full rounded-md bg-[var(--primary-500)] px-8 py-3 text-base font-semibold text-white hover:bg-[var(--primary-600)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)] focus:ring-offset-2 focus:ring-offset-[var(--neutral-800)]"
      >
        I Understand and Agree
      </button>
    </div>
  );
};

export default OnboardingView;
