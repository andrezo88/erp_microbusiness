import {
  IUserRequest,
  IUserRequestUpdate,
  IUserResponse,
} from "../model/user/user.interface.ts";
import { encryptPassword } from "../utils/encrypt/password-encrypt.ts";
import { comparePassword } from "../utils/login/login-jwt.ts";
import { IUserRepository } from "../repository/user-interface.repository.ts";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async getAllUsers(): Promise<IUserResponse[]> {
    const users = await this.userRepository.find();
    return users.map((u: any) => ({
      _id: u._id,
      name: u.name,
      email: u.email,
    }));
  }

  async createUser(userEntity: IUserRequest): Promise<void> {
    const { name, email, password } = userEntity;

    const uniqueEmail = await this.userRepository.findByEmail(email);

    if (uniqueEmail) {
      throw new Error("Email já cadastrado");
    }

    const passwordEncrypted = await encryptPassword(password);
    await this.userRepository.create({
      name: name,
      email: email,
      password: passwordEncrypted,
      role: 1050,
    });
  }

  async getUserById(id: string): Promise<IUserResponse> {
    const userFound: IUserResponse = await this.userRepository.findOne(id);

    return {
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    };
  }

  async updateUser(id: string, userEntity: IUserRequestUpdate): Promise<void> {
    const { name, email, password, role } = userEntity;

    const userFound = await this.userRepository.findOneToUpdate(id);

    if (!userFound) {
      throw new Error("Usuário não encontrado");
    }

    if (userEntity.name !== userFound.name) {
      userEntity.name = name;
    }

    if (userEntity.email !== userFound.email) {
      userEntity.email = email;
    }

    if (
      userEntity.password === "" ||
      userEntity.password === undefined ||
      userEntity.password === null
    ) {
      userEntity.password = password as string;
    } else {
      await comparePassword(password, userFound.password as string);
      const newPassword = await encryptPassword(password);
      userEntity.password = newPassword;
    }

    if (userEntity.role !== userFound.role) {
      userEntity.role = role;
    }

    await this.userRepository.update(id, {
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
      role: userEntity.role,
    });
  }
}
