import { Box, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box mb={8} textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" color="brand.text.primary">
        Computers and Programming, SE Programme
      </Text>
      <Text fontSize="xl" color="brand.text.secondary" mt={2}>
        Homework #10
      </Text>
      <Text fontSize="md" color="brand.text.disabled" mt={1}>
        26th September 2023
      </Text>
    </Box>
  );
};  

export default Header;