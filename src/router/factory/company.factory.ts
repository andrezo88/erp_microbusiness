import { CompanyController } from "../../controller/company.controller.ts"
import { CompanyRepository } from "../../repository/company/company.repository.ts"
import { CompanyService } from "../../service/company.service.ts"

const CompanyFactory = () => {
    
    const companyRepository = new CompanyRepository()
    const companyService = new CompanyService(companyRepository)
    const companyController = new CompanyController(companyService)
    return companyController
}

export const companyFactory = CompanyFactory()