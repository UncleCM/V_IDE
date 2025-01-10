import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { QuestionStatus } from '../types/questions';

interface QuestionProgress {
  status: QuestionStatus['status'];
  timeSpent: number;
  lastActive: number;
}

interface QuestionProgressContextType {
  questionProgress: Record<number, QuestionProgress>;
  startQuestion: (questionId: number) => void;
  completeQuestion: (questionId: number) => void;
  setQuestionError: (questionId: number) => void;
  getTimeSpent: (questionId: number) => number;
}

const QuestionProgressContext = createContext<QuestionProgressContextType | undefined>(undefined);

export const QuestionProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questionProgress, setQuestionProgress] = useState<Record<number, QuestionProgress>>({});

  // Update time spent every second for active questions
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setQuestionProgress(prev => {
        const updated = { ...prev };
        let hasChanges = false;

        Object.entries(updated).forEach(([id, progress]) => {
          if (progress.status === 'in-progress') {
            const elapsed = Math.floor((now - progress.lastActive) / 1000);
            if (elapsed > 0) {
              updated[Number(id)] = {
                ...progress,
                timeSpent: progress.timeSpent + elapsed,
                lastActive: now
              };
              hasChanges = true;
            }
          }
        });

        return hasChanges ? updated : prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startQuestion = useCallback((questionId: number) => {
    setQuestionProgress(prev => {
      // Only update if not already started or if status is not in-progress
      if (!prev[questionId] || prev[questionId].status !== 'in-progress') {
        return {
          ...prev,
          [questionId]: {
            status: 'in-progress',
            timeSpent: prev[questionId]?.timeSpent || 0,
            lastActive: Date.now()
          }
        };
      }
      return prev;
    });
  }, []);

  const completeQuestion = useCallback((questionId: number) => {
    setQuestionProgress(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        status: 'completed',
      }
    }));
  }, []);

  const setQuestionError = useCallback((questionId: number) => {
    setQuestionProgress(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        status: 'error',
      }
    }));
  }, []);

  const getTimeSpent = useCallback((questionId: number) => {
    return questionProgress[questionId]?.timeSpent || 0;
  }, [questionProgress]);

  const value = {
    questionProgress,
    startQuestion,
    completeQuestion,
    setQuestionError,
    getTimeSpent
  };

  return (
    <QuestionProgressContext.Provider value={value}>
      {children}
    </QuestionProgressContext.Provider>
  );
};

export const useQuestionProgress = () => {
  const context = useContext(QuestionProgressContext);
  if (context === undefined) {
    throw new Error('useQuestionProgress must be used within a QuestionProgressProvider');
  }
  return context;
};