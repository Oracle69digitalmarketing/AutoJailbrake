
import { useState, useEffect, useCallback } from 'react';

const FIRST_VISIT_KEY = 'autojailbreak-first-visit-v2';

export const useFirstVisit = (): [boolean, () => void] => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);
      if (hasVisited === null) {
        setIsFirstVisit(true);
      }
    } catch (error) {
        console.error("Could not access localStorage:", error);
    }
  }, []);

  const markAsVisited = useCallback(() => {
    try {
        localStorage.setItem(FIRST_VISIT_KEY, 'true');
        setIsFirstVisit(false);
    } catch (error) {
        console.error("Could not access localStorage:", error);
    }
  }, []);

  return [isFirstVisit, markAsVisited];
};
