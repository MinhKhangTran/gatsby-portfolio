import { graphql, Link } from "gatsby";
import React, { useEffect, useState, useReducer } from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Spinner,
  Text,
  Textarea,
  useMediaQuery,
  useColorModeValue,
} from "@chakra-ui/react";
import Seo from "../components/Seo";
import axios from "axios";
import "moment/locale/de";
import Moment from "react-moment";
import { useFormik } from "formik";
import * as Yup from "yup";

const PostPage = ({ data, pageContext }) => {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }

  async function tripleClick(e, id) {
    if (e.detail === 3) {
      await axios.delete("/api/delete-comment", { data: { id } });
      console.log("yes");
      handleClick();
    }
  }

  const bgColor = useColorModeValue("blau.100", "blau.900");
  const textColor = useColorModeValue("blau.600", "blau.100");

  const [biggerThanMobile] = useMediaQuery("(min-width:1000px)");
  const {
    mdx: {
      frontmatter: { title, embeddedImages },
      body,
    },
  } = data;
  // console.log(pageContext.slug);
  //fetch the comments specific to the postslug
  const read_comments_by_slug = async () => {
    const { data: comments } = await axios("/api/read-comments");
    // console.log(comments);
    setComments(comments);
  };

  const formik = useFormik({
    initialValues: { user: "", text: "", yuzuTea: "" },
    validationSchema: Yup.object({
      user: Yup.string().required("Ein Name ist nötig"),
      text: Yup.string().required("Ein Kommentar ist nötig"),
      yuzuTea: Yup.string(),
    }),
    onSubmit: async (daten, { resetForm }) => {
      try {
        setLoading(true);
        // console.log(daten);
        await axios.post("/api/create-comment", {
          text: daten.text,
          user: daten.user,
          slug: pageContext.slug,
          yuzuTea: daten.yuzuTea,
        });
        // console.log(data);

        handleClick();
        setLoading(false);
        resetForm();
      } catch (error) {
        console.log(error);
        setLoading(false);
        resetForm();
      }
    },
  });

  useEffect(() => {
    read_comments_by_slug();
  }, [ignored]);

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
        <Button my={8} colorScheme="blau">
          <Link to="/blog" replace>
            Zurück zu den Posts
          </Link>
        </Button>

        <Heading>{title}</Heading>
        <MDXRenderer embeddedImages={embeddedImages}>{body}</MDXRenderer>
        <Heading mt={8}>Kommentare</Heading>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <FormControl
              isInvalid={!!formik.errors.user && formik.touched.user}
              id="user"
              mt={4}
              isDisabled={loading}
            >
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                background={bgColor}
                color={textColor}
                type="text"
                {...formik.getFieldProps("user")}
              ></Input>
              <FormErrorMessage>{formik.errors.user}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!formik.errors.text && formik.touched.text}
              id="text"
              mt={4}
              isDisabled={loading}
            >
              <FormLabel>Kommentar</FormLabel>
              <Textarea
                placeholder="Hinterlasse etwa nettes 🥺"
                background={bgColor}
                color={textColor}
                type="text"
                {...formik.getFieldProps("text")}
              ></Textarea>
              <FormErrorMessage>{formik.errors.text}</FormErrorMessage>
            </FormControl>
            {/* honey pot */}
            <FormControl>
              <Input
                hidden
                className="yuzuTea"
                type="yuzuTea"
                name="yuzuTea"
                id="yuzuTea"
                {...formik.getFieldProps("yuzuTea")}
              ></Input>
            </FormControl>
            <Button
              isLoading={loading}
              as="button"
              type="submit"
              colorScheme="blau"
              mt={4}
              mb={8}
            >
              Kommentieren
            </Button>
          </form>
        </Box>
        {comments?.messages.filter(
          (comment) => comment.slug === pageContext.slug
        ).length === 0 ? (
          <Text>Noch keine Kommentare vorhanden</Text>
        ) : null}
        {comments?.messages.length > 0 ? (
          comments.messages
            .filter((comment) => comment.slug === pageContext.slug)
            .sort((a, b) => b._ts - a._ts)
            .map((item) => {
              return (
                <Flex
                  onClick={(e) => {
                    tripleClick(e, item._id);
                  }}
                  onTouchStartCapture={tripleClick}
                  cursor={{ base: "pointer", md: "initial" }}
                  align="center"
                  my={2}
                  key={item._id}
                >
                  <Box>
                    <Text as="u" fontWeight="bold" casing="capitalize">
                      {item.user}
                    </Text>
                    <Text>{item.text}</Text>
                    <Text as="i" color="blau.200">
                      <Moment fromNow locale="de">
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

        <Button my={8} colorScheme="blau">
          <Link to="/blog" replace>
            Zurück zu den Posts
          </Link>
        </Button>
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
