import { Heading } from "@chakra-ui/react";
import React from "react";

// h2 und h4

export const MyH2 = ({ children }) => {
  return (
    <Heading
      as="h2"
      borderBottom="1px"
      display="inline-block"
      pb="1px"
      fontSize="2xl"
      my={2}
    >
      {children}
    </Heading>
  );
};
export const MyH4 = ({ children }) => {
  return (
    <Heading as="h4" fontSize="xl" my={2}>
      {children}
    </Heading>
  );
};
