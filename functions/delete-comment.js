const query = require("./utils/query");

const DELETE_COMMENT = `
mutation DELETE_COMMENT_BY_ID($id:ID!){
    deleteComment(id:$id){
      _id
      text
      slug
      user
    }
  }
`;

exports.handler = async (event) => {
  //destrock vom body
  const { id } = JSON.parse(event.body);
  const { data, errors } = await query(DELETE_COMMENT, { id });
  console.log(id);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ deletedComment: data.deleteComment }),
  };
};
