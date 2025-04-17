import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTaskList } from "../list/task";
import TaskCard from "../components/TaskCard";
import React from "react";
// import { Product } from "../types"; // Import your Product type

const HomePage = () => {
  const { fetchTasks, tasks } = useTaskList();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Tasks
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SimpleGrid>

        {tasks.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No Tasks pending{" "}
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
