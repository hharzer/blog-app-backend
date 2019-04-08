const { tableNames } = require("../config");
const documentClient = require("./documentClient");

module.exports = (req, res) => {
  const params = {
    TableName: tableNames.posts
  };

  documentClient.scan(params, (err, data) => {
    if (err) res.send(500, err);
    else res.send(200, JSON.stringify(data.Items));
  });
};
