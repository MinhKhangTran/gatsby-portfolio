import { graphql } from "gatsby";
import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";

const PostPage = ({ data }) => {
  const {
    mdx: {
      frontmatter: { title, date, embeddedImages },
      body,
    },
  } = data;
  return (
    <div>
      <MDXRenderer embeddedImages={embeddedImages}>{body}</MDXRenderer>
    </div>
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
        }
      }
      body
    }
  }
`;

export default PostPage;
