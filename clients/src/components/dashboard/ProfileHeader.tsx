import { Box, HStack, VStack, Text, Avatar } from '@chakra-ui/react';
import { Bell } from 'lucide-react';

const ProfileHeader = () => {
  return (
    <Box 
      w="100%" 
      bg="brand.bg.secondary" 
      p={4} 
      mb={8} 
      borderRadius="lg"
      border="1px"
      borderColor="brand.border.light"
    >
      <HStack justify="space-between" align="center">
        {/* Profile Info */}
        <HStack spacing={4}>
          <Avatar 
            size="md" 
            name="John Doe"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <VStack align="start" spacing={1}>
            <Text color="brand.text.primary" fontWeight="bold">John Doe</Text>
            <Text color="brand.text.secondary" fontSize="sm">Tester</Text>
          </VStack>
        </HStack>

        {/* Actions */}
        <HStack spacing={4}>
          <Bell 
            size={20} 
            className="cursor-pointer"
            color="var(--chakra-colors-brand-text-secondary)"
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default ProfileHeader;