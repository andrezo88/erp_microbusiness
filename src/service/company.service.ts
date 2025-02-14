import {
  ICompanyRequest,
  ICompanyResponse,
} from "../model/company/company.interface.ts";
import { CompanyRepository } from "../repository/company/company.repository.ts";
import { encryptPassword } from "../utils/encrypt/password-encrypt.ts";
import { comparePassword } from "../utils/login/login-jwt.ts";

export class CompanyService {
  constructor(private companyRepository = new CompanyRepository()) {}

  async getAllCompanies() {
    const companies = await this.companyRepository.find();
    return companies;
  }

  async createCompany(
    companyEntity: ICompanyRequest,
    userId: string
  ): Promise<void> {
    const { name, email, password, document } = companyEntity;

    const uniqueEmail = await this.companyRepository.findByEmail(email);
    const uniqueDocument = await this.companyRepository.findByEmail(document);

    if (uniqueEmail) {
      throw new Error("Email já cadastrado");
    }

    if (uniqueDocument) {
      throw new Error("Documento já cadastrado");
    }

    const passwordEncrypted = await encryptPassword(password);

    const newCompany = await this.companyRepository.create({
      name: name,
      email: email,
      password: passwordEncrypted,
      document: document,
      user: userId,
    });
  }

  async getCompanyById(id: string): Promise<ICompanyResponse> {
    const companyFound = await this.companyRepository.findById(id);

    if (!companyFound) {
      throw new Error("Empresa não encontrada");
    }

    return {
      _id: companyFound._id,
      name: companyFound.name,
      email: companyFound.email,
      document: companyFound.document,
      user: companyFound.user,
    };
  }

  async getCompanyByDocument(document: string): Promise<ICompanyResponse> {
    const companyFound = await this.companyRepository.findById(document);

    if (!companyFound) {
      throw new Error("Empresa não encontrada");
    }

    return {
      _id: companyFound._id,
      name: companyFound.name,
      email: companyFound.email,
      document: companyFound.document,
      user: companyFound.user,
    };
  }

  async updateCompany(
    id: string,
    companyEntity: ICompanyRequest
  ): Promise<void> {
    const { name, email, password, document } = companyEntity;

    const companyFound = await this.companyRepository.findOneToUpdate(id);

    if (!companyFound) {
      throw new Error("Empresa não encontrada");
    }

    if (companyEntity.name !== companyFound.name) {
      companyEntity.name = name;
    }

    if (companyEntity.email !== companyFound.email) {
      companyEntity.email = email;
    }

    if (
      companyEntity.password === "" ||
      companyEntity.password === undefined ||
      companyEntity.password === null
    ) {
      companyEntity.password = password as string;
    } else {
      await comparePassword(password, companyFound.password as string);
      const newPassword = await encryptPassword(password);
      companyEntity.password = newPassword;
    }

    if (companyEntity.document !== companyFound.document) {
      companyEntity.document = document;
    }

    await this.companyRepository.findByIdAndUpdate(id, {
      name: companyEntity.name,
      email: companyEntity.email,
      password: companyEntity.password,
      document: companyEntity.document,
      user: companyEntity.user,
    });
  }
  async deleteCompany(id: string): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
