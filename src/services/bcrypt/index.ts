import bcrypt from "bcryptjs";

export const getBcryptedPassword = (password: string): string => {
    return bcrypt.hashSync(password, 8);
};

export const isPasswordValid = (passwordToCompare: string, compareWith: string): boolean =>
    bcrypt.compareSync(passwordToCompare, compareWith);