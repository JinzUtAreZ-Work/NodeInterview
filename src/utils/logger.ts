import pino from "pino";
import moment from "moment";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () =>
    `,"timestamp":"${moment().format("MMMM Do YYYY, h:mm:ss a")}"`,
});
// remove all except timestamp shows logs per action
export default logger;
