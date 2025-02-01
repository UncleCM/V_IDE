import React from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tag,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { Plus, X } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { Question, TestCase, TestData, SupportedLanguage } from '../../types/questions';

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
  onUpdate: (question: Question) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
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
  onUpdate,
}) => {
  return (
    <Box flex="1" bg="white" p={6} borderRadius="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
      <VStack spacing={6} align="stretch">
        <SimpleGrid columns={2} spacing={4}>
          <FormControl>
            <FormLabel>Question Title</FormLabel>
            <Input
              value={question.title}
              onChange={(e) => onQuestionChange('title', e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>No.</FormLabel>
            <Input
              value={question.number}
              onChange={(e) => onQuestionChange('number', e.target.value)}
              w="20"
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={4}>
          <FormControl>
            <FormLabel>Language</FormLabel>
            <Select
              value={question.language}
              onChange={(e) => onQuestionChange('language', e.target.value as SupportedLanguage)}
            >
              <option value="Python">Python</option>
              <option value="Javascript">Javascript</option>
              <option value="Typescript">Typescript</option>
              <option value="Rust">Rust</option>
              <option value="Cpp">C++</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Time Duration</FormLabel>
            <HStack>
              <NumberInput
                value={question.duration.hours}
                onChange={(value) => onDurationChange('hours', value)}
                min={0}
                w="20"
              >
                <NumberInputField />
              </NumberInput>
              <Box>hrs.</Box>
              <NumberInput
                value={question.duration.minutes}
                onChange={(value) => onDurationChange('minutes', value)}
                min={0}
                max={59}
                w="20"
              >
                <NumberInputField />
              </NumberInput>
              <Box>mins.</Box>
            </HStack>
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>Tags</FormLabel>
          <HStack spacing={2}>
            {question.tags.map((tag, index) => (
              <Tag key={index} size="lg" variant="subtle" colorScheme="blue">
                {tag}
              </Tag>
            ))}
            <Button size="sm" leftIcon={<Plus size={16} />} variant="outline">
              Add Concept
            </Button>
          </HStack>
        </FormControl>

        <FormControl>
          <FormLabel>Tutorial</FormLabel>
          <Editor
            apiKey="your-api-key-here"
            value={question.tutorial}
            onEditorChange={(content) => onQuestionChange('tutorial', content)}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Editor
            apiKey="your-api-key-here"
            value={question.description}
            onEditorChange={(content) => onQuestionChange('description', content)}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Example</FormLabel>
          <Editor
            apiKey="your-api-key-here"
            value={question.example}
            onEditorChange={(content) => onQuestionChange('example', content)}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Default Code</FormLabel>
          <Editor
            apiKey="your-api-key-here"
            value={question.defaultCode}
            onEditorChange={(content) => onQuestionChange('defaultCode', content)}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Full Code Test</FormLabel>
          <Editor
            apiKey="your-api-key-here"
            value={question.fullCodeTest}
            onEditorChange={(content) => onQuestionChange('fullCodeTest', content)}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Score</FormLabel>
          <Input
            value={question.score}
            onChange={(e) => onQuestionChange('score', e.target.value)}
            w="20"
          />
        </FormControl>

        <Box>
          <Flex justify="space-between" align="center" mb={2}>
            <FormLabel mb={0}>Test Cases</FormLabel>
            <Button size="sm" leftIcon={<Plus size={16} />} onClick={onAddTestCase}>
              Add Test Case
            </Button>
          </Flex>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Score</Th>
                <Th width="1"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {question.testCases.map((testCase, index) => (
                <Tr key={testCase.id}>
                  <Td>
                    <Input
                      size="sm"
                      value={testCase.description}
                      onChange={(e) => onTestCaseChange(index, 'description', e.target.value)}
                    />
                  </Td>
                  <Td>
                    <NumberInput
                      size="sm"
                      value={testCase.score}
                      onChange={(value) => onTestCaseChange(index, 'score', parseInt(value) || 0)}
                      min={0}
                      w="20"
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove test case"
                      icon={<X size={16} />}
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveTestCase(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Box>
          <Flex justify="space-between" align="center" mb={2}>
            <FormLabel mb={0}>Test Data</FormLabel>
            <Button size="sm" leftIcon={<Plus size={16} />} onClick={onAddTestData}>
              Add Test Data
            </Button>
          </Flex>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Score</Th>
                <Th width="1"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {question.testData.map((testData, index) => (
                <Tr key={testData.id}>
                  <Td>
                    <Input
                      size="sm"
                      value={testData.description}
                      onChange={(e) => onTestDataChange(index, 'description', e.target.value)}
                    />
                  </Td>
                  <Td>
                    <NumberInput
                      size="sm"
                      value={testData.score}
                      onChange={(value) => onTestDataChange(index, 'score', parseInt(value) || 0)}
                      min={0}
                      w="20"
                    >
                      <NumberInputField />
                    </NumberInput>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Remove test data"
                      icon={<X size={16} />}
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveTestData(index)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Flex justify="flex-end">
          <Button
            colorScheme="orange"
            onClick={() => onSave(question)}
          >
            Save/Edit
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default QuestionForm;