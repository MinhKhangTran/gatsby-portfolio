import { Box, Flex, Spacer, Switch, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
//font
import "@fontsource/fira-code";
import "@fontsource/heebo";
//global styles
import "../assets/styles/main.css";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" height="100%" bg="blau.50">
      <Box className="content">
        <Navbar />
        <Box h="80%" as="section" w={{ base: "90%", md: "75%" }} mx="auto">
          {children}
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};
export default Layout;
