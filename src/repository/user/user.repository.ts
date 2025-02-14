import { IUserRequest, IUserRequestUpdate, IUserResponse } from '../../model/user/user.interface.ts';
import { user } from '../../model/user/user.model.ts';
import { IUserRepository } from '../user-interface.repository.ts';

export class UserRepository implements IUserRepository {

    async create(userRequest: IUserRequest): Promise<void> {
        await user.create({
            name: userRequest.name,
            email: userRequest.email,
            password: userRequest.password,
            role: userRequest.role
        })
    }

    async find(): Promise<IUserResponse[]> {
        const users = await user.find()
        return users.map((u: any) => ({
            _id: u._id,
            name: u.name,
            email: u.email
        }))
    }

    async findOne(id: string): Promise<any> {
        const userFound = await user.findById(id)
        if (!userFound) {
            throw new Error('Usuário nao encontrado')
        }
        return {
            _id: userFound._id,
            name: userFound.name,
            email: userFound.email
        }
    }

    async findOneToUpdate(id: string): Promise<any> {
        const userFound = await user.findById(id)
        if (!userFound) {
            throw new Error('Usuário nao encontrado')
        }
        return {
            _id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            password: userFound.password,
            role: userFound.role
        }
    }

    async update(id: string, user: any): Promise<IUserRequestUpdate> {
        const userUpdated = await user.findByIdAndUpdate(id, user)
        return userUpdated
    }

    async findByEmail(email: string): Promise<any> {
        const userFound = await user.findOne({ email });
        return userFound;
      }
}