import bcrypt from 'bcrypt'

export async function encryptPassword(password: string): Promise<string> {
 const salt = bcrypt.genSaltSync(10)
 const hash = bcrypt.hashSync(password, salt)
 return hash
}