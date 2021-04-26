import { Box } from "@chakra-ui/react";
import React from "react";

// hr

export const MyHr = ({ punkt }) => {
  if (punkt) {
    return (
      <Box border="2px" borderStyle="dashed" w="30%" mx="auto" my={4}></Box>
    );
  }
  return <Box border="2px" w="30%" mx="auto" my={4}></Box>;
};
