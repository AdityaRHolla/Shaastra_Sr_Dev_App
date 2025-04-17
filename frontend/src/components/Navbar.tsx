import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import React from "react";
import { useReactiveVar } from "@apollo/client";
import { completedFilterVar, priorityFilterVar } from "../graphql/localState";

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const selectBg = colorMode === "light" ? "white" : "gray.700";
  const selectColor = colorMode === "light" ? "black" : "white";

  // Use Apollo's hook to track reactive var changes
  const completedFilter = useReactiveVar(completedFilterVar);
  const priorityFilter = useReactiveVar(priorityFilterVar);

  // Convert to select values
  const completedFilterValue =
    completedFilter === undefined
      ? "all"
      : completedFilter
      ? "completed"
      : "notcompleted";

  const priorityFilterValue = priorityFilter || "all";

  // Update Apollo reactive variables on change
  const handleCompletedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      completedFilterVar(undefined);
    } else {
      completedFilterVar(value === "completed");
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    priorityFilterVar(value === "all" ? undefined : value);
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
            value={completedFilterValue}
            onChange={handleCompletedChange}
            width="140px"
            size="sm"
            bg={selectBg}
            color={selectColor}
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="notcompleted">Not Completed</option>
          </Select>

          {/* Priority Filter */}
          <Select
            value={priorityFilterValue}
            onChange={handlePriorityChange}
            width="140px"
            size="sm"
            bg={selectBg}
            color={selectColor}
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>

          <Link to={"/create"}>
            <Button colorScheme="blue">Add Task</Button>
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
