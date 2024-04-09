const app = require("./app");
const Logger = require("./utils/logger");

const { PORT } = require("./config/app");

const server = app.listen(PORT, function () {
  Logger.info(`app running on ${PORT}`);
});

server.keepAliveTimeout = 30000;
server.headersTimeout = (60 * 1000) + 2000;


module.exports = server;