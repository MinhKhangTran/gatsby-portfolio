const query = require("./utils/query");

const READ_COMMENTS_BY_SLUG = `
query READ_COMMENTS_PER_SLUG($slug: String!) {
    allComentsBySlug(slug: $slug) {
      data {
        _id
        text
        slug
        user
        _ts
      }
    }
  }
  
`;

//using the query function which returns data, errors from axios

exports.handler = async (event) => {
  const { slug } = JSON.parse(event.body);
  console.log(slug);
  const { data, errors } = await query(READ_COMMENTS_BY_SLUG, { slug });
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ messages: data.allComentsBySlug.data }),
  };
};
