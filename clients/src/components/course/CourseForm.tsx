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
  HStack,
  Tag,
  IconButton,
  Flex,
  InputGroup,
} from '@chakra-ui/react';
import { X, Upload } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { Course, SupportedLanguage } from '../../types/courses';

interface CourseFormProps {
  course: Course;
  onCourseChange: (field: keyof Course, value: any) => void;
  onScheduleChange: (field: keyof Course['schedule'], value: string) => void;
  onLanguageAdd: (language: SupportedLanguage) => void;
  onLanguageRemove: (language: SupportedLanguage) => void;
  onSave: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
  course,
  onCourseChange,
  onScheduleChange,
  onLanguageAdd,
  onLanguageRemove,
  onSave,
}) => {
  return (
    <Box flex="1" bg="white" p={6} borderRadius="lg" shadow="sm">
      <VStack spacing={6} align="stretch">
        <SimpleGrid columns={2} spacing={4}>
          <FormControl>
            <FormLabel>Course Name</FormLabel>
            <Input
              value={course.name}
              onChange={(e) => onCourseChange('name', e.target.value)}
              placeholder="Python Programming Lab"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Number of Classes</FormLabel>
            <Input
              value={course.numberOfClasses}
              onChange={(e) => onCourseChange('numberOfClasses', e.target.value)}
              type="number"
              min="1"
              w="24"
            />
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>Languages</FormLabel>
          <HStack spacing={2} mb={2}>
            {course.languages.map((lang) => (
              <Tag key={lang} size="lg" variant="subtle" colorScheme="blue">
                {lang}
                <IconButton
                  aria-label="Remove language"
                  icon={<X size={14} />}
                  size="xs"
                  variant="ghost"
                  ml={1}
                  onClick={() => onLanguageRemove(lang)}
                />
              </Tag>
            ))}
          </HStack>
          <HStack>
            <Select
              placeholder="<- Add"
              onChange={(e) => onLanguageAdd(e.target.value as SupportedLanguage)}
              value=""
            >
              {['Python', 'C++'].map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </Select>
          </HStack>
        </FormControl>

        <FormControl>
          <FormLabel>Schedule</FormLabel>
          <SimpleGrid columns={2} spacing={4}>
            <Box>
              <FormLabel fontSize="sm">Day</FormLabel>
              <Select
                value={course.schedule.day}
                onChange={(e) => onScheduleChange('day', e.target.value)}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </Select>
            </Box>
            <Box>
              <FormLabel fontSize="sm">Room</FormLabel>
              <Input
                value={course.schedule.room}
                onChange={(e) => onScheduleChange('room', e.target.value)}
                placeholder="ECC-704"
              />
            </Box>
          </SimpleGrid>
          
          <SimpleGrid columns={2} spacing={4} mt={4}>
            <Box>
              <FormLabel fontSize="sm">From</FormLabel>
              <HStack>
                <Input
                  value={course.schedule.fromHours}
                  onChange={(e) => onScheduleChange('fromHours', e.target.value)}
                  type="number"
                  min="0"
                  max="23"
                  w="20"
                />
                <Box>hrs.</Box>
                <Input
                  value={course.schedule.fromMinutes}
                  onChange={(e) => onScheduleChange('fromMinutes', e.target.value)}
                  type="number"
                  min="0"
                  max="59"
                  w="20"
                />
                <Box>mins.</Box>
              </HStack>
            </Box>
            <Box>
              <FormLabel fontSize="sm">To</FormLabel>
              <HStack>
                <Input
                  value={course.schedule.toHours}
                  onChange={(e) => onScheduleChange('toHours', e.target.value)}
                  type="number"
                  min="0"
                  max="23"
                  w="20"
                />
                <Box>hrs.</Box>
                <Input
                  value={course.schedule.toMinutes}
                  onChange={(e) => onScheduleChange('toMinutes', e.target.value)}
                  type="number"
                  min="0"
                  max="59"
                  w="20"
                />
                <Box>mins.</Box>
              </HStack>
            </Box>
          </SimpleGrid>
        </FormControl>

        <FormControl>
          <FormLabel>Lecturer Name</FormLabel>
          <Input
            value={course.lecturerName}
            onChange={(e) => onCourseChange('lecturerName', e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Upload Course Picture</FormLabel>
          <InputGroup>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle file upload
                  console.log('File selected:', file);
                }
              }}
              hidden
              id="course-picture"
            />
            <Button
              as="label"
              htmlFor="course-picture"
              cursor="pointer"
              leftIcon={<Upload size={20} />}
              variant="outline"
            >
              Choose File
            </Button>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Course Description</FormLabel>
          <Editor
            apiKey="your-api-key-here"
            value={course.description}
            onEditorChange={(content) => onCourseChange('description', content)}
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

export default CourseForm;