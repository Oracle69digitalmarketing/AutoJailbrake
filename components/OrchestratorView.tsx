import React, { useState } from 'react';
import type { Device, RecoveryResult } from '../types';
import Dashboard from './Dashboard';
import ProcessMonitor from './ProcessMonitor';
import ResultsView from './ResultsView';
import RecoveryView from './RecoveryView';
import RestoreView from './RestoreView';
import PasscodeRecoveryView from './PasscodeRecoveryView';
import TweakInstallerView from './TweakInstallerView';

type OrchestratorSubView = 'dashboard' | 'process' | 'results' | 'recovery' | 'restore' | 'passcode' | 'tweaks';

interface OrchestratorViewProps {
  device: Device;
  onDisconnect: () => void;
}

const OrchestratorView: React.FC<OrchestratorViewProps> = ({ device, onDisconnect }) => {
  const [view, setView] = useState<OrchestratorSubView>('dashboard');
  const [currentAction, setCurrentAction] = useState('');
  const [recoveryResults, setRecoveryResults] = useState<RecoveryResult[] | undefined>(undefined);

  const handleExecuteAction = (actionName: string) => {
    setCurrentAction(actionName);
    setRecoveryResults(undefined);
    setView('process');
  };

  const handleComplete = (results?: RecoveryResult[]) => {
    if (results) {
      setRecoveryResults(results);
      setView('results');
    } else {
      setView('dashboard');
    }
  };
  
  const handleNavigation = (targetView: OrchestratorSubView) => {
      setView(targetView);
  }

  const renderView = () => {
    switch (view) {
      case 'process':
        return <ProcessMonitor actionName={currentAction} onComplete={handleComplete} />;
      case 'results':
        return <ResultsView actionName={currentAction} results={recoveryResults || []} onBack={() => setView('recovery')} />;
      case 'recovery':
        return <RecoveryView device={device} onExecuteAction={handleExecuteAction} onBack={() => setView('dashboard')} />;
      case 'restore':
        return <RestoreView device={device} onExecuteAction={handleExecuteAction} onBack={() => setView('dashboard')} />;
      case 'passcode':
        return <PasscodeRecoveryView device={device} onBack={() => setView('dashboard')} />;
       case 'tweaks':
        return <TweakInstallerView device={device} onBack={() => setView('dashboard')} />;
      case 'dashboard':
      default:
        return <Dashboard device={device} onExecuteAction={handleExecuteAction} onNavigate={handleNavigation} onDisconnect={onDisconnect} />;
    }
  };

  return <div className="animate-fade-in">{renderView()}</div>;
};

export default OrchestratorView;
