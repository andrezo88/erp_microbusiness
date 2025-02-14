import { LoginController } from "../../controller/login.controller.ts"
import { LoginService } from "../../service/login.service.ts"

const LoginFactory = () => {
    
    const loginService = new LoginService()
    const loginController = new LoginController(loginService)

    return loginController
}

export const loginFactory = LoginFactory()