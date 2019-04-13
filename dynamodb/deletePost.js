const { tableNames } = require("../config");
const documentClient = require("./documentClient");
const decodeVerify = require("../auth/decodeVerify");

module.exports = (req, res) => {
  const { username, idToken } = req.body;

  decodeVerify(idToken)
    .then(({ email }) => {
      if (email !== username) {
        res.send(500, JSON.stringify({ message: "Unauthorized operation" }));
        return;
      }

      const id = parseInt(req.body.id, 10);
      const params = {
        TableName: tableNames.posts,
        Key: { id },
        ConditionExpression: "#u = :u",
        ExpressionAttributeNames: { "#u": "username" },
        ExpressionAttributeValues: { ":u": username }
      };

      documentClient.delete(params, err => {
        if (err) res.send(500, err);
        else res.send(200, JSON.stringify({ id }));
      });
    })
    .catch(e => res.send(500, JSON.stringify({ message: e })));
};
