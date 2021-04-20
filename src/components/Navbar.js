import { Flex, Spacer, Switch, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "gatsby";

const Layout = () => {
  return (
    <Flex py={6} w={{ base: "90%", md: "75%" }} mx="auto" as="nav">
      <Switch colorScheme="blue" />
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
