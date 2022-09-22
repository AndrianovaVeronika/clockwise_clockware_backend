import config from "../../config/auth.config";
import jwt from "jsonwebtoken";

export const generateToken = (userId: number) => jwt.sign({id: userId}, config.secret, {
    expiresIn: 86400 // 24 hours
});

export const verifyToken = (token: string): string => {
    jwt.verify(token, config.secret, async (err: Error) => {
            return !err;
        }
    );
    return undefined;
};