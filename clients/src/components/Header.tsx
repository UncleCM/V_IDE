import { Box, VStack, HStack, Text, Icon } from "@chakra-ui/react";
import { Clock, User } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box 
      bg="brand.bg.secondary"
      borderBottom="1px"
      borderColor="brand.border.light"
      px={6}
      py={3}
    >
      <VStack spacing={3} align="stretch">
        {/* Top row - Profile */}
        <HStack justify="flex-end" spacing={2}>
          <Icon as={User} color="brand.text.secondary" />
          <Text color="brand.text.secondary">John Doe</Text>
        </HStack>

        {/* Middle and Bottom rows - Lab title and subtitle */}
        <VStack spacing={1} align="center">
          <Text 
            fontSize="2xl" 
            fontWeight="semibold" 
            color="brand.text.primary"
          >
            Python Lab #1
          </Text>
          <Text 
            fontSize="md" 
            color="brand.text.secondary"
          >
            Basic Python Programming
          </Text>
        </VStack>

        {/* Timer - Absolute positioned with larger size */}
        <Box position="absolute" top="14" right="6">
          <HStack spacing={3} align="center">
            <Icon as={Clock} color="brand.text.secondary" width="24px" height="24px" />
            <Text 
              color="brand.text.secondary" 
              fontSize="2xl" 
              fontWeight="semibold" 
              fontFamily="mono"
            >
              {currentTime}
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Header;