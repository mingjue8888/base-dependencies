import bcrypt from "bcrypt";

export default {
    encrypt: (password: string): string =>
        bcrypt.hashSync(password, bcrypt.genSaltSync()),

    verify: (password: string, encrypted: string): boolean =>
        bcrypt.compareSync(password, encrypted),
}