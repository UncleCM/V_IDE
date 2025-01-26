import React from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Input, 
  Select, 
  HStack, 
  Textarea, 
  Button, 
  VStack, 
  useToast,
  IconButton
} from '@chakra-ui/react';
import { Save, Trash2, PlusCircle } from 'lucide-react';
import { Question, TestCase, TestData } from '../../types/questions';

interface QuestionFormProps {
  question: Question;
  onQuestionChange: (field: keyof Question, value: any) => void;
  onDurationChange: (field: keyof Question['duration'], value: string) => void;
  onTestCaseChange: (index: number, field: keyof TestCase, value: any) => void;
  onTestDataChange: (index: number, field: keyof TestData, value: any) => void;
  onAddTestCase: () => void;
  onAddTestData: () => void;
  onRemoveTestCase: (index: number) => void;
  onRemoveTestData: (index: number) => void;
  onSave: (question: Question) => void;
  onUpdate?: (question: Question) => void;
}

const QuestionForm = ({ 
  question, 
  onQuestionChange, 
  onDurationChange,
  onTestCaseChange,
  onTestDataChange,
  onAddTestCase,
  onAddTestData,
  onRemoveTestCase,
  onRemoveTestData,
  onSave,
  onUpdate 
}: QuestionFormProps) => {
  const toast = useToast();

  const handleSave = () => {
    const requiredFields: (keyof Question)[] = [
      'name', 
      'number', 
      'language', 
      'tags',
      'tutorial',
      'question', 
      'fullCodeTest',
      'score',
      'testCases',
      'testData'
    ];

    const missingFields = requiredFields.filter(field => {
      const value = question[field];
      
      // Special handling for arrays
      if (field === 'tags' || field === 'testCases' || field === 'testData') {
        return value.length === 0;
      }

      return value === undefined || value === '' || 
             (typeof value === 'string' && value.trim() === '');
    });

    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in the following fields: ${missingFields.join(', ')}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Determine whether to save or update
    if (question.id) {
      onUpdate ? onUpdate(question) : onSave(question);
    } else {
      onSave(question);
    }

    toast({
      title: question.id ? "Question Updated" : "Question Saved",
      description: `The question has been successfully ${question.id ? 'updated' : 'saved'}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box flex="1" bg="brand.bg.secondary" p={6} borderRadius="lg" borderWidth="1px" borderColor="brand.border.light">
      <VStack spacing={6} align="stretch">
        {/* Question Name */}
        <Box>
          <Text mb={2} fontWeight="medium">Question Name</Text>
          <Input
            value={question.name}
            onChange={(e) => onQuestionChange('name', e.target.value)}
            placeholder="Enter question name"
          />
        </Box>

        {/* Question Number */}
        <Box>
          <Text mb={2} fontWeight="medium">Question Number</Text>
          <Input
            value={question.number}
            onChange={(e) => onQuestionChange('number', e.target.value)}
            placeholder="Enter question number"
          />
        </Box>

        {/* Language */}
        <Box>
          <Text mb={2} fontWeight="medium">Language</Text>
          <Select
            value={question.language}
            onChange={(e) => onQuestionChange('language', e.target.value)}
          >
            <option value="Python">Python</option>
            <option value="Javascript">Javascript</option>
            <option value="Typescript">Typescript</option>
            <option value="Rust">Rust</option>
            <option value="Cpp">C++</option>
          </Select>
        </Box>

        {/* Tags */}
        <Box>
          <Text mb={2} fontWeight="medium">Tags</Text>
          <Input
            value={question.tags.join(', ')}
            onChange={(e) => onQuestionChange('tags', e.target.value.split(', '))}
            placeholder="Enter tags separated by commas"
          />
        </Box>

        {/* Time Duration */}
        <Flex gap={4}>
          <Box>
            <Text mb={2} fontWeight="medium">Time Duration</Text>
            <HStack>
              <Input
                w="16"
                value={question.duration.hours}
                onChange={(e) => onDurationChange('hours', e.target.value)}
                placeholder="Hours"
                type="number"
              />
              <Text>hrs.</Text>
              <Input
                w="16"
                value={question.duration.minutes}
                onChange={(e) => onDurationChange('minutes', e.target.value)}
                placeholder="Minutes"
                type="number"
              />
              <Text>mins.</Text>
            </HStack>
          </Box>
        </Flex>

        {/* Tutorial Section */}
        <Box>
          <Text mb={2} fontWeight="medium">Tutorial</Text>
          <Textarea
            value={question.tutorial}
            onChange={(e) => onQuestionChange('tutorial', e.target.value)}
            placeholder="Enter tutorial or problem context"
            minH="100px"
          />
        </Box>

        {/* Question Section */}
        <Box>
          <Text mb={2} fontWeight="medium">Question Description</Text>
          <Textarea
            value={question.question}
            onChange={(e) => onQuestionChange('question', e.target.value)}
            placeholder="Describe the programming problem or task"
            minH="150px"
          />
        </Box>

        {/* Full Code Test */}
        <Box>
          <Text mb={2} fontWeight="medium">Full Code Test</Text>
          <Textarea
            value={question.fullCodeTest}
            onChange={(e) => onQuestionChange('fullCodeTest', e.target.value)}
            placeholder="Enter full code test script or requirements"
            minH="150px"
          />
        </Box>

        {/* Test Cases Section */}
        <Box>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontWeight="medium">Test Cases</Text>
            <Button 
              leftIcon={<PlusCircle size={16} />} 
              variant="ghost" 
              size="sm"
              onClick={onAddTestCase}
            >
              Add Test Case
            </Button>
          </Flex>
          {question.testCases.map((testCase, index) => (
            <Flex key={testCase.id} mb={2} gap={2}>
              <Input
                flex="3"
                value={testCase.description}
                onChange={(e) => onTestCaseChange(index, 'description', e.target.value)}
                placeholder="Test case description"
              />
              <Input
                flex="1"
                type="number"
                value={testCase.score}
                onChange={(e) => onTestCaseChange(index, 'score', Number(e.target.value))}
                placeholder="Score"
              />
              <IconButton
                icon={<Trash2 size={20} />}
                aria-label="Remove Test Case"
                variant="ghost"
                colorScheme="red"
                onClick={() => onRemoveTestCase(index)}
              />
            </Flex>
          ))}
        </Box>

        {/* Test Data Section */}
        <Box>
          <Flex justify="space-between" align="center" mb={2}>
            <Text fontWeight="medium">Test Data</Text>
            <Button 
              leftIcon={<PlusCircle size={16} />} 
              variant="ghost" 
              size="sm"
              onClick={onAddTestData}
            >
              Add Test Data
            </Button>
          </Flex>
          {question.testData.map((testData, index) => (
            <Flex key={testData.id} mb={2} gap={2}>
              <Input
                flex="3"
                value={testData.description}
                onChange={(e) => onTestDataChange(index, 'description', e.target.value)}
                placeholder="Test data description"
              />
              <Input
                flex="1"
                type="number"
                value={testData.score}
                onChange={(e) => onTestDataChange(index, 'score', Number(e.target.value))}
                placeholder="Score"
              />
              <IconButton
                icon={<Trash2 size={20} />}
                aria-label="Remove Test Data"
                variant="ghost"
                colorScheme="red"
                onClick={() => onRemoveTestData(index)}
              />
            </Flex>
          ))}
        </Box>

        {/* Score Section */}
        <Box>
          <Text mb={2} fontWeight="medium">Question Score</Text>
          <Input
            type="number"
            value={question.score}
            onChange={(e) => onQuestionChange('score', e.target.value)}
            placeholder="Enter total question score"
          />
        </Box>

        {/* Save Button */}
        <Flex justify="flex-end">
          <Button
            leftIcon={<Save size={20} />}
            colorScheme="orange"
            variant="solid"
            onClick={handleSave}
          >
            {question.id ? 'Update' : 'Save'} Question
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default QuestionForm;