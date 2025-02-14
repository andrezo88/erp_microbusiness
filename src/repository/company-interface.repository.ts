import { ICompanyRequest, ICompanyResponse } from "../model/company/company.interface.ts";

export abstract class ICompanyRepository {
    abstract create(user: ICompanyRequest): Promise<void>
    abstract findById(id: string): Promise<ICompanyResponse>
    abstract findByEmail(email: string): Promise<ICompanyResponse>
    abstract findOneToUpdate(id: string): Promise<any>
    abstract findByIdAndUpdate(id: string, user: ICompanyRequest): Promise<void>
    abstract delete(id: string): Promise<void>
}