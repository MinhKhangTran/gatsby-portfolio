import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Box, Flex, Grid, Heading, Text, Tooltip } from "@chakra-ui/react";
//gatsby
import { StaticImage } from "gatsby-plugin-image";

const Hero = () => {
  const [emoji, setEmoji] = useState("👀");
  const data = useStaticQuery(graphql`
    {
      allContentfulAboutme {
        nodes {
          childContentfulAboutmeAboutTextNode {
            about
          }
        }
      }
    }
  `);
  const { allContentfulAboutme: about } = data;
  // console.log(about.nodes[0].childContentfulAboutmeAboutTextNode.about);
  return (
    <Box h="100%">
      <Grid justifyContent="center" alignItems="center" h="100%" w="100%">
        <Flex justify="center" align="center" direction="column">
          {/* <Avatar size="2xl" name="MKT" /> */}
          <StaticImage
            src="../assets/images/mkt.jpg"
            alt="Das bin ich"
            placeholder="blurred"
            className="img"
          />
          <Heading
            textAlign="center"
            w={{ base: "90%", md: "55%" }}
            mt={{ base: "10", md: "14" }}
            fontFamily="mono"
          >
            Hallo, Ich bin{" "}
            <Tooltip
              placement="top-end"
              hasArrow
              label="Du kannst mich Khang nennen. Minh ist ein Zwischenname und Tran mein Nachname"
              // closeDelay={200}
              colorScheme="blue"
              fontSize="lg"
              borderRadius="md"
            >
              <Text
                whiteSpace="nowrap"
                as="span"
                _hover={{ borderBottom: "1px" }}
                onMouseOver={() => {
                  setEmoji("🤫");
                }}
                onMouseOut={() => {
                  setEmoji("👀");
                }}
              >
                Minh Khang Tran{" "}
                <span aria-label="augen" role="img">
                  {emoji}
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
            {about.nodes[0].childContentfulAboutmeAboutTextNode.about}
          </Text>
        </Flex>
      </Grid>
    </Box>
  );
};
export default Hero;
