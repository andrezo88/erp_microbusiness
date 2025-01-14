import { Router } from "express";
import { LoginController } from "../controller/login.controller.ts";


const loginRoutes = Router();

const loginController = new LoginController();

loginRoutes.post('/', loginController.login)

export { loginRoutes }