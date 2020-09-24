const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogController");
const middleware = require("./utils/middleware");

// Database options
const mongoDBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

// Connecting to database
const MONGODB_URI = process.env.MONGODB_URI;
logger.info("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, mongoDBOptions)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });

// Applying middlewares
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)
app.use("/api/blogs", blogRouter);

module.exports = app;