import React from "react";
import { graphql } from "gatsby";
import { Box, ButtonGroup, Heading, IconButton, Text } from "@chakra-ui/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import { ImGithub } from "react-icons/im";
import { FaShareSquare } from "react-icons/fa";

const ProjectTemplate = ({ pageContext: { title }, data }) => {
  // console.log(title, data);
  const {
    contentfulProject: {
      date,
      demoUrl,
      description: { description },
      githubUrl,
      image,
      stack,
    },
  } = data;
  return (
    <Box>
      <Heading textAlign="center" mb={4}>
        <Text casing="uppercase">{title}</Text>
      </Heading>
      <GatsbyImage image={getImage(image)} alt={title} />
      <ReactMarkdown children={description} />
      <ButtonGroup mt={8}>
        <IconButton
          colorScheme="blau"
          aria-label="github"
          variant="link"
          fontSize="30px"
          icon={<ImGithub />}
        ></IconButton>
        <IconButton
          colorScheme="blau"
          aria-label="github"
          variant="link"
          fontSize="30px"
          icon={<FaShareSquare />}
        ></IconButton>
      </ButtonGroup>
    </Box>
  );
};

export const query = graphql`
  query READ_PROJECT($title: String!) {
    contentfulProject(title: { eq: $title }) {
      date(formatString: "Do MMM YYYY", locale: "de")
      demoUrl
      description {
        description
      }
      excerpt {
        excerpt
      }
      githubUrl
      id
      image {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
      }
      stack {
        stack
      }
      title
    }
  }
`;
export default ProjectTemplate;
