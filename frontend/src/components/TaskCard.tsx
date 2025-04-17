import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Select,
  Badge,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import { useTaskList } from "../list/task";
import { useState, ChangeEvent } from "react";
import { Task, UpdateTaskInput } from "../Types";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteTask, updateTask } = useTaskList();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  const handleDeleteTask = async (id: number) => {
    const { success, message } = await deleteTask(id);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateTask = async (id: number, updatedData: Task) => {
    const { success, message } = await updateTask(id, updatedData);
    onClose();
    toast({
      title: success ? "Success" : "Error",
      description: success ? "Task updated successfully" : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleComplete = async (
    id: number,
    completed: boolean,
  ) => {
    const { success, message } = await updateTask(id, {completed});
    if (success) {
      setUpdatedTask((prev) => ({ ...prev, completed }));
    }
    toast({
      title: success ? "Success" : "Error",
      description: success ? "Task status updated" : message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      p={4}
    >
      <Box>
        <HStack justifyContent="space-between" mb={2}>
          <Checkbox
            isChecked={updatedTask.completed}
            onChange={(e) =>
              handleToggleComplete(task.id, e.target.checked)
            }
            colorScheme="green"
          />
          <Heading as="h3" size="md">
            {task.title}
          </Heading>
          <Badge colorScheme={getPriorityColor(task.priority)}>
            {task.priority}
          </Badge>
        </HStack>

        <Text color={textColor} mb={4}>
          {task.description}
        </Text>

        <HStack spacing={2}>
          <IconButton
            aria-label="Edit task"
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="blue"
          />
          <IconButton
            aria-label="Delete task"
            icon={<DeleteIcon />}
            onClick={() => handleDeleteTask(task.id)}
            colorScheme="red"
          />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Task Title"
                name="title"
                value={updatedTask.title}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Description"
                name="description"
                value={updatedTask.description}
                onChange={handleInputChange}
              />
              <Select
                name="priority"
                value={updatedTask.priority}
                onChange={handleInputChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateTask(task.id, updatedTask)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TaskCard;
