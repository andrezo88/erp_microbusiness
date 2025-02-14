import { IUserRequest, IUserResponse, IUserResponseUpdate } from "../model/user/user.interface.ts";

export abstract class IUserRepository {
    abstract create(user: IUserRequest): Promise<void>
    abstract find(): Promise<IUserResponse[]>
    abstract findOne(id: string): Promise<IUserResponse>
    abstract update(id: string, user: any): Promise<any>
    abstract findOneToUpdate(id: string): Promise<IUserResponseUpdate>
    abstract findByEmail(email: string): Promise<any>
}