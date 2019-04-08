const { tableNames } = require("../config");
const documentClient = require("./documentClient");

module.exports = (req, res) => {
  const params = {
    TableName: tableNames.posts,
    Key: { id: parseInt(req.body.id, 10) }
  };

  documentClient.delete(params, err => {
    if (err) res.send(500, err);
    else res.send(200, JSON.stringify({ id: req.body.id }));
  });
};
