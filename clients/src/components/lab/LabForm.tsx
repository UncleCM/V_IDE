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
  Tag,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { X } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { Lab, SupportedLanguage, ProgrammingConcept } from '../../types/lab';

interface LabFormProps {
  lab: Lab;
  onLabChange: (field: keyof Lab, value: any) => void;
  onDurationChange: (field: keyof Lab['duration'], value: string) => void;
  onSave: () => void;
}

const PROGRAMMING_CONCEPTS: ProgrammingConcept[] = [
  'Expression',
  'For Loop',
  'While Loop',
  'Function',
  'Array',
  'String',
  'Recursion',
  'Object',
  'Class',
  'Variable',
  'Conditional',
  'Loop'
];

const LabForm: React.FC<LabFormProps> = ({
  lab,
  onLabChange,
  onDurationChange,
  onSave,
}) => {
  const handleAddTag = (concept: string) => {
    if (!lab.tags.includes(concept)) {
      onLabChange('tags', [...lab.tags, concept]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onLabChange('tags', lab.tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box flex="1" bg="white" p={6} borderRadius="lg" shadow="sm">
      <VStack spacing={6} align="stretch">
        <SimpleGrid columns={2} spacing={4}>
          <FormControl>
            <FormLabel>Lab Name</FormLabel>
            <Input
              value={lab.name}
              onChange={(e) => onLabChange('name', e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>No.</FormLabel>
            <Input
              value={lab.number}
              onChange={(e) => onLabChange('number', e.target.value)}
              w="20"
            />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={4}>
          <FormControl>
            <FormLabel>Language</FormLabel>
            <Select
              value={lab.language}
              onChange={(e) => onLabChange('language', e.target.value as SupportedLanguage)}
            >
              <option value="Python">Python</option>
              <option value="C++">C++</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Time Duration</FormLabel>
            <HStack>
              <NumberInput
                value={lab.duration.hours}
                onChange={(value) => onDurationChange('hours', value)}
                min={0}
                w="20"
              >
                <NumberInputField />
              </NumberInput>
              <Box>hrs.</Box>
              <NumberInput
                value={lab.duration.minutes}
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
          <Box mb={2}>
            <HStack spacing={2} wrap="wrap">
              {lab.tags.map((tag, index) => (
                <Tag key={index} size="lg" variant="subtle" colorScheme="green">
                  {tag}
                  <IconButton
                    aria-label="Remove tag"
                    icon={<X size={14} />}
                    size="xs"
                    variant="ghost"
                    ml={1}
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Tag>
              ))}
            </HStack>
          </Box>
          <HStack>
            <Select
              placeholder="<- Concept"
              onChange={(e) => handleAddTag(e.target.value)}
              value=""
            >
              {PROGRAMMING_CONCEPTS.map((concept) => (
                <option key={concept} value={concept}>
                  {concept}
                </option>
              ))}
            </Select>
          </HStack>
        </FormControl>

        <FormControl>
          <FormLabel>Tutorial</FormLabel>
          <Editor
            apiKey="your-api-key-here"
            value={lab.tutorial}
            onEditorChange={(content) => onLabChange('tutorial', content)}
            init={{
              height: 300,
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

        <Flex justify="flex-end">
          <Button
            colorScheme="orange"
            onClick={onSave}
          >
            Save/Edit
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default LabForm;