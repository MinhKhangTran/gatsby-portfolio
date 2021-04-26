import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Seo from "../components/Seo";
import { motion } from "framer-motion";

const BlogPage = ({ data }) => {
  const {
    allMdx: { nodes: posts },
  } = data;
  return (
    <Box w={{ base: "100%", md: "75%" }} mx="auto">
      <Seo title="Blog 🇰🇷" />
      <Box mt={8}>
        {posts.map((post) => {
          return (
            <Link to={`/blog/${post.frontmatter.slug}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.99 }}
                className="blog-card"
              >
                <Text color="blau.300">
                  <span className="calendar" role="img" aria-label="kalender">
                    🗓
                  </span>
                  {post.frontmatter.date}
                </Text>
                <Heading mb={1} key={post.id}>
                  {post.frontmatter.title}
                </Heading>

                <GatsbyImage
                  image={getImage(post.frontmatter.image)}
                  alt={post.frontmatter.title}
                  className="blog-img"
                />

                <Text lineHeight="7" fontSize={{ md: "lg", base: "md" }} mt={1}>
                  {post.excerpt}
                </Text>
              </motion.div>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export const query = graphql`
  {
    allMdx(
      filter: { frontmatter: { author: { eq: "Minh Khang Tran" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          slug
          date(formatString: "LL", locale: "de")
          title
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
        excerpt(truncate: true)
      }
    }
  }
`;
export default BlogPage;
