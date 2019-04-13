const { tableNames } = require("../config");
const documentClient = require("./documentClient");
const decodeVerify = require("../auth/decodeVerify");

module.exports = (req, res) => {
  const { username, author, idToken, title, content } = req.body;

  decodeVerify(idToken)
    .then(({ email }) => {
      if (email !== username) {
        res.send(500, JSON.stringify({ message: "Unauthorized operation" }));
        return;
      }

      const params = {
        TableName: tableNames.posts,
        Item: {
          id: Date.now(),
          username,
          author,
          title,
          content
        }
      };

      documentClient.put(params, err => {
        if (err) res.send(500, err);
        else res.send(200, JSON.stringify({ id: params.Item.id }));
      });
    })
    .catch(e => res.send(500, JSON.stringify({ message: e })));
};
