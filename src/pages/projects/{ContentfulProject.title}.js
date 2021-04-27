import React from "react";
import { graphql } from "gatsby";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { ImGithub } from "react-icons/im";
import { FaShareSquare } from "react-icons/fa";
import { Link } from "gatsby";
import Seo from "../../components/Seo";

const ProjectTemplate = ({ pageContext: { title }, data }) => {
  // console.log(title, data);
  const {
    contentfulProject: { desc, image, demoUrl, githubUrl },
  } = data;
  // console.log(image.description);

  return (
    <>
      <Seo title={title.toUpperCase()} />
      <Box>
        <Button variant="solid" colorScheme="blau">
          <Link to="/projects">⬅ Zurück zur Übersicht</Link>
        </Button>
        <Heading as="h1" mt={8} textAlign="center" mb={4}>
          <Text fontSize="3xl" casing="uppercase">
            {title}
          </Text>
        </Heading>
        <GatsbyImage image={getImage(image)} alt={title} />
        <Text
          casing="capitalize"
          textAlign="center"
          mt={2}
          color="blau.300"
          fontSize="lg"
        >
          {image.description}
        </Text>
        {desc.map((item, index) => {
          return (
            <Box my={8} key={item.id}>
              <Heading my={2} as="h2" fontSize="2xl">
                {item.title}
              </Heading>
              {/* desktop */}
              <Flex
                display={{ base: "none", md: "flex" }}
                direction={index % 2 === 0 ? "row" : "row-reverse"}
              >
                <Text
                  pr={index % 2 === 0 ? 4 : 0}
                  pl={index % 2 === 0 ? 0 : 4}
                  flexBasis={getImage(item.image) ? "50%" : "100%"}
                  fontSize="lg"
                  lineHeight="8"
                >
                  {item.desc.desc}
                </Text>
                <Flex
                  display={getImage(item.image) ? "flex" : "none"}
                  align="center"
                  flexBasis="50%"
                  direction="column"
                >
                  <GatsbyImage image={getImage(item.image)} alt={item.title} />
                  <Text mt={2} color="blau.300" fontSize="lg">
                    {item.image?.description}
                  </Text>
                </Flex>
              </Flex>
              {/* mobile */}
              <Flex
                display={{ base: "flex", md: "none" }}
                direction={index % 2 === 0 ? "column" : "column-reverse"}
              >
                <Text
                  pr={4}
                  flexBasis={getImage(item.image) ? "50%" : "100%"}
                  fontSize="lg"
                  lineHeight="8"
                >
                  {item.desc.desc}
                </Text>
                <Flex
                  align="center"
                  flexBasis="50%"
                  display={getImage(item.image) ? "flex" : "none"}
                  direction="column"
                >
                  <GatsbyImage image={getImage(item.image)} alt={item.title} />
                  <Text mt={2} mb={4} color="blau.300" fontSize="lg">
                    {item.image?.description}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          );
        })}

        <ButtonGroup mt={8}>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <IconButton
              colorScheme="blau"
              aria-label="github"
              variant="link"
              fontSize="30px"
              icon={<ImGithub />}
              _hover={{ color: "blue" }}
            ></IconButton>
          </a>

          <a href={demoUrl} target="_blank" rel="noreferrer">
            <IconButton
              colorScheme="blau"
              aria-label="share"
              variant="link"
              fontSize="30px"
              icon={<FaShareSquare />}
              _hover={{ color: "blue" }}
            ></IconButton>
          </a>
        </ButtonGroup>
      </Box>
    </>
  );
};

export const query = graphql`
  query READ_PROJECT($title: String!) {
    contentfulProject(title: { eq: $title }) {
      date(formatString: "DO MMM YYYY", locale: "de")
      demoUrl
      githubUrl
      id
      title
      excerpt {
        excerpt
      }
      desc {
        title
        id
        desc {
          desc
        }
        image {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          description
        }
      }
      stack {
        stack
      }
      image {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
        description
      }
    }
  }
`;
export default ProjectTemplate;
