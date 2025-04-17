import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  Select,
  useToast
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import React, { useState } from "react";
import { useTaskList } from "../list/task"; // Adjust path as needed

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { fetchTasks,updateTask } = useTaskList();
  const toast = useToast();

  // Local state for filters
  const [completedFilter, setCompletedFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Handle filter changes
  const handleCompletedChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCompletedFilter(value);
    
    fetchTasks(
      value === "all" ? undefined : value === "completed",
      priorityFilter === "all" ? undefined : priorityFilter
    );
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPriorityFilter(value);

    // Call fetchTasks with appropriate filter
    fetchTasks(
      completedFilter === "all" ? undefined : completedFilter === "completed",
      value === "all" ? undefined : value
    );
  };

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>To Do List</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          {/* Completion Filter */}
          <Select
            value={completedFilter}
            onChange={handleCompletedChange}
            width="140px"
            size="sm"
            bg="white"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="notcompleted">Not Completed</option>
          </Select>

          {/* Priority Filter */}
          <Select
            value={priorityFilter}
            onChange={handlePriorityChange}
            width="140px"
            size="sm"
            bg="white"
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>

          <Link to={"/create"}>
            <Button>Add Task</Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
