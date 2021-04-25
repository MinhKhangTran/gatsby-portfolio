const path = require("path");

// create pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMdx(
        filter: { frontmatter: { author: { eq: "Minh Khang Tran" } } }
        sort: { fields: frontmatter___date, order: ASC }
      ) {
        nodes {
          frontmatter {
            slug
          }
          id
        }
      }
    }
  `);

  const posts = result.data.allMdx.nodes;
  posts.forEach(({ frontmatter: { slug } }, index) => {
    const prevId = index === 0 ? null : posts[index - 1].id;
    const nextId = index === posts.length - 1 ? null : posts[index + 1].id;
    createPage({
      path: `/blog/${slug}`,
      component: path.resolve(`src/templates/post-template.js`),
      context: {
        slug,
        prevId,
        nextId,
      },
    });
  });
};
