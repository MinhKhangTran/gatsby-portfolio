import React from "react";

import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box h="100%">
      <Grid justifyContent="center" alignItems="center" h="100%" w="100%">
        <Flex justify="center" align="center" direction="column">
          <Avatar size="2xl" name="MKT" />
          <Heading
            textAlign="center"
            w={{ base: "90%", md: "55%" }}
            mt={{ base: "12", md: "16" }}
            fontFamily="mono"
          >
            Hallo, Ich bin{" "}
            <Tooltip
              placement="top-end"
              hasArrow
              label="Du kannst mich Khang nennen. Minh ist ein Zwischenname und Tran mein Nachname 🤫"
              closeDelay={200}
              colorScheme="blue"
              fontSize="lg"
              borderRadius="md"
            >
              <Text
                whiteSpace="nowrap"
                as="span"
                _hover={{ borderBottom: "1px" }}
              >
                Minh Khang Tran{" "}
                <span aria-label="augen" role="img">
                  👀
                </span>
              </Text>
            </Tooltip>
          </Heading>
          <Text
            textAlign="center"
            fontSize="xl"
            mt={8}
            w={{ base: "90%", md: "55%" }}
          >
            Ich bin ein Ingenieur, der gelegentlich schwere Gewicht hebt und
            koreanisch lernt. In meiner Freizeit lerne ich etwas über Web
            Development.
          </Text>
        </Flex>
      </Grid>
    </Box>
  );
};
export default Hero;
