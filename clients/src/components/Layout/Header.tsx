import React from 'react';
import { Box, Container, Flex, Heading, HStack, Link, Text, Avatar } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box bg="brand.bg.secondary" py={4} borderBottomWidth="1px" borderColor="brand.border.light">
      <Container maxW="7xl">
        <Flex justify="space-between" align="center">
          <Heading size="lg">Programming Practice for SE Program</Heading>
          <HStack spacing={6}>
            <Link href="#" color="brand.text.primary" _hover={{ color: 'brand.accent.primary' }}>
              Home
            </Link>
            <Link href="#" color="brand.text.primary" _hover={{ color: 'brand.accent.primary' }}>
              Assessment
            </Link>
            <HStack>
              <Text>Lecturer</Text>
              <Avatar size="sm" />
            </HStack>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;