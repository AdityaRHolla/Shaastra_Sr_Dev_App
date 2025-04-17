// src/components/TaskHistoryModal.tsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  ModalFooter,
  Box,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_TASK_HISTORY } from "../graphql/TaskHooks";

export const TaskHistoryModal = ({
  taskId,
  isOpen,
  onClose,
}: {
  taskId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data, loading, error } = useQuery(GET_TASK_HISTORY, {
    variables: { taskId: Number(taskId) },
    errorPolicy: "all", // Show both partial results and errors
  });

  console.log("Debug Info:", {
    taskId,
    loading,
    error: error?.message,
    networkError: error?.networkError,
    graphQLErrors: error?.graphQLErrors,
    data,
  });

  if (error) {
    return <Text color="red.500">Error: {error.message}</Text>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Task History</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={3}>
            {data?.taskHistory?.length === 0 && <Text>No history found</Text>}
            {data?.taskHistory.map((history: any) => (
              <Box key={history.id} w="full">
                <Text fontWeight="bold">{history.action}</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(history.timestamp).toLocaleString()}
                </Text>
                {history.details && (
                  <Text fontSize="sm">{history.details}</Text>
                )}
              </Box>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
