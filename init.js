const middlewares = require("./middlewares");
const postsCRUD = require("./posts");
const auth = require("./auth");

module.exports = app => {
  middlewares(app);
  postsCRUD(app);
  auth(app);
};
