import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { user } from '../../model/user/user.model.ts';

export async function comparePasswordLogin(email: string, password: string) {

 const userFound = await user.findOne({ email: email })

 if (!userFound) {
  throw new Error('Usuário não encontrado')
 }

 const isPasswordValid = bcrypt.compareSync(password, userFound.password as string);

 if (!isPasswordValid) {
  throw new Error('Email ou senha inválidos')
 }

 return userFound
}

export async function comparePassword(password: string, password2: string) {

 const isPasswordEquals = bcrypt.compareSync(password, password2);

 if (!isPasswordEquals) {
  return false
 }

 return true
}

export async function createJwtToken(user: any) {
 const token = jwt.sign({
  _id: user._id,
  email: user.email,
  name: user.name,
  role: user.role

 }, process.env.SECRET_JWT as string,
  {
   expiresIn: '1h'
  });

 return { token };
}
