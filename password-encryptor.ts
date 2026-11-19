import bcrypt from "bcrypt";

export default {
    encrypt: (password: string) =>
        bcrypt.hashSync(password, bcrypt.genSaltSync()),

    verify: (password: string, encrypted: string) =>
        bcrypt.compareSync(password, encrypted),
}