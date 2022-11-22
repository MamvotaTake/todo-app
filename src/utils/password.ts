import bcrypt from 'bcryptjs';

export class Password {
    static async toHash(password: string) {
        return await bcrypt.hash(password, 12)
    }

    static correctPassword = async function(candidatePassword: string, userPassword: string) {
        return await bcrypt.compare(candidatePassword, userPassword)
    }

}