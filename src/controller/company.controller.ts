import { errorHandler } from "../utils/error-handler.ts";
import { CompanyService } from "../service/company.service.ts";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../model/custom-request/express.model.ts";
import httpStatus from "http-status";
import { ICompanyRequest } from "../model/company/company.interface.ts";
import { schemaCreateCompany } from "../schema/company.schema.ts";
import { HttpException } from "../utils/Http-exception.ts";

const companyService = new CompanyService();

export class CompanyController {

    constructor(
        private companyService: CompanyService = new CompanyService()
    ) { }
 async getAllCompanies(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ): Promise<void> {
  try {
   const companies = await this.companyService.getAllCompanies();
   res.status(httpStatus.OK).json(companies);
  } catch (error) {
   next(errorHandler("getAllCompanies", error));
  }
 }

 async createCompany(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {

   const company: ICompanyRequest = req.body

   const userId = req.user?._id as string
   const userRole = req.user?.role

   if (userRole != 3050) {
    throw new HttpException(
     httpStatus.FORBIDDEN,
     "Usuário não autorizado"
    );
   }

   const { value, error } = schemaCreateCompany.validate(company);

   if (error) {
    throw new HttpException(
     httpStatus.UNPROCESSABLE_ENTITY,
     error.details[0].message
    );
   }

   const createdCompany = await this.companyService.createCompany(value, userId);
   res.status(httpStatus.CREATED).json(createdCompany);
  } catch (error) {
   return next(errorHandler("createCompany", error));
  }
 }

 async getCompanyById(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {
   const { id } = req.params;
   const company = await this.companyService.getCompanyById(id);
   res.status(httpStatus.OK).json(company);
  } catch (error) {
   return next(errorHandler("getCompanyById", error));
  }
 }

 async updateCompany(
  req: CustomRequest,
  res: Response,
  next: NextFunction
 ) {
  try {
   const { id } = req.params;
   const company: ICompanyRequest = req.body;
   const { value, error } = schemaCreateCompany.validate(company);

   if (error) {
    throw new HttpException(
     httpStatus.UNPROCESSABLE_ENTITY,
     error.details[0].message
    );
   }

   await this.companyService.updateCompany(id, value);
   res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
   return next(errorHandler("updateCompany", error));
  }
 }
}
