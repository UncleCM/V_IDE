import { useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem, Text, useToast, HStack } from '@chakra-ui/react';
import { History, Star } from 'lucide-react';
import { getUserSubmissions } from '../../api/codeApi';
import type { CodeExecutionResponse } from '../../api/codeApi';
import { formatDate } from '../../utils/formatters';

interface LoadCodeButtonProps {
  questionId: number;
  onLoadCode: (code: string, executionId: number, score: number) => void;
}

export const LoadCodeButton = ({ questionId, onLoadCode }: LoadCodeButtonProps) => {
  const toast = useToast();
  const [submissions, setSubmissions] = useState<CodeExecutionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSubmissions = async () => {
    try {
      setIsLoading(true);
      const data = await getUserSubmissions(questionId);
      setSubmissions(data);
    } catch (error) {
      toast({
        title: 'Failed to load saved code',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Menu onOpen={loadSubmissions}>
      <MenuButton
        as={Button}
        leftIcon={<History size={16} />}
        variant="outline"
        isLoading={isLoading}
      >
        Load Code
      </MenuButton>
      <MenuList>
        {submissions.length === 0 ? (
          <MenuItem>No saved code found</MenuItem>
        ) : (
          submissions.map((submission) => (
            <MenuItem
              key={submission.id}
              onClick={() => onLoadCode(submission.code, submission.id, submission.score)}
            >
              <HStack justify="space-between" width="100%">
                <Text fontSize="sm" color="brand.text.primary">
                  {formatDate(submission.executed_at)}
                  {submission.version ? ` (v${submission.version})` : ''}
                </Text>
                {submission.score > 0 && (
                  <HStack spacing={1}>
                    <Star size={14} color="brand.primary" />
                    <Text fontSize="sm" color="brand.text.secondary">{submission.score}/5</Text>
                  </HStack>
                )}
              </HStack>
            </MenuItem>
          ))
        )}
      </MenuList>
    </Menu>
  );
};