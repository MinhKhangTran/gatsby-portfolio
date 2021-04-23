import * as React from "react";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import Seo from "../components/Seo";
const ErrorPage = () => {
  return (
    <>
      <Seo title="E.R.R.O.R"></Seo>
      <Grid placeItems="center" h="70vh">
        <Box textAlign="center">
          <Heading
            bgGradient="linear(to-l, blau.400,blue.400)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            404 Error
          </Heading>
          <Text fontSize="2xl" mt={4} color="blau.500">
            Diese Seite gibt es nicht{" "}
            <span role="img" aria-label="emoji">
              🥺
            </span>
            . Bitte gehe zurück zur{" "}
            <Text
              bgGradient="linear(to-l, blau.400,blue.400)"
              bgClip="text"
              fontWeight="semibold"
              as="span"
            >
              <Link to="/">Homepage</Link>
            </Text>
          </Text>
        </Box>
      </Grid>
    </>
  );
};
export default ErrorPage;
