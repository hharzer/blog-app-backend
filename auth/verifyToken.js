const request = require("request");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const { region, UserPoolId } = require("../config");

module.exports = (req, res) => {
  const { token } = req.body;

  request(
    {
      url: `https://cognito-idp.${region}.amazonaws.com/${UserPoolId}/.well-known/jwks.json`,
      json: true
    },
    (err, response, body) => {
      if (err) return res.send(500, err);

      const pems = {};
      const keys = body.keys;

      keys.forEach(key => {
        const keyId = key.kid;
        const modulus = key.n;
        const exponent = key.e;
        const keyType = key.kty;
        const jwk = { kty: keyType, n: modulus, e: exponent };
        const pem = jwkToPem(jwk);

        pems[keyId] = pem;
      });

      const decodedJwt = jwt.decode(token, { complete: true });

      if (!decodedJwt) return res.send(500, { isValid: false });

      const kid = decodedJwt.header.kid;
      const pem = pems[kid];

      if (!pem) return res.send(500, JSON.stringify({ isValid: false }));

      jwt.verify(token, pem, (err, payload) => {
        if (err) res.send(500, JSON.stringify({ isValid: false }));
        else res.send(200, JSON.stringify({ isValid: true }));
      });
    }
  );
};
