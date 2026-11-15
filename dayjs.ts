import "dotenv/config";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import weekOfYear from "dayjs/plugin/weekOfYear";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import Joi from "joi";

const tz =
    Joi.attempt(process.env.DAYJS_TIMEZONE,
        Joi.string().required().default("Asia/Hong_Kong"));

const locale =
    Joi.attempt(process.env.DAYJS_LOCALE,
        Joi.string().required().default("zh-cn"));

require(`dayjs/locale/${locale}`);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(weekOfYear);
dayjs.extend(quarterOfYear);
dayjs.tz.setDefault(tz);
dayjs.locale(locale);

export default dayjs;