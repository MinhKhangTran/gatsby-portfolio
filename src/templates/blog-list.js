import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Seo from "../components/Seo";
import { motion } from "framer-motion";

export default function BlogListTemplate({ data, pageContext }) {
  // console.log(data, pageContext);
  const prevPage = pageContext.currentPage - 1;
  const nextPage = pageContext.currentPage + 1;
  const hasPrev = prevPage >= 1;
  const hasNext = nextPage <= pageContext.pageCount;
  const {
    allMdx: { nodes: posts },
  } = data;
  return (
    <Box w={{ base: "100%", md: "75%" }} mx="auto">
      <Seo title="Blog 🇰🇷" />
      <Box mt={8}>
        {posts.map((post) => {
          return (
            <Link key={post.id} to={`/blog/${post.frontmatter.slug}`}>
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
                <Flex direction={{ base: "column", md: "row" }}>
                  <Box flexBasis="50%">
                    <GatsbyImage
                      image={getImage(post.frontmatter.image)}
                      alt={post.frontmatter.title}
                      className="blog-img"
                    />
                  </Box>

                  <Text
                    flexBasis="50%"
                    lineHeight="7"
                    fontSize={{ md: "lg", base: "md" }}
                    mt={{ base: "1", md: "0" }}
                    pl={{ base: "0", md: "4" }}
                  >
                    {post.excerpt}
                  </Text>
                </Flex>
              </motion.div>
            </Link>
          );
        })}
      </Box>
      {/*================================PAGINATION============================= */}
      <Flex justify="center">
        <ButtonGroup mt={8}>
          <Button colorScheme="blau">
            <Link to="/blog">&lt;&lt;</Link>
          </Button>
          <Button isDisabled={!hasPrev} colorScheme="blau">
            <Link
              disabled={!hasPrev}
              to={
                pageContext.currentPage === 2 || pageContext.currentPage === 1
                  ? "/blog"
                  : `/blog/${prevPage}`
              }
            >
              &lt;
            </Link>
          </Button>
          {Array.from({ length: pageContext.pageCount }, (_, index) => {
            return (
              <Button
                key={index}
                isActive={pageContext.currentPage === index + 1}
                colorScheme="blau"
              >
                <Link
                  // activeClassName="activebtn"

                  to={index === 0 ? `/blog` : `/blog/${index + 1}`}
                >
                  {index + 1}
                </Link>
              </Button>
            );
          })}
          <Button isDisabled={!hasNext} colorScheme="blau">
            <Link
              disabled={!hasNext}
              to={
                pageContext.currentPage === pageContext.pageCount
                  ? `/blog/${pageContext.pageCount}`
                  : `/blog/${nextPage}`
              }
            >
              &gt;
            </Link>
          </Button>
          <Button colorScheme="blau">
            <Link to={`/blog/${pageContext.pageCount}`}>&gt;&gt;</Link>
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export const query = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { frontmatter: { author: { eq: "Minh Khang Tran" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
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
