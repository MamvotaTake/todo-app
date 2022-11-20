import bcrypt from "bcrypt";

export class Password {
    static async toHash(password: string) {
        const salt = bcrypt.genSaltSync(10)

        const hash = await bcrypt.hashSync(password, salt);

        return `${hash}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.')

        const hash = await bcrypt.hashSync(suppliedPassword, salt)

        return hash === hashedPassword;
    }

}