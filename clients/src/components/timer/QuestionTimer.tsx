import { useEffect, useState } from 'react';
import { Box, HStack, Text, Icon } from '@chakra-ui/react';
import { Timer } from 'lucide-react';

interface QuestionTimerProps {
  questionId: number;
}

const QuestionTimer = ({ questionId }: QuestionTimerProps) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    // Reset timer when question changes
    setSeconds(0);
    
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [questionId]);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);

    return parts.join(' ');
  };

  return (
    <HStack spacing={2} bg="brand.bg.secondary" p={2} borderRadius="md">
      <Icon as={Timer} color="brand.accent.primary" />
      <Text color="brand.text.primary" fontSize="md" fontFamily="mono">
        Time spent: {formatTime(seconds)}
      </Text>
    </HStack>
  );
};

export default QuestionTimer;