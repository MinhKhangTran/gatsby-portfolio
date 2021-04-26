import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { GoQuote } from "react-icons/go";

// blockquote

export const MyBlockquote = ({ children }) => {
  return (
    <Box
      borderLeft="4px"
      p={4}
      bg={useColorModeValue("blau.100", "blau.700")}
      as="blockquote"
      m={4}
      borderRadius="sm"
    >
      <Flex>
        <Icon
          as={GoQuote}
          w={12}
          h={12}
          color={useColorModeValue("blau.600", "blau.400")}
        />
        <Text ml={4} fontSize="2xl" as="i">
          {children}
        </Text>
      </Flex>
    </Box>
  );
};
