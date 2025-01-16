import { useState } from 'react';
import { 
  Box, 
  Grid, 
  Text, 
  VStack, 
  HStack, 
  Badge, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatGroup, 
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Button,
  Avatar,
  AvatarGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { 
  Users, 
  BookOpen, 
  Clock, 
  Award,  
  BarChart2, 
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  FileText,
  UserPlus,
  Settings,
  Download
} from 'lucide-react';
import ProfileHeader from './ProfileHeader';

interface Student {
  id: number;
  name: string;
  avatar: string;
  progress: number;
  lastSubmission: string;
}

interface Assignment {
  id: number;
  title: string;
  dueDate: string;
  status: 'active' | 'upcoming' | 'completed';
  submissions: number;
  totalStudents: number;
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=256&h=256&q=80",
    progress: 85,
    lastSubmission: "2024-03-15"
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=256&h=256&q=80",
    progress: 92,
    lastSubmission: "2024-03-14"
  },
  {
    id: 3,
    name: "Carol Williams",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=facearea&facepad=2&w=256&h=256&q=80",
    progress: 78,
    lastSubmission: "2024-03-13"
  }
];

const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: "Python Lab #1: Recursion",
    dueDate: "2024-03-20",
    status: 'active',
    submissions: 15,
    totalStudents: 20
  },
  {
    id: 2,
    title: "Python Lab #2: Data Structures",
    dueDate: "2024-03-25",
    status: 'upcoming',
    submissions: 0,
    totalStudents: 20
  },
  {
    id: 3,
    title: "Python Lab #3: Algorithms",
    dueDate: "2024-03-30",
    status: 'upcoming',
    submissions: 0,
    totalStudents: 20
  }
];

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const bgColor = useColorModeValue('white', 'brand.bg.secondary');
  const borderColor = useColorModeValue('gray.200', 'brand.border.light');

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'upcoming':
        return 'blue';
      case 'completed':
        return 'gray';
      default:
        return 'gray';
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <ProfileHeader 
        name="Professor Smith"
        role="Computer Science Department"
        avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80"
      />

      <HStack spacing={4}>
        <Button leftIcon={<UserPlus size={18} />} colorScheme="purple">Add Student</Button>
        <Button leftIcon={<FileText size={18} />} variant="outline">Create Assignment</Button>
      </HStack>

      <StatGroup gap={4}>
        <Stat bg={bgColor} p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
          <StatLabel><HStack><Users size={16} /> <Text>Total Students</Text></HStack></StatLabel>
          <StatNumber>77</StatNumber>
        </Stat>
        <Stat bg={bgColor} p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
          <StatLabel><HStack><BookOpen size={16} /> <Text>Active Classes</Text></HStack></StatLabel>
          <StatNumber>3</StatNumber>
        </Stat>
        <Stat bg={bgColor} p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
          <StatLabel><HStack><Clock size={16} /> <Text>Pending Reviews</Text></HStack></StatLabel>
          <StatNumber>14</StatNumber>
        </Stat>
        <Stat bg={bgColor} p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
          <StatLabel><HStack><Award size={16} /> <Text>Average Grade</Text></HStack></StatLabel>
          <StatNumber>83%</StatNumber>
        </Stat>
      </StatGroup>

      <Tabs 
        variant="soft-rounded" 
        colorScheme="purple" 
        onChange={(index) => setActiveTab(index)}
        bg={bgColor}
        p={4}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
      >
        <TabList>
          <Tab><HStack><FileText size={16} /><Text>Assignments</Text></HStack></Tab>
          <Tab><HStack><Users size={16} /><Text>Students</Text></HStack></Tab>
          <Tab><HStack><BarChart2 size={16} /><Text>Analytics</Text></HStack></Tab>
        </TabList>

        <TabPanels>
          {/* Assignments Panel */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="bold">Current Assignments</Text>
                <Button leftIcon={<Download size={16} />} size="sm" variant="outline">
                  Export Report
                </Button>
              </HStack>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Assignment</Th>
                    <Th>Due Date</Th>
                    <Th>Status</Th>
                    <Th>Submissions</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mockAssignments.map((assignment) => (
                    <Tr key={assignment.id}>
                      <Td>
                        <Text fontWeight="medium">{assignment.title}</Text>
                      </Td>
                      <Td>{assignment.dueDate}</Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(assignment.status)}>
                          {assignment.status}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <Text>{assignment.submissions}/{assignment.totalStudents}</Text>
                          <Progress 
                            value={(assignment.submissions/assignment.totalStudents) * 100} 
                            size="sm" 
                            width="100px" 
                            colorScheme="purple"
                            borderRadius="full"
                          />
                        </HStack>
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton as={Button} variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </MenuButton>
                          <MenuList>
                            <MenuItem icon={<FileText size={16} />}>View Details</MenuItem>
                            <MenuItem icon={<Download size={16} />}>Download Submissions</MenuItem>
                            <MenuItem icon={<Settings size={16} />}>Settings</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </VStack>
          </TabPanel>

          {/* Students Panel */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="lg" fontWeight="bold">Student Progress</Text>
                <AvatarGroup size="sm" max={3}>
                  {mockStudents.map(student => (
                    <Avatar key={student.id} name={student.name} src={student.avatar} />
                  ))}
                </AvatarGroup>
              </HStack>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Student</Th>
                    <Th>Progress</Th>
                    <Th>Last Submission</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mockStudents.map((student) => (
                    <Tr key={student.id}>
                      <Td>
                        <HStack>
                          <Avatar size="sm" name={student.name} src={student.avatar} />
                          <Text fontWeight="medium">{student.name}</Text>
                        </HStack>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <Progress 
                            value={student.progress} 
                            size="sm" 
                            width="100px" 
                            colorScheme="purple"
                            borderRadius="full"
                          />
                          <Text>{student.progress}%</Text>
                        </HStack>
                      </Td>
                      <Td>{student.lastSubmission}</Td>
                      <Td>
                        <Badge 
                          colorScheme={student.progress >= 80 ? "green" : "yellow"}
                          variant="subtle"
                        >
                          {student.progress >= 80 ? "On Track" : "Needs Attention"}
                        </Badge>
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton as={Button} variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </MenuButton>
                          <MenuList>
                            <MenuItem icon={<FileText size={16} />}>View Progress</MenuItem>
                            <MenuItem icon={<Clock size={16} />}>View History</MenuItem>
                            <MenuItem icon={<Settings size={16} />}>Settings</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </VStack>
          </TabPanel>

          {/* Analytics Panel */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="bold">Performance Analytics</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <CheckCircle2 size={20} color="var(--chakra-colors-green-500)" />
                      <Text fontWeight="medium">Completion Rate</Text>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold">78%</Text>
                    <Progress value={78} size="sm" width="100%" colorScheme="green" />
                  </VStack>
                </Box>
                <Box p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
                  <VStack align="start" spacing={2}>
                    <HStack>
                      <AlertCircle size={20} color="var(--chakra-colors-orange-500)" />
                      <Text fontWeight="medium">Average Response Time</Text>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold">2.5 days</Text>
                    <Progress value={60} size="sm" width="100%" colorScheme="orange" />
                  </VStack>
                </Box>
              </Grid>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default TeacherDashboard;