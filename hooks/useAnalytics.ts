
import { useEffect } from 'react';

// A mock analytics hook for demonstration purposes.
// In a real application, this would integrate with a service like Google Analytics.

const trackEvent = (eventName: string, eventData: Record<string, any>) => {
    console.log(`[Analytics] Event: ${eventName}`, eventData);
    // Here you would typically send data to your analytics provider
    // e.g., window.gtag('event', eventName, eventData);
};

export const useAnalytics = () => {
    useEffect(() => {
        // Track initial page view
        trackEvent('page_view', { page_path: window.location.pathname });
    }, []);

    return {
        trackEvent,
    };
};

// Example specific event hooks
export const useTrackDeviceConnection = () => {
    const { trackEvent } = useAnalytics();
    return (deviceType: 'iOS' | 'Android') => {
        trackEvent('device_connected', { device_type: deviceType });
    };
};
