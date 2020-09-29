const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { verifyTitleAndUrl } = require("../utils/blogControllerHelper");
const logger = require("../utils/logger");

// Get all blogs
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// Create blog
blogRouter.post("/", async (request, response, next) => {
  if (verifyTitleAndUrl(request.body)) {
    next({ message: "Missing title or url" });
  }
  
  try {
    const blog = new Blog(request.body);

    const result = await blog.save();
    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
