const AWS = require("aws-sdk");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const { UserPoolId, ClientId } = require("../config");
global.fetch = require("node-fetch");

module.exports = (req, res) => {
  const { username, password } = req.body;
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    { Username: username, Password: password }
  );
  const poolData = { UserPoolId, ClientId };
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  const userData = { Username: username, Pool: userPool };
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: result => {
      res.send(
        200,
        JSON.stringify({
          username,
          accessToken: result.getAccessToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken()
        })
      );
    },
    onFailure: err => res.send(500, err)
  });
};
