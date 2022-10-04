import validator from "validator";
import toInt = validator.toInt;

export default {
    port: toInt(process.env.EMAIL_PORT),
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
};