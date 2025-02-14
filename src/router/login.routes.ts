import { Router } from "express"
import { loginFactory } from "./factory/login.factory.ts"
import { CustomRequest } from "../middleware/auth.middleware.ts"

export async function loginRoute(app: Router) {

  const router = Router()
  
  router.post("/", async (req, res, next) => {
    await loginFactory.login(req as CustomRequest, res, next)
  });
  return router
  
}