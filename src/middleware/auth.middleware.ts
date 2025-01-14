import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../config/logger.ts';

export interface CustomRequest extends Request {
 user?: any
 token: string | JwtPayload
}

export async function auth(req: Request, res: Response, next: NextFunction): Promise<any> {
 try {
  const { authorization } = req.headers
  if (!authorization) {
   throw new Error('Não autorizado')
  }

  const token = authorization.split(' ')[1]

  jwt.verify(token, process.env.SECRET_JWT ?? '') as JwtPayload
  const decoded = jwt.decode(token) as JwtPayload
  (req as CustomRequest).user = { ...decoded }

  next()
 } catch (error) {
  logger.info(error)
  if (error instanceof jwt.JsonWebTokenError) {
   return res.status(401).send('Invalid token');
  }
  if (error instanceof jwt.TokenExpiredError) {
   return res.status(401).send('Token expired');
  }
  return res.status(401).send('User Not authorized');
 }
}