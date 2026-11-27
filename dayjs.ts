import "dotenv/config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import weekOfYear from "dayjs/plugin/weekOfYear";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import Joi from "joi";

const confSchema = Joi.object<{
    DAYJS_TIMEZONE: string;
    DAYJS_LOCALE: string;
}>({
    DAYJS_TIMEZONE: Joi.string()
        .default("Asia/Hong_Kong"),

    DAYJS_LOCALE: Joi.string()
        .default("zh-cn"),
})

const conf = Joi.attempt(process.env, confSchema, { allowUnknown: true });

require(`dayjs/locale/${conf.DAYJS_LOCALE}`);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.tz.setDefault(conf.DAYJS_TIMEZONE);
dayjs.locale(conf.DAYJS_LOCALE);

export default dayjs;