const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { verifyTitleAndUrl } = require("../utils/blogControllerHelper");
const errorENUM = require("../utils/errorENUM");
const jwt = require("jsonwebtoken");

// Get all blogs
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

// Create blog
blogRouter.post("/", async (request, response, next) => {
  const { body } = request;

  try {  
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (verifyTitleAndUrl(body)) next(errorENUM.ERR06);

    const blog = new Blog({
      ...body,
      user: user._id,
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(200).json(result);
  } catch (err) {    
    next(err);
  }
});

// Delete blog
blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(id);
    const userFromBlog = blog.user.toString();

    if(userFromBlog !== user._id.toString()) next(errorENUM.ERR08);

    await Blog.findByIdAndRemove(id);
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
