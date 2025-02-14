import { Router } from "express";
import { productFactory } from "./factory/product.factory.ts";
import { auth } from "../middleware/auth.middleware.ts";

export async function productRoute(app: Router) {
  const router = Router();

  router.get("/", auth, async (req, res, next) => {
    await productFactory.getAllProducts(req, res, next);
  });
  router.post("/", auth, async (req, res, next) => {
    await productFactory.createProduct(req, res, next);
  });
  router.get("/:id", auth, async (req, res, next) => {
    await productFactory.getProductById(req, res, next);
  });
  router.put("/:id", auth, async (req, res, next) => {
    await productFactory.updateProduct(req, res, next);
  });
  router.post("/:id/active", auth, async (req, res, next) => {
    await productFactory.activeProduct(req, res, next);
  });
  router.delete("/:id/delete", auth, async (req, res, next) => {
    await productFactory.deleteProduct(req, res, next);
  });
  router.put("/:id/sync", auth, async (req, res, next) => {
    await productFactory.syncProductToCompany(req, res, next);
  });
  return router;
}
