import { useState, useEffect } from 'react';

const STORAGE_KEY_PREFIX = 'question_timer_';

export const useQuestionTimer = (questionId: number) => {
  const storageKey = `${STORAGE_KEY_PREFIX}${questionId}`;
  
  // Initialize timer state from localStorage
  const [seconds, setSeconds] = useState<number>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? parseInt(saved, 10) : 0;
  });

  // Timer effect - only runs when the component is mounted
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        const newValue = prev + 1;
        localStorage.setItem(storageKey, newValue.toString());
        return newValue;
      });
    }, 1000);

    // Cleanup: save time and clear interval when unmounting
    return () => {
      clearInterval(timer);
      localStorage.setItem(storageKey, seconds.toString());
    };
  }, [storageKey, questionId]); // Reset timer when question changes

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
    parts.push(`${secs}s`);

    return parts.join(' ');
  };

  return {
    seconds,
    formattedTime: formatTime(seconds)
  };
};