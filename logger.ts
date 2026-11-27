import "dotenv/config";
import color from "console-log-colors";
import Joi from "joi";
import winston from "winston";
import dayjs from "./dayjs";

const confSchema = Joi.object<{
    LOGGER_LEVEL: string;
}>({
    LOGGER_LEVEL: Joi.string()
        .default("debug"),
})

const conf = Joi.attempt(process.env, confSchema, { allowUnknown: true });

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const colors = {
    error: color.red,
    warn: color.yellow,
    info: color.green,
    http: color.magenta,
    debug: color.blue,
}

const consoleLog = new winston.transports.Console({
    level: conf.LOGGER_LEVEL,
    format: winston.format.combine(
        // winston.format.colorize({ colors }),
        // winston.format.align(),
        winston.format.printf(({ timestamp, level, message, stack }) =>
            `${color.gray(timestamp)} ` +
            `${(colors[level] || color.white)(level.toUpperCase().padEnd(5, " "))}: ` +
            `${stack || message}`),
    )
});

const logger = winston.createLogger({
    levels,
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.timestamp({ format: () => dayjs().tz().format() }),
    ),
    transports: [
        consoleLog,
    ]
});

export default logger;

