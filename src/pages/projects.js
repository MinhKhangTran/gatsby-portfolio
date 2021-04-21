import React from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Spacer,
  Badge,
} from "@chakra-ui/react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import slugify from "slugify";

const icons = {};

const ProjectsPage = ({ data }) => {
  const bgColor = useColorModeValue("blau.200", "blau.600");
  const {
    allContentfulProject: { nodes: projects },
  } = data;
  console.log(projects);
  return (
    <Box>
      <Heading>Ausgesuchte Projekte</Heading>

      <Text>
        Diese Seite beinhaltet ausgesuchte Projekte, die ich vor Kurzem erstellt
        habe. Es sind hauptsächlich Spaß-Projekte aka Side projects
      </Text>
      <Grid
        mt={8}
        gap={4}
        templateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
      >
        {projects.map((project) => {
          const pathToImage = getImage(project.image);
          const slug = slugify(project.title, { lower: true });
          return (
            <Box
              _hover={{ boxShadow: "xl" }}
              p={6}
              borderRadius="xl"
              key={project.id}
              bg={bgColor}
              cursor="pointer"
            >
              <Link to={`/${slug}`}>
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
                <Text>{project.description.description}</Text>
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
              </Link>
            </Box>
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
        demoUrl
        githubUrl
        title
        id
        description {
          description
        }
        stack {
          stack
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
      }
      totalCount
    }
  }
`;

export default ProjectsPage;
