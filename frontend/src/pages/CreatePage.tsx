import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Select,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { useTaskList } from "../list/task";
import React from "react";
import { NewTask } from "../Types"; // Import your NewTask type

const CreatePage = () => {
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    description: "",
    priority: "",
    completed: false,
  });
  const toast = useToast();

  const { createTask } = useTaskList();

  const handleAddProduct = async () => {
    const { success, message } = await createTask(newTask);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewTask({ title: "", description: "", priority: "", completed: false });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
            <Input
              placeholder="Task Description"
              name="description"
              value={newTask.description}
              onChange={handleChange}
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
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
