const logger = require("electron-log");
const { logsPath } = require("./Archive");

// Sobrescreve o path padrao onde os logs sao
// armazenados do modulo electron-log
logger.transports.file.resolvePath = (variables) => {
  return `${logsPath}/${variables.fileName}`;
};

module.exports = { logger };
