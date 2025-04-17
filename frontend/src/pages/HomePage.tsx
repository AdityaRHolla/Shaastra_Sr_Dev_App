import { Container, SimpleGrid, Text, VStack, Spinner } from "@chakra-ui/react";
import { useTasks } from "../graphql/TaskHooks";
import TaskCard from "../components/TaskCard";
import { Task } from "../Types";

const HomePage = () => {
  const { data, loading, error } = useTasks();

  if (loading) return <Spinner size="xl" mt={8} />;
  if (error) return <Text color="red.500">Error: {error.message}</Text>;

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Current Tasks
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
          {data?.tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SimpleGrid>

        {data?.tasks.length === 0 && (
          <Text fontSize="xl" color="gray.500">
            No tasks found.
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
