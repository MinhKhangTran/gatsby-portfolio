import { Flex, Spacer, Switch, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "gatsby";
import DarkModeSwitch from "./DarkModeSwitch";

const Layout = () => {
  return (
    <Flex
      align="center"
      py={6}
      w={{ base: "90%", md: "75%" }}
      mx="auto"
      as="nav"
    >
      <DarkModeSwitch />
      <Spacer />
      <Flex>
        <Link to="/">
          <Text>Über mich</Text>
        </Link>

        <Link to="/projects">
          <Text mx={6}>Projekte</Text>
        </Link>

        <Link to="/uses">
          <Text>Uses</Text>
        </Link>
      </Flex>
    </Flex>
  );
};
export default Layout;
