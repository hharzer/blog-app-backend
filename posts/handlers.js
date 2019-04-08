const endpoints = require("../endpoints");
const {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost
} = require("../dynamodb");

module.exports = app => {
  app.post(endpoints.createPost, createPost);
  app.get(endpoints.getAllPosts, getAllPosts);
  app.get(endpoints.getPost, getPost);
  app.delete(endpoints.deletePost, deletePost);
  app.put(endpoints.updatePost, updatePost);
};
