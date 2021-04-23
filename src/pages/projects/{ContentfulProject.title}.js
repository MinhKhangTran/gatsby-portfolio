import React from "react";
import { graphql } from "gatsby";
import {
  Box,
  Button,
  ButtonGroup,
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

  return (
    <>
      <Seo title={title.toUpperCase()} />
      <Box>
        <Button variant="solid" colorScheme="blau">
          <Link to="/projects">⬅ Zurück zur Übersicht</Link>
        </Button>
        <Heading mt={8} textAlign="center" mb={4}>
          <Text casing="uppercase">{title}</Text>
        </Heading>
        <GatsbyImage image={getImage(image)} alt={title} />

        {desc.map((item) => {
          return (
            <Box key={item.id}>
              <Heading>{item.title}</Heading>
              <Text>{item.desc.desc}</Text>
              <GatsbyImage image={getImage(item.image)} alt={item.title} />
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
