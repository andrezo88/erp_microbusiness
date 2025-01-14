import { Router } from 'express'
import { UserController } from '../controller/user.controller.ts'
import { auth } from '../middleware/auth.middleware.ts'

const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/', userController.createUser)
userRoutes.get('/', auth, userController.getAllUsers)
userRoutes.get('/:id', auth, userController.getUserById)
userRoutes.put('/:id', auth, userController.updateUser)

export { userRoutes }