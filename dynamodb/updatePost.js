const { tableNames } = require("../config");
const documentClient = require("./documentClient");

const EMPTY_STRING = "EMPTY_STRING";

module.exports = (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.body.id, 10);

  let UpdateExpression = "set";
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};

  if (title !== undefined) {
    UpdateExpression += " #t = :t,";
    ExpressionAttributeNames["#t"] = "title";
    ExpressionAttributeValues[":t"] = title === "" ? EMPTY_STRING : title;
  }

  if (content !== undefined) {
    UpdateExpression += " #c = :c";
    ExpressionAttributeNames["#c"] = "content";
    ExpressionAttributeValues[":c"] = content === "" ? EMPTY_STRING : content;
  }

  if (/,$/.test(UpdateExpression)) {
    UpdateExpression = UpdateExpression.replace(/,$/, "");
  }

  const params = {
    TableName: tableNames.posts,
    Key: { id },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues
  };

  documentClient.update(params, err => {
    if (err) res.send(500, err);
    else res.send(200, JSON.stringify({ id, title, content }));
  });
};
