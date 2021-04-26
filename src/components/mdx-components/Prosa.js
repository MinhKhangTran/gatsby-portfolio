import { Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

// p

export const MyP = ({ children, farbe, rot }) => {
  const textColor = useColorModeValue("green.600", "green.100");
  const textColor2 = useColorModeValue("red.600", "red.100");
  if (farbe) {
    return (
      <Text fontSize="lg" color={textColor} as="p" lineHeight="8">
        {children}
      </Text>
    );
  }
  if (rot) {
    return (
      <Text fontSize="lg" color={textColor2} as="span" lineHeight="8">
        {children}
      </Text>
    );
  }
  return (
    <Text fontSize="lg" as="p" lineHeight="8">
      {children}
    </Text>
  );
};
