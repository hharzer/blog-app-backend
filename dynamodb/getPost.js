const { tableNames } = require("../config");
const documentClient = require("./documentClient");

module.exports = (req, res) => {
  const params = {
    TableName: tableNames.posts,
    Key: { id: parseInt(req.params.id, 10) }
  };

  documentClient.get(params, (err, data) => {
    if (err) res.send(500, err);
    else res.send(200, JSON.stringify(data.Item));
  });
};
