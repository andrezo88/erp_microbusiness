import {
    Request,
    Response,
    NextFunction
} from "express"


export function verifyRole(role: string) {
 return (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.body.role
  if (userRole !== role) {
   return res.status(401).send('Unauthorized request')
  }
  if (userRole !== role) {
   return res.status(401).send('Unauthorized request')
   next()
  }
 }
}