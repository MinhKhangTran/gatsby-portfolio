import React from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Spacer,
  Badge,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import slugify from "slugify";
import { motion } from "framer-motion";
import { ImGithub } from "react-icons/im";
import { FaShareSquare } from "react-icons/fa";

const ProjectsPage = ({ data }) => {
  const {
    allContentfulProject: { nodes: projects },
  } = data;
  // console.log(projects);
  return (
    <Box>
      <Heading>Ausgesuchte Projekte</Heading>

      <Text>
        Diese Seite beinhaltet ausgesuchte Projekte, die ich vor Kurzem erstellt
        habe. Es sind hauptsächlich Spaß-Projekte aka Side projects
      </Text>
      <Grid
        mt={8}
        gap={{ base: "4", md: "8" }}
        templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
      >
        {projects.map((project) => {
          const pathToImage = getImage(project.image);
          const slug = slugify(project.title, { lower: true });
          return (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.99 }}
              className="project-card"
              key={project.id}
            >
              <Link to={`/projects/${slug}`}>
                <Flex mb={4}>
                  <Heading as="h3" fontSize="lg">
                    <Text casing="capitalize">{project.title}</Text>
                  </Heading>
                  <Spacer />
                  <Heading as="h3" fontSize="lg">
                    {project.date}
                  </Heading>
                </Flex>
                <GatsbyImage
                  image={pathToImage}
                  alt={project.title}
                  className="project-img"
                ></GatsbyImage>
                <Text>{project.excerpt.excerpt}</Text>
                {project.stack.stack.map((item, index) => {
                  return (
                    <Badge
                      colorScheme={
                        item === "gatsby"
                          ? "purple"
                          : item === "chakraUI"
                          ? "teal"
                          : item === "nextjs"
                          ? "gray"
                          : item === "graphQL"
                          ? "purple"
                          : item === "rest"
                          ? "orange"
                          : item === "redux"
                          ? "purple"
                          : item === "apollo"
                          ? "purple"
                          : "blau"
                      }
                      mr={2}
                      key={index}
                      variant={
                        item === "graphQL"
                          ? "outline"
                          : item === "redux"
                          ? "solid"
                          : "subtle"
                      }
                    >
                      {item}
                    </Badge>
                  );
                })}
                <br />
              </Link>
              <ButtonGroup mt={8}>
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  <IconButton
                    colorScheme="blau"
                    aria-label="github"
                    variant="link"
                    fontSize="30px"
                    icon={<ImGithub />}
                  ></IconButton>
                </a>

                <a href={project.demoUrl} target="_blank" rel="noreferrer">
                  <IconButton
                    colorScheme="blau"
                    aria-label="share"
                    variant="link"
                    fontSize="30px"
                    icon={<FaShareSquare />}
                  ></IconButton>
                </a>
              </ButtonGroup>
            </motion.div>
          );
        })}
      </Grid>
    </Box>
  );
};

export const query = graphql`
  {
    allContentfulProject(sort: { fields: date, order: DESC }) {
      nodes {
        date(formatString: "Do MMM YYYY", locale: "de")
        githubUrl
        title
        id
        demoUrl

        excerpt {
          excerpt
        }
        stack {
          stack
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
    }
  }
`;

export default ProjectsPage;
