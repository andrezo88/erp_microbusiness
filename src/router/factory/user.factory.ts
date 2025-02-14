import { UserController } from "../../controller/user.controller.ts"
import { UserRepository } from "../../repository/user/user.repository.ts"
import { UserService } from "../../service/user.service.ts"

const UserFactory = () => {
    
    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)
    const userController = new UserController(userService)
    return userController
}

export const userFactory = UserFactory()