import "dotenv/config";
import Joi from "joi";
import winston from "winston";
import dayjs from "../dayjs";

const LOGGER_LEVEL =
    Joi.attempt(process.env.LOGGER_LEVEL,
        Joi.string().required().default("debug"));

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
}

const consoleLog = new winston.transports.Console({
    level: LOGGER_LEVEL,
    format: winston.format.combine(
        winston.format.colorize({ colors }),
        winston.format.align(),
        winston.format.printf(log => `${log.timestamp} ${log.level}: ${log.stack || log.message}`),
    )
});

export default winston.createLogger({
    levels,
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.timestamp({ format: () => dayjs().tz().toISOString() }),
    ),
    transports: [
        consoleLog,
    ]
});

