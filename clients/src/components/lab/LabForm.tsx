import React from "react";
import { Box, Text, Input, Select, Textarea, Button, VStack, useToast } from "@chakra-ui/react";

interface LabFormProps {
  initialData: Lab;
  onSubmit: (formData: Omit<Lab, "id">) => Promise<void>;
}

interface Lab {
  id: number;
  labName: string;
  language: string;
  concept: string;
  tutorial: string;
  duration: string;
}

const LabForm: React.FC<LabFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = React.useState<Omit<Lab, "id">>({
    labName: initialData.labName,
    language: initialData.language,
    concept: initialData.concept,
    tutorial: initialData.tutorial,
    duration: initialData.duration
  });
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.labName || !formData.language || !formData.duration) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    await onSubmit(formData);
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          {/* Form fields remain the same as before */}
        </VStack>
      </form>
    </Box>
  );
};

export default LabForm;