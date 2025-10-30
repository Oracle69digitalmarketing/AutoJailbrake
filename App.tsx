
import React, { useState, useCallback, useEffect } from 'react';
import type { Device, View, RecoveryResult } from './types';
import { logger } from './services/logger';
import { useFirstVisit } from './hooks/useFirstVisit';

import Header from './components/Header';
import ConnectView from './components/ConnectView';
import ManualIDView from './components/ManualIDView';
import OrchestratorView from './components/OrchestratorView';
import DeviceDetails from './components/DeviceDetails';
import ProcessMonitor from './components/ProcessMonitor';
import RecoveryView from './components/RecoveryView';
import ResultsView from './components/ResultsView';
import PasscodeRecoveryView from './components/PasscodeRecoveryView';
import ActivityLog from './components/ActivityLog';
import NotificationHost from './components/NotificationHost';
import Modal from './components/Modal';
import Settings from './components/Settings';
import OnboardingView from './components/OnboardingView';
import AutoUpdater from './components/AutoUpdater';

const App: React.FC = () => {
  const [view, setView] = useState<View>('connect');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [currentActionName, setCurrentActionName] = useState<string | null>(null);
  const [recoveryResults, setRecoveryResults] = useState<RecoveryResult[] | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [isFirstVisit, markAsVisited] = useFirstVisit();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    if (isFirstVisit) {
      setIsOnboardingOpen(true);
    }
  }, [isFirstVisit]);

  const handleOnboardingComplete = () => {
    markAsVisited();
    setIsOnboardingOpen(false);
  };

  const handleDeviceDetected = useCallback((device: Device) => {
    logger.info(`Device connected: ${device.name} (${device.os} ${device.osVersion})`);
    setSelectedDevice(device);
    setView('orchestrator');
  }, []);

  const handleDisconnect = useCallback(() => {
    if(selectedDevice) {
      logger.info(`Device disconnected: ${selectedDevice.name}`);
    }
    setSelectedDevice(null);
    setCurrentActionName(null);
    setRecoveryResults(null);
    setView('connect');
  }, [selectedDevice]);

  const handleExecuteAction = useCallback((actionName: string) => {
    setCurrentActionName(actionName);
    setView('process');
  }, []);

  const handleProcessComplete = useCallback((results?: RecoveryResult[]) => {
    if (results && results.length > 0) {
      setRecoveryResults(results);
      setView('results');
    } else {
      setView('orchestrator');
    }
  }, []);

  const handleNavigate = (view: 'dashboard' | 'logs') => {
    if (view === 'dashboard') {
      handleDisconnect();
    } else {
      setView(view);
    }
  };
  
  const renderView = () => {
    switch (view) {
      case 'connect':
      case 'dashboard':
        return <ConnectView onDeviceDetected={handleDeviceDetected} onManualSelect={() => setView('manual-id')} />;
      case 'manual-id':
        return <ManualIDView onDeviceIdentified={handleDeviceDetected} onBack={() => setView('connect')} />;
      case 'orchestrator':
        if (!selectedDevice) return <ConnectView onDeviceDetected={handleDeviceDetected} onManualSelect={() => setView('manual-id')} />;
        return (
          <OrchestratorView
            device={selectedDevice}
            onExecuteAction={handleExecuteAction}
            onNavigateTo={(v) => setView(v)}
            onDisconnect={handleDisconnect}
            isActionRunning={view === 'process'}
          />
        );
      case 'device-details':
        if (!selectedDevice) return <ConnectView onDeviceDetected={handleDeviceDetected} onManualSelect={() => setView('manual-id')} />;
        return <DeviceDetails device={selectedDevice} onBack={() => setView('orchestrator')} onExecuteAction={handleExecuteAction} />;
      case 'recovery':
        if (!selectedDevice) return <ConnectView onDeviceDetected={handleDeviceDetected} onManualSelect={() => setView('manual-id')} />;
        return <RecoveryView device={selectedDevice} onBack={() => setView('orchestrator')} onExecuteAction={handleExecuteAction} />;
      case 'passcode-recovery':
        if (!selectedDevice) return <ConnectView onDeviceDetected={handleDeviceDetected} onManualSelect={() => setView('manual-id')} />;
        return <PasscodeRecoveryView device={selectedDevice} onBack={() => setView('orchestrator')} />;
      case 'process':
        if (!currentActionName) return <ConnectView onDeviceDetected={handleDeviceDetected} onManualSelect={() => setView('manual-id')} />;
        return <ProcessMonitor actionName={currentActionName} onComplete={handleProcessComplete} />;
      case 'results':
        if (!recoveryResults || !currentActionName) return <ConnectView onDeviceDetected={handleDeviceDetected} onManualSelect={() => setView('manual-id')} />;
        return <ResultsView actionName={currentActionName} results={recoveryResults} onBack={() => setView('orchestrator')} />;
      case 'logs':
        return <ActivityLog />;
      default:
        return <ConnectView onDeviceDetected={handleDeviceDetected} onManualSelect={() => setView('manual-id')} />;
    }
  };

  return (
    <div className="bg-[var(--neutral-900)] text-white min-h-screen font-sans">
      <Header activeView={view} onNavigate={handleNavigate} onOpenSettings={() => setIsSettingsOpen(true)} />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {view !== 'connect' && view !== 'dashboard' && view !== 'manual-id' && <AutoUpdater />}
        {renderView()}
      </main>
      <NotificationHost />
      <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} title="Settings">
        <Settings />
      </Modal>
      <Modal isOpen={isOnboardingOpen} onClose={handleOnboardingComplete} title="Welcome!">
        <OnboardingView onComplete={handleOnboardingComplete} />
      </Modal>
    </div>
  );
};

export default App;
