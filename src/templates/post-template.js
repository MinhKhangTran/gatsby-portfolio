import { graphql, Link } from "gatsby";
import React, { useEffect, useState } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Seo from "../components/Seo";
import axios from "axios";
import "moment/locale/de";
import Moment from "react-moment";

const PostPage = ({ data, pageContext }) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(null);

  const [biggerThanMobile] = useMediaQuery("(min-width:1000px)");
  const {
    mdx: {
      frontmatter: { title, embeddedImages },
      body,
    },
  } = data;
  // console.log(pageContext.slug);
  //fetch the comments specific to the postslug
  useEffect(() => {
    setLoading(true);
    const read_comments_by_slug = async () => {
      const { data: comments } = await axios("/api/read-comments");
      // console.log(comments);
      setComments(comments);
    };
    read_comments_by_slug();

    setLoading(false);
  }, []);

  // if (comments) {
  //   console.log(comments);
  //   const commets_for_this_Page = comments.messages.filter(
  //     (comment) => comment.slug === pageContext.slug
  //   );
  //   console.log(commets_for_this_Page);
  // }
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
        <Heading mt={8}>Kommentare</Heading>
        {comments?.messages.filter(
          (comment) => comment.slug === pageContext.slug
        ).length === 0 ? (
          <Text>Noch keine Kommentare vorhanden</Text>
        ) : null}
        {comments?.messages.length > 0 ? (
          comments.messages
            .filter((comment) => comment.slug === pageContext.slug)
            .map((item) => {
              return (
                <Flex align="center" my={2} key={item._id}>
                  <Avatar name={item.user} />
                  <Box ml={8}>
                    <Text as="u" fontWeight="bold" casing="capitalize">
                      {item.user}
                    </Text>
                    <Text>{item.text}</Text>
                    <Text as="i" color="blau.200">
                      <Moment format="MMM, Do YYYY" locale="de">
                        {item._ts / 1000}
                      </Moment>
                    </Text>
                  </Box>
                </Flex>
              );
            })
        ) : (
          <Spinner />
        )}
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
