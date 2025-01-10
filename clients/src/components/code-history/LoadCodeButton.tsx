import { useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem, Text, useToast, HStack } from '@chakra-ui/react';
import { History, Star } from 'lucide-react';
import { getQuestionExecutions } from '../../api/codeApi';
import type { CodeExecutionResponse } from '../../api/codeApi';
import { formatDate } from '../../utils/formatters';

interface LoadCodeButtonProps {
  questionId: number;
  onLoadCode: (code: string, executionId: number, score: number) => void;
}

export const LoadCodeButton = ({ questionId, onLoadCode }: LoadCodeButtonProps) => {
  const toast = useToast();
  const [executions, setExecutions] = useState<CodeExecutionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const data = await getQuestionExecutions(questionId);
      setExecutions(data);
    } catch (error) {
      toast({
        title: 'Failed to load code history',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Menu onOpen={loadHistory}>
      <MenuButton
        as={Button}
        leftIcon={<History size={16} />}
        variant="outline"
        colorScheme="purple"
        isLoading={isLoading}
      >
        Load Code
      </MenuButton>
      <MenuList bg="#110c1b">
        {executions.length === 0 ? (
          <MenuItem>No previous submissions</MenuItem>
        ) : (
          executions.map((execution) => (
            <MenuItem
              key={execution.id}
              onClick={() => onLoadCode(execution.code, execution.id, execution.score)}
              _hover={{ bg: '#1a1625' }}
            >
              <HStack justify="space-between" width="100%">
                <Text fontSize="sm">
                  {formatDate(execution.executed_at)}
                  {execution.version ? ` (v${execution.version})` : ''}
                  {execution.error ? ' (Had errors)' : ' (Success)'}
                </Text>
                {execution.score > 0 && (
                  <HStack spacing={1}>
                    <Star size={14} color="#9F7AEA" />
                    <Text fontSize="sm" color="purple.400">{execution.score}/5</Text>
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