import React from "react";
import { graphql } from "gatsby";
import {
  Box,
  Button,
  ButtonGroup,
  ChakraProvider,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import ReactMarkdown from "react-markdown";
import { ImAttachment, ImGithub } from "react-icons/im";
import { FaShareSquare } from "react-icons/fa";
import { Link } from "gatsby";

const ProjectTemplate = ({ pageContext: { title }, data }) => {
  // console.log(title, data);
  const {
    contentfulProject: { date, demoUrl, desc, githubUrl, image, stack },
  } = data;

  return (
    <Box>
      <Button variant="solid" colorScheme="blau">
        <Link to="/projects">⬅ Zurück zur Übersicht</Link>
      </Button>
      <Heading textAlign="center" mb={4}>
        <Text casing="uppercase">{title}</Text>
      </Heading>
      <GatsbyImage image={getImage(image)} alt={title} />

      {desc.map((item) => {
        {
          /* console.log(item); */
        }
        return (
          <Box key={item.id}>
            <Heading>{item.title}</Heading>
            <Text>{item.desc.desc}</Text>
            <GatsbyImage image={getImage(item.image)} alt={item.titel} />
          </Box>
        );
      })}
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
        }
      }
      stack {
        stack
      }
      image {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
      }
    }
  }
`;
export default ProjectTemplate;
