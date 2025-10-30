import React, { useState, useEffect } from 'react';
import type { Device, Recommendation } from '../types';
import { JailbreakIcon, RecoveryIcon, UnlockIcon, SparkleIcon } from './icons';
import { getAIRecommendation } from '../services/api';

interface AIRecommenderProps {
  device: Device;
  onExecute: (action: string) => void;
  disabled?: boolean;
}

const actionIcons: { [key: string]: React.ElementType } = {
    "Start Full Recovery": RecoveryIcon,
    "Start Unlock": UnlockIcon,
    "Start Jailbreak": JailbreakIcon,
    "Start Data Recovery": RecoveryIcon,
};


const AIRecommender: React.FC<AIRecommenderProps> = ({ device, onExecute, disabled }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<(Recommendation & { Icon: React.ElementType }) | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      setIsLoading(true);
      setError(null);
      setRecommendation(null);
      try {
        const rec = await getAIRecommendation(device);
        const Icon = actionIcons[rec.action] || SparkleIcon;
        setRecommendation({ ...rec, Icon });
      } catch (e) {
        setError("Could not get an AI recommendation. Please use a manual action.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendation();
  }, [device]);

  return (
    <div>
      <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
        <SparkleIcon className="h-6 w-6 text-yellow-400" />
        AI Recommendation
      </h3>
      <div className="rounded-lg border border-dashed border-[var(--primary-500)]/50 bg-[var(--neutral-800)]/30 p-6">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center h-32 animate-pulse">
            <p className="text-lg font-semibold">Analyzing Device...</p>
            <p className="text-sm text-[var(--neutral-400)]">Please wait while we determine the best action.</p>
          </div>
        )}
        {error && !isLoading && (
            <div className="flex items-center justify-center text-center h-32 text-red-400">
                <p>{error}</p>
            </div>
        )}
        {recommendation && !isLoading && (
          <div className="flex flex-col sm:flex-row items-start gap-6 animate-fade-in">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[var(--neutral-700)] text-[var(--primary-500)]">
                <recommendation.Icon className="h-7 w-7" />
            </div>
            <div className="flex-grow">
                <h4 className="text-lg font-semibold">{recommendation.title}</h4>
                <p className="text-sm text-[var(--neutral-400)] mt-1">{recommendation.description}</p>
            </div>
            <button
                onClick={() => onExecute(recommendation.action)}
                disabled={disabled}
                className="w-full sm:w-auto mt-4 sm:mt-0 bg-[var(--primary-500)] hover:bg-[var(--primary-600)] text-white text-sm font-semibold px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                {recommendation.action}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommender;
