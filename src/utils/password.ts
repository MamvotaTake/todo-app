import bcrypt from 'bcryptjs';

export class Password {
/**
 * To hash user password
 * @param {string} password
 * @returns {Promise<string>} - promise result with hashed user passsword
 */
    static async toHash(password: string) {
        return await bcrypt.hash(password, 12)
    }

/**
 * Compare user password
 * @param {string} candidatePassword
 * @param {string} userPassword
 * @returns {Promise<string>}
 */
    static correctPassword = async function(candidatePassword: string, userPassword: string) {
        return await bcrypt.compare(candidatePassword, userPassword)
    }

}