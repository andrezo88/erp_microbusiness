import { Router } from "express";
import { auth } from "../middleware/auth.middleware.ts";
import { companyFactory } from "./factory/company.factory.ts";

export async function companyRoute(app: Router) {
  const router = Router();

  router.post("/", async (req, res, next) => {
    await companyFactory.createCompany(req, res, next);
  });
  router.get("/", auth, async (req, res, next) => {
    await companyFactory.getAllCompanies(req, res, next);
  });
  router.get("/:id", auth, async (req, res, next) => {
    await companyFactory.getCompanyById(req, res, next);
  });
  router.put("/:id", auth, async (req, res, next) => {
    await companyFactory.updateCompany(req, res, next);
  });
  router.delete("/:id", auth, async (req, res, next) => {
    await companyFactory.deleteCompany(req, res, next);
  });
  return router;
}
