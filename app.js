// Configuration
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");

// Utils
const logger = require("./utils/logger");

// Routes
const blogRouter = require("./controllers/blogController");
const userRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController");

// Middlewares
const { errorHandler, requestLogger, tokenExtractor } = require("./utils/middleware");

// Database options
const mongoDBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

// Connecting to database
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
app.use(requestLogger);
app.use(tokenExtractor)
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);

module.exports = app;
