import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Select,
  Textarea,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { useCreateTask } from "../graphql/TaskHooks";
import { NewTask } from "../Types";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    description: "",
    priority: "",
    completed: false,
  });
  const toast = useToast();
  const navigate = useNavigate();
  const [createTask, { loading }] = useCreateTask();

  const handleAddTask = async () => {
    try {
      await createTask({
        variables: {
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          completed: newTask.completed,
        },
        onCompleted: () => {
          toast({
            title: "Task created!",
            status: "success",
            duration: 500,
            isClosable: true,
            position: "top",
            onCloseComplete: () => {
              setTimeout(() => navigate("/"), 0);
            },
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            isClosable: true,
          });
        },
      });
    } catch (error) {
      console.error("Creation failed:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Task
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Task Title"
              name="title"
              value={newTask.title}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Task Description"
              name="description"
              value={newTask.description}
              onChange={handleChange}
              rows={4}
              resize="vertical"
            />
            <Select
              placeholder="Select priority"
              name="priority"
              value={newTask.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Select>
            <Button
              colorScheme="blue"
              onClick={handleAddTask}
              w="full"
              isLoading={loading}
            >
              Add Task
            </Button>
            <Button
              variant="ghost"
              colorScheme="gray"
              w="full"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
