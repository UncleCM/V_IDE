import React, { useState } from "react";
import { Box, VStack, Button, Text } from "@chakra-ui/react";
import { PlusCircle, Beaker } from "lucide-react";

interface Lab {
  id: number;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  questions: number;
}

const LabSidebar = () => {
    const [selectedLab, setSelectedLab] = useState<number | null>(null);
    
    const labs: Lab[] = [
        { id: 1, title: 'Lab 1: Basics', status: 'completed', questions: 3 },
        { id: 2, title: 'Lab 2: Loops', status: 'in-progress', questions: 4 },
        { id: 3, title: 'Lab 3: Conditional loop', status: 'not-started', questions: 5 }
    ];

    const getStatusColor = (status: Lab['status']) => {
        switch(status) {
            case 'completed': return 'green.500';
            case 'in-progress': return 'blue.500';
            case 'not-started': return 'gray.500';
        }
    };

    return (
        <Box w="64" bg="brand.bg.secondary" p={4} borderRadius="lg" borderWidth="1px" borderColor="brand.border.light">
            <VStack spacing={3} align="stretch">
                {labs.map((lab) => (
                    <Box
                        key={lab.id}
                        p={3}
                        bg="brand.bg.primary"
                        borderRadius="md"
                        cursor="pointer"
                        borderLeft="4px solid"
                        borderLeftColor={getStatusColor(lab.status)}
                        onClick={() => setSelectedLab(lab.id)}
                        _hover={{ bg: 'brand.bg.hover' }}
                        transform={selectedLab === lab.id ? 'translateX(4px)' : 'none'}
                        transition="all 0.2s"
                    >
                        <Text fontWeight="medium">{lab.title}</Text>
                        <Text fontSize="sm" color="brand.text.secondary">
                            {lab.questions} questions
                        </Text>
                    </Box>
                ))}
            </VStack>
            <Button
                leftIcon={<Beaker size={20} />}
                variant="ghost"
                mt={4}
                w="full"
                color="brand.text.secondary"
                _hover={{ color: "brand.accent.primary" }}
            >
                New Lab
            </Button>
        </Box>
    );
};

export default LabSidebar;