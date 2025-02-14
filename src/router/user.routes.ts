import { Router } from "express"
import { auth } from "../middleware/auth.middleware.ts"
import { userFactory } from "./factory/user.factory.ts"

export async function userRoute(app: Router) {
  const router = Router()
  router.post("/", async (req, res, next) => {
    await userFactory.createUser(req, res, next)
  })
  router.get("/", auth, async (req, res, next) => {
    await userFactory.getAllUsers(req, res, next)
  })
  router.get("/:id", auth, async (req, res, next) => {
    await userFactory.getUserById(req, res, next)
  })
  router.put("/:id", auth, async (req, res, next) => {
    await userFactory.updateUser(req, res, next)
  })
  return router
}