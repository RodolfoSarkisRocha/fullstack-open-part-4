const app = require("./app");
const http = require("http");
const logger = require("./utils/logger");
const { PORT } = require("./config");

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
