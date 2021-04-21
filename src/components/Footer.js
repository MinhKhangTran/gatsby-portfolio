import React from "react";

import { Box, Flex, Text, Spacer } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      className="footer"
      borderTop="1px"
      pt={4}
      direction="column"
      as="footer"
      w={{ base: "90%", md: "75%" }}
      mx="auto"
      mt={4}
      justify="center"
      align="center"
      mb={2}
    >
      <Text>Made with Gatsby and ChakraUI</Text>

      <Text>Minh Khang Tran (c) {new Date().getFullYear()}</Text>
    </Flex>
  );
};
export default Footer;
