import { Box, Flex, Spacer, Switch, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box as="section" w={{ base: "90%", md: "75%" }} mx="auto">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
export default Layout;
