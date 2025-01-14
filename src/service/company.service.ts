import { ICompanyRequest, ICompanyResponse } from "../model/company/company.interface.ts";
import { company } from "../model/company/company.model.ts";
import { encryptPassword } from "../utils/encrypt/password-encrypt.ts";
import { comparePassword } from "../utils/login/login-jwt.ts";

export class CompanyService {

 async getAllCompanies() {
  const companies = await company.find()
  return companies.map((c: any) => ({
   _id: c._id,
   name: c.name,
   email: c.email,
   document: c.document,
   user: c.user
  }));
 }

 async createCompany(companyEntity: ICompanyRequest, userId: string): Promise<void> {
  const { name, email, password, document } = companyEntity

  const uniqueEmail = await company.findOne({ email: email })
  const uniqueDocument = await company.findOne({ document: document })

  if (uniqueEmail) {
   throw new Error('Email já cadastrado')
  }

  if (uniqueDocument) {
   throw new Error('Documento já cadastrado')
  }

  const passwordEncrypted = await encryptPassword(password)

  const newCompany = await company.create({
   name: name,
   email: email,
   password: passwordEncrypted,
   document: document,
   user: userId
  });
 }

 async getCompanyById(id: string): Promise<ICompanyResponse> {
  const companyFound = await company.findById(id) as ICompanyResponse;

  if (!companyFound) {
   throw new Error('Empresa não encontrada')
  }

  return {
   _id: companyFound._id,
   name: companyFound.name,
   email: companyFound.email,
   document: companyFound.document,
   user: companyFound.user
  };
 }

 async getCompanyByDocument(document: string): Promise<ICompanyResponse> {
  const companyFound = await company.findOne({ document: document }) as ICompanyResponse;

  if (!companyFound) {
   throw new Error('Empresa não encontrada')
  }

  return {
   _id: companyFound._id,
   name: companyFound.name,
   email: companyFound.email,
   document: companyFound.document,
   user: companyFound.user
  };
 }

 async updateCompany(id: string, companyEntity: ICompanyRequest): Promise<void> {
  const { name, email, password, document } = companyEntity

  const companyFound = await company.findById(id)

  if (!companyFound) {
   throw new Error('Empresa não encontrada')
  }

  if (companyEntity.name !== companyFound.name) {
   companyEntity.name = name;
  }

  if (companyEntity.email !== companyFound.email) {
   companyEntity.email = email;
  }

  if (companyEntity.password === "" || companyEntity.password === undefined || companyEntity.password === null) {
   companyEntity.password = password as string;
  } else {
   await comparePassword(password, companyFound.password as string)
   const newPassword = await encryptPassword(password)
   companyEntity.password = newPassword;
  }

  if (companyEntity.document !== companyFound.document) {
   companyEntity.document = document;
  }

  await company.findByIdAndUpdate(
   id,
   {
    name: companyEntity.name,
    email: companyEntity.email,
    password: companyEntity.password,
    document: companyEntity.document
   }
  );
 }

}