import { graphql, Link } from "gatsby";
import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import Seo from "../components/Seo";

const PostPage = ({ data, pageContext }) => {
  const [biggerThanMobile] = useMediaQuery("(min-width:1000px)");
  const {
    mdx: {
      frontmatter: { title, embeddedImages },
      body,
    },
  } = data;
  // console.log(pageContext);
  return (
    <>
      <Seo title={title} />
      <Box>
        <Link to="/blog">
          <Button my={8} colorScheme="blau">
            Zurück zu den Posts
          </Button>
        </Link>
        <Heading>{title}</Heading>
        <MDXRenderer embeddedImages={embeddedImages}>{body}</MDXRenderer>
        {biggerThanMobile ? (
          <Flex mt={8}>
            <Button colorScheme="blau" isDisabled={!pageContext.prevTitle}>
              {pageContext.prevTitle ? (
                <Link to={`/blog/${pageContext.prevSlug}`}>
                  <span role="img" aria-label="prev post">
                    ⬅️
                  </span>{" "}
                  {pageContext.prevTitle}
                </Link>
              ) : (
                "Das ist der erste Post 💪"
              )}
            </Button>
            <Spacer />
            <Button colorScheme="blau" isDisabled={!pageContext.nextTitle}>
              {pageContext.nextTitle ? (
                <Link to={`/blog/${pageContext.nextSlug}`}>
                  {pageContext.nextTitle}{" "}
                  <span role="img" aria-label="next post">
                    ➡️
                  </span>
                </Link>
              ) : (
                "Das ist der letzte Post 🤓"
              )}
            </Button>
          </Flex>
        ) : (
          <Flex mt={8}>
            <Button
              variant="ghost"
              colorScheme="blau"
              isDisabled={!pageContext.prevTitle}
            >
              {pageContext.prevTitle ? (
                <Link to={`/blog/${pageContext.prevSlug}`}>
                  <span role="img" aria-label="prev post">
                    ⬅️
                  </span>{" "}
                </Link>
              ) : (
                "erster Post"
              )}
            </Button>
            <Spacer />
            <Button
              variant="ghost"
              colorScheme="blau"
              isDisabled={!pageContext.nextTitle}
            >
              {pageContext.nextTitle ? (
                <Link to={`/blog/${pageContext.nextSlug}`}>
                  <span role="img" aria-label="next post">
                    ➡️
                  </span>
                </Link>
              ) : (
                "letzter Post"
              )}
            </Button>
          </Flex>
        )}
      </Box>
    </>
  );
};

export const query = graphql`
  query READ_SINGLE_POST($slug: String) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        author
        date(formatString: "MMM, DO YYYY", locale: "de")
        slug
        title
        embeddedImages {
          childImageSharp {
            gatsbyImageData
          }
          name
        }
      }
      body
    }
  }
`;

export default PostPage;
