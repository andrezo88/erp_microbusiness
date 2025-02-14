import {
  ICompanyRequest,
  ICompanyRequestUpdate,
  ICompanyResponse,
} from "../../model/company/company.interface.ts";
import { company } from "../../model/company/company.model.ts";
import { ICompanyRepository } from "../company-interface.repository.ts";

export class CompanyRepository implements ICompanyRepository {
  async create(companyEntity: ICompanyRequest): Promise<void> {
    await company.create({
      name: companyEntity.name,
      email: companyEntity.email,
      password: companyEntity.password,
      document: companyEntity.document,
    });
  }

  async find(): Promise<ICompanyResponse[]> {
    const companies = (await company.find({
      isActive: true,
    })) as ICompanyResponse[];
    return companies.map((c: any) => ({
      _id: c._id,
      name: c.name,
      email: c.email,
      document: c.document,
      user: c.user,
    }));
  }

  async findById(id: string): Promise<ICompanyResponse> {
    const companyFound = (await company.findById({
      _id: id,
      isActive: true,
    })) as ICompanyResponse;
    if (!companyFound) {
      throw new Error("Empresa não encontrada");
    }
    return companyFound;
  }

  async findByEmail(email: string): Promise<ICompanyResponse> {
    const companyFound = (await company.findOne({
      email: email,
      isActive: true,
    })) as ICompanyResponse;
    if (!companyFound) {
      throw new Error("Empresa nao encontrada");
    }
    return companyFound;
  }

  async findOneToUpdate(id: string): Promise<ICompanyRequestUpdate> {
    const companyFound = (await company.findById(id)) as ICompanyRequestUpdate;
    if (!companyFound) {
      throw new Error("Empresa nao encontrada");
    }
    return companyFound;
  }

  async findByIdAndUpdate(id: string, companyEntity: ICompanyRequest) {
    const companyFound = await company.findById(id);
    if (!companyFound) {
      throw new Error("Empresa nao encontrada");
    }
    await company.updateOne({ _id: id }, { $set: companyEntity });
  }

  async delete(id: string) {
    const companyFound = await company.findById(id);
    if (!companyFound) {
      throw new Error("Empresa nao encontrada");
    }
    await company.updateOne({ _id: id }, { $set: { isActive: false } });
  }
}
