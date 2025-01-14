import { Router } from "express"
import { CompanyController } from "../controller/company.controller.ts"

const companyRoutes = Router()

const companyController = new CompanyController()

companyRoutes.post('/', companyController.createCompany)
companyRoutes.get('/', companyController.getAllCompanies)
companyRoutes.get('/:id', companyController.getCompanyById)
companyRoutes.put('/:id', companyController.updateCompany)

export { companyRoutes }