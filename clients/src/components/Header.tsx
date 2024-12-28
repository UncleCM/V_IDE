import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box mb={8} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" color="white">
        Computers and Programming, SE Programme
      </Text>
      <Text fontSize="xl" color="gray.300" mt={2}>
        Homework #1
      </Text>
      <Text fontSize="md" color="gray.400" mt={1}>
        xx - xxxxx - xxxx
      </Text>
    </Box>
  );
};

export default Header;