import React, { useState, useCallback } from 'react';
import type { Device, AppView, RecoveryResult } from './types';
import Header from './components/Header';
import ConnectView from './components/ConnectView';
import ManualIDView from './components/ManualIDView';
import Dashboard from './components/Dashboard';
import RecoveryView from './components/RecoveryView';
import PasscodeRecoveryView from './components/PasscodeRecoveryView';
import TweakInstallerView from './components/TweakInstallerView';
import RestoreView from './components/RestoreView';
import NetworkView from './components/NetworkView';
import AnalyticsView from './components/AnalyticsView';
import ProcessMonitor from './components/ProcessMonitor';
import ResultsView from './components/ResultsView';
import NotificationHost from './components/NotificationHost';
import Modal from './components/Modal';
import OnboardingView from './components/OnboardingView';
import { useFirstVisit } from './hooks/useFirstVisit';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>({ name: 'connect' });
  const [isFirstVisit, markAsVisited] = useFirstVisit();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(isFirstVisit);

  const handleDeviceSelected = useCallback((device: Device) => {
    setView({ name: 'dashboard', device });
  }, []);

  const handleNavigate = useCallback((viewName: AppView['name'], device?: Device) => {
    if (viewName === 'dashboard' && device) {
      setView({ name: 'dashboard', device });
    } else if (viewName === 'connect') {
      setView({ name: 'connect' });
    } else if (viewName === 'manual_id') {
      setView({ name: 'manual_id' });
    } else if (viewName === 'recovery' && 'device' in view) {
      setView({ name: 'recovery', device: view.device });
    } else if (viewName === 'passcode' && 'device' in view) {
      setView({ name: 'passcode', device: view.device });
    } else if (viewName === 'tweaks' && 'device' in view) {
      setView({ name: 'tweaks', device: view.device });
    } else if (viewName === 'restore' && 'device' in view) {
      setView({ name: 'restore', device: view.device });
    } else if (viewName === 'network') {
      setView({ name: 'network' });
    } else if (viewName === 'analytics') {
      setView({ name: 'analytics' });
    }
  }, [view]);

  const handleExecuteAction = useCallback((actionName: string) => {
    setView(prev => ({ ...prev, name: 'processing', actionName }));
  }, []);

  const handleProcessComplete = useCallback((results?: RecoveryResult[]) => {
    const previousView = view.name === 'processing' && 'previousViewName' in view ? view.previousViewName : 'dashboard';
    const device = 'device' in view ? view.device : undefined;
    
    if (results && results.length > 0 && device) {
      setView({ name: 'results', results, actionName: view.name === 'processing' ? view.actionName : 'Unknown', device, previousViewName: previousView });
    } else if (device) {
       handleNavigate(previousView, device);
    } else {
       setView({ name: 'connect' });
    }
  }, [view, handleNavigate]);

  const handleOnboardingComplete = () => {
    markAsVisited();
    setIsOnboardingOpen(false);
  };
  
  const renderView = () => {
    switch (view.name) {
      case 'connect':
        return <ConnectView onDeviceSelected={handleDeviceSelected} onManualSelect={() => handleNavigate('manual_id')} />;
      case 'manual_id':
        return <ManualIDView onDeviceIdentified={handleDeviceSelected} onBack={() => handleNavigate('connect')} />;
      case 'dashboard':
        return <Dashboard device={view.device} onDisconnect={() => handleNavigate('connect')} onNavigate={handleNavigate} onExecuteAction={handleExecuteAction} />;
      case 'recovery':
        return <RecoveryView device={view.device} onExecuteAction={handleExecuteAction} onBack={() => handleNavigate('dashboard', view.device)} />;
      case 'passcode':
        return <PasscodeRecoveryView device={view.device} onBack={() => handleNavigate('dashboard', view.device)} />;
      case 'tweaks':
        return <TweakInstallerView onExecuteAction={handleExecuteAction} onBack={() => handleNavigate('dashboard', view.device)} />;
      case 'restore':
        return <RestoreView device={view.device} onExecuteAction={handleExecuteAction} onBack={() => handleNavigate('dashboard', view.device)} />;
      case 'network':
        return <NetworkView onBack={() => handleNavigate('dashboard', 'device' in view ? view.device : undefined)} />;
      case 'analytics':
        return <AnalyticsView />;
      case 'processing':
        return <ProcessMonitor actionName={view.actionName} onComplete={handleProcessComplete} />;
      case 'results':
        return <ResultsView actionName={view.actionName} results={view.results} onBack={() => handleNavigate(view.previousViewName, view.device)} />;
      default:
        return <ConnectView onDeviceSelected={handleDeviceSelected} onManualSelect={() => handleNavigate('manual_id')} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--neutral-900)] text-white font-sans">
      <Header currentView={view.name} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {renderView()}
      </main>
      <NotificationHost />
      <Modal
        isOpen={isOnboardingOpen}
        onClose={handleOnboardingComplete}
        title="Welcome to AutoJailbreak"
        isDismissible={false}
      >
        <OnboardingView onComplete={handleOnboardingComplete} />
      </Modal>
    </div>
  );
};

export default App;
