const AWS = require("aws-sdk");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const { UserPoolId, ClientId } = require("../config");
global.fetch = require("node-fetch");

module.exports = (req, res) => {
  const { username, password, name } = req.body;
  const poolData = { UserPoolId, ClientId };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const attributes = [
    { Name: "email", Value: username },
    { Name: "name", Value: name }
  ];
  const attributeList = attributes.map(
    attribute => new AmazonCognitoIdentity.CognitoUserAttribute(attribute)
  );

  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err) res.send(500, err);
    else res.send(200, JSON.stringify(result.user));
  });
};
