const app = require("./app");
const http = require("http");
const logger = require("./utils/logger");

const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
