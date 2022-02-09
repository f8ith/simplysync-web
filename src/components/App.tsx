import Sidebar from "./Sidebar";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const App = () => {
  const contentBg = useColorModeValue("gray.100", "gray.900");
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Sidebar />
      <Box bg={contentBg} ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};
