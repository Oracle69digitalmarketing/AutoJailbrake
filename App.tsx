import React, { useState } from 'react';
import type { Device } from './types';
import Header from './components/Header';
import ConnectView from './components/ConnectView';
import ManualIDView from './components/ManualIDView';
import OrchestratorView from './components/OrchestratorView';
import NotificationHost from './components/NotificationHost';
import OnboardingView from './components/OnboardingView';
import { useFirstVisit } from './hooks/useFirstVisit';
import Modal from './components/Modal';

type View = 'onboarding' | 'connect' | 'manual-id' | 'orchestrator';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>('connect');
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [isFirstVisit, markAsVisited] = useFirstVisit();

    React.useEffect(() => {
        if (isFirstVisit) {
            setCurrentView('onboarding');
        } else {
            setCurrentView('connect');
        }
    }, [isFirstVisit]);
    
    const handleDeviceSelected = (device: Device) => {
        setSelectedDevice(device);
        setCurrentView('orchestrator');
    };

    const handleManualSelect = () => {
        setCurrentView('manual-id');
    };

    const handleBackToConnect = () => {
        setSelectedDevice(null);
        setCurrentView('connect');
    };

    const handleOnboardingComplete = () => {
        markAsVisited();
        setCurrentView('connect');
    };

    const renderView = () => {
        switch (currentView) {
            case 'onboarding':
                return (
                    <Modal isOpen={true} onClose={() => {}} title="Welcome!" isDismissible={false}>
                        <OnboardingView onComplete={handleOnboardingComplete} />
                    </Modal>
                );
            case 'manual-id':
                return <ManualIDView onDeviceIdentified={handleDeviceSelected} onBack={() => setCurrentView('connect')} />;
            case 'orchestrator':
                if (selectedDevice) {
                    return <OrchestratorView device={selectedDevice} onDisconnect={handleBackToConnect} />;
                }
                // Fallback to connect if no device is selected
                setCurrentView('connect');
                return null;
            case 'connect':
            default:
                return <ConnectView onDeviceSelected={handleDeviceSelected} onManualSelect={handleManualSelect} />;
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[var(--neutral-900)] text-white">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {renderView()}
            </main>
            <NotificationHost />
        </div>
    );
};

export default App;
