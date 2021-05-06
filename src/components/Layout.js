import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
//font
import "@fontsource/fira-code";
import "@fontsource/heebo";
//global styles
import "../assets/styles/main.css";

const Layout = ({ children }) => {
  //darkmode
  const bgColor = useColorModeValue("blau.50", "blau.800");
  const textColor = useColorModeValue("blau.600", "blau.100");
  return (
    <Flex direction="column" height="100%" bg={bgColor} color={textColor}>
      <Box className="content">
        <Navbar />
        <Box
          minHeight="76vh"
          as="section"
          w={{ base: "90%", md: "75%" }}
          mx="auto"
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};
export default Layout;
