const endpoints = require("../endpoints");
const signup = require("./signup");
const signin = require("./signin");
const verifyToken = require("./verifyToken");
const refreshSession = require("./refreshSession");

module.exports = app => {
  app.post(endpoints.signup, signup);
  app.post(endpoints.signin, signin);
  app.post(endpoints.verify, verifyToken);
  app.post(endpoints.refreshSession, refreshSession);
};
