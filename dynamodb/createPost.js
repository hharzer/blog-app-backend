const { tableNames } = require("../config");
const documentClient = require("./documentClient");

module.exports = (req, res) => {
  const params = {
    TableName: tableNames.posts,
    Item: {
      id: Date.now(),
      title: req.body.title,
      content: req.body.content
    }
  };

  documentClient.put(params, (err, data) => {
    if (err) res.send(500, err);
    else res.send(200, JSON.stringify(data));
  });
};
