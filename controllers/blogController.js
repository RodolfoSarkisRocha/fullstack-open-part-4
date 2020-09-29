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

// Delete blog
blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    await Blog.findOneAndRemove(id);
    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Update blog
blogRouter.put("/:id", async (request, response, next) => {
  const id = request.params.id;
  const body = request.body;

  try {
    const opts = { new: true };
    const result = await Blog.findByIdAndUpdate(id, body, opts);
    response.json(result);
  } catch (err) {
    next(err);
  }
});

// GetById blog

blogRouter.get("/:id", async (request, response, next) => {
  const { id } = request.params;

  try {
    const result = await Blog.findById(id);
    response.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
