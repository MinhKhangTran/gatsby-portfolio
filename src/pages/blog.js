import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Seo from "../components/Seo";

const BlogPage = ({ data }) => {
  const {
    allMdx: { nodes: posts },
  } = data;
  return (
    <>
      <Seo title="Blog 🇰🇷" />
      <Box>
        {posts.map((post) => {
          return (
            <>
              <Heading key={post.id}>{post.frontmatter.title}</Heading>
              <GatsbyImage
                image={getImage(post.frontmatter.image)}
                alt={post.frontmatter.title}
              />
              <Link to={`/blog/${post.frontmatter.slug}`}>{post.excerpt}</Link>
            </>
          );
        })}
      </Box>
    </>
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
          date(formatString: "MMM, Do YYYY", locale: "de")
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
