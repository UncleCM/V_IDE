import { Box, HStack, VStack, Text, Avatar, Badge } from '@chakra-ui/react';
import { Bell, Settings } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatarUrl: string;
}

const ProfileHeader = ({ name, role, avatarUrl }: ProfileHeaderProps) => {
  return (
    <Box 
      w="100%" 
      bg="brand.bg.secondary" 
      p={4} 
      borderRadius="lg"
      border="1px"
      borderColor="brand.border.light"
    >
      <HStack justify="space-between" align="center">
        {/* Profile Info */}
        <HStack spacing={4}>
          <Avatar 
            size="md" 
            name={name}
            src={avatarUrl}
          />
          <VStack align="start" spacing={1}>
            <Text color="brand.text.primary" fontWeight="bold">{name}</Text>
            <Text color="brand.text.secondary">{role}</Text>
          </VStack>
        </HStack>

        {/* Actions */}
        <HStack spacing={4}>
          <Box position="relative" cursor="pointer">
            <Bell size={20} color="var(--chakra-colors-brand-text-secondary)" />
            <Box
              position="absolute"
              top="-2"
              right="-2"
            >
              <Badge
                colorScheme="red"
                borderRadius="full"
                fontSize="xs"
              >
                3
              </Badge>
            </Box>
          </Box>
          <Settings 
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