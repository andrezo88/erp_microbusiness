import { comparePasswordLogin, createJwtToken } from "../utils/login/login-jwt.ts"

export class LoginService {
    async login(user: any): Promise<string> {
        const { email, password } = user;

        const userFound = await comparePasswordLogin(email, password);

        if (!userFound) {
            throw new Error('Email ou senha inválidos');
        }

        const token = await createJwtToken(userFound);

        return token.token
    }
}