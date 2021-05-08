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
            title
          }
          id
        }
      }
    }
  `);

  const posts = result.data.allMdx.nodes;
  posts.forEach(({ frontmatter: { slug } }, index) => {
    const prevSlug = index === 0 ? null : posts[index - 1].frontmatter.slug;
    const prevTitle = index === 0 ? null : posts[index - 1].frontmatter.title;
    const nextSlug =
      index === posts.length - 1 ? null : posts[index + 1].frontmatter.slug;
    const nextTitle =
      index === posts.length - 1 ? null : posts[index + 1].frontmatter.title;
    createPage({
      path: `/blog/${slug}`,
      component: path.resolve(`src/templates/post-template.js`),
      context: {
        slug,
        prevSlug,
        prevTitle,
        nextSlug,
        nextTitle,
      },
    });
  });

  const pageSize = 5;
  const pageCount = Math.ceil(posts.length / pageSize);

  const templatePath = path.resolve(`src/templates/blog-list.js`);

  for (let i = 0; i < pageCount; i++) {
    let path = "/blog";
    if (i > 0) {
      path += `/${i + 1}`;
    }

    createPage({
      path,
      component: templatePath,
      context: {
        limit: pageSize,
        skip: i * pageSize,
        pageCount,
        currentPage: i + 1,
      },
    });
  }
};
