import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

interface CustomJwtPayload extends JwtPayload {
 _id?: string;
 email?: string;
 name?: string;
 role?: string;
 document?: string;
 exp: number;
 iat: number;
}

export interface CustomRequest extends Request {
 tokenPayload?: CustomJwtPayload
 user?: {
  _id: string;
  role?: number;
 }
}