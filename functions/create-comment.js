const query = require("./utils/query");

const CREATE_COMMENT = `
mutation CREATE_COMMENT($slug: String!, $text: String!, $user: String!) {
    createComment(data: { slug: $slug, text: $text, user: $user }) {
      _id
      text
      slug
      user
    }
  }  
`;

exports.handler = async (event) => {
  //destrock vom body
  const { slug, text, user, yuzuTea } = JSON.parse(event.body);
  const { data, errors } = await query(CREATE_COMMENT, { slug, text, user });

  // console.log(yuzuTea);
  // Check if they have filled out the honeypot
  if (yuzuTea) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Expecto Patronum" }),
    };
  }
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ comment: data.createComment }),
  };
};
