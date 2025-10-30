import { useCallback } from 'react';

// This is a mock analytics hook for demonstration purposes.
// In a real application, this would integrate with a service like Google Analytics, Mixpanel, etc.

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    console.log('[ANALYTICS]', `Event: "${event.name}"`, event.properties || '');
    // Here you would call your analytics service's tracking method, e.g.,
    // window.ga('send', 'event', ...);
    // mixpanel.track(event.name, event.properties);
  }, []);

  return { trackEvent };
};
