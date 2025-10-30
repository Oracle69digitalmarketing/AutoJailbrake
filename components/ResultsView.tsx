import React, { useState } from 'react';
import type { RecoveryResult } from '../types';
import { ArrowDownTrayIcon, CheckCircleIcon } from './icons';

interface ResultsViewProps {
  actionName: string;
  results: RecoveryResult[];
  onBack: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ actionName, results, onBack }) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const handleSelect = (id: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === results.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(results.map(r => r.id)));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Recovery Results</h1>
            <p className="mt-2 text-[var(--neutral-400)]">
                Found {results.length} items from "<strong>{actionName}</strong>". Select items to save.
            </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
            <button
                onClick={onBack}
                className="rounded-md bg-[var(--neutral-700)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--neutral-600)] transition-colors"
            >
                &larr; Back
            </button>
            <button
                onClick={() => alert(`Saving ${selectedItems.size} items... (Feature not implemented)`)}
                disabled={selectedItems.size === 0}
                className="flex items-center gap-2 rounded-md bg-[var(--primary-500)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-600)] transition-colors disabled:opacity-50"
            >
                <ArrowDownTrayIcon className="h-5 w-5" />
                Save Selected ({selectedItems.size})
            </button>
        </div>
      </div>

        {results.length > 0 ? (
            <div className="mt-8">
                <div className="flex justify-end mb-4">
                    <button onClick={handleSelectAll} className="text-sm font-medium text-[var(--primary-500)] hover:underline">
                        {selectedItems.size === results.length ? 'Deselect All' : 'Select All'}
                    </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {results.map(item => (
                    <ResultItem key={item.id} item={item} isSelected={selectedItems.has(item.id)} onSelect={handleSelect} />
                ))}
                </div>
            </div>
        ) : (
            <div className="mt-16 text-center">
                <p className="text-lg text-[var(--neutral-400)]">No recoverable items were found for this scan.</p>
            </div>
        )}
    </div>
  );
};

interface ResultItemProps {
    item: RecoveryResult;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const ResultItem: React.FC<ResultItemProps> = ({ item, isSelected, onSelect }) => {
    return (
        <div onClick={() => onSelect(item.id)} className="relative group cursor-pointer aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-[var(--primary-500)] transition-colors">
            <img src={item.preview} alt={`Recovered item ${item.id}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors"></div>
            {isSelected && (
                <div className="absolute top-2 right-2 bg-white/80 rounded-full text-[var(--primary-500)]">
                    <CheckCircleIcon className="h-6 w-6" />
                </div>
            )}
             <div className="absolute bottom-0 left-0 p-2 text-white text-xs bg-black/50 w-full">
                <p className="truncate font-mono">{item.date}</p>
            </div>
        </div>
    );
};


export default ResultsView;