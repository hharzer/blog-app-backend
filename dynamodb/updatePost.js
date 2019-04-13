const { tableNames } = require("../config");
const documentClient = require("./documentClient");
const decodeVerify = require("../auth/decodeVerify");

const EMPTY_STRING = "EMPTY_STRING";

module.exports = (req, res) => {
  const { username, author, idToken, title, content } = req.body;

  decodeVerify(idToken)
    .then(({ email }) => {
      if (email !== username) {
        res.send(500, JSON.stringify({ message: "Unauthorized operation" }));
        return;
      }

      const id = parseInt(req.body.id, 10);

      let UpdateExpression = "set";
      const ExpressionAttributeNames = { "#u": "username" };
      const ExpressionAttributeValues = { ":u": username };

      if (title !== undefined) {
        UpdateExpression += " #t = :t,";
        ExpressionAttributeNames["#t"] = "title";
        ExpressionAttributeValues[":t"] = title === "" ? EMPTY_STRING : title;
      }

      if (content !== undefined) {
        UpdateExpression += " #c = :c";
        ExpressionAttributeNames["#c"] = "content";
        ExpressionAttributeValues[":c"] =
          content === "" ? EMPTY_STRING : content;
      }

      if (/,$/.test(UpdateExpression)) {
        UpdateExpression = UpdateExpression.replace(/,$/, "");
      }

      const params = {
        TableName: tableNames.posts,
        Key: { id },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        ConditionExpression: "#u = :u"
      };

      documentClient.update(params, err => {
        if (err) res.send(500, err);
        else
          res.send(
            200,
            JSON.stringify({ id, username, author, title, content })
          );
      });
    })
    .catch(e => res.send(500, JSON.stringify({ message: e })));
};
