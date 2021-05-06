const query = require("./utils/query");

const READ_COMMENTS = `
query READ_ALL_COMMENTS {
    allComments {
      data {
        _id
        text
        user
        slug
        _ts
      }
    }
  }
`;

//using the query function which returns data, errors from axios

exports.handler = async () => {
  const { data, errors } = await query(READ_COMMENTS);
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ messages: data.allComments.data }),
  };
};
