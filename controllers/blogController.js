const blogRouter = require("express").Router();
const Blog = require("../models/blog");

// Get all blogs
blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

// Create blog
blogRouter.post("/", (request, response) => {  
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
