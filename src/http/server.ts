import express, { NextFunction, Request, Response } from 'express'
import { DbConnection } from '../config/db-connection.ts'
import logger from '../config/logger.ts'
import { router } from '../router/index.ts'
import { errorMiddleware, notFoundMiddleware } from '../middleware/error.middleware.ts'

export class Server {
 public static async start(): Promise<void> {
  DbConnection.connect()
  let app = express()

  app.use(
   express.json(),
  )

  app.use('/', router)
  app.use(errorMiddleware);
  app.use("*", notFoundMiddleware);

  app.listen(process.env.PORT || 3000, () => {
   logger.info(`Server is running on port ${process.env.PORT}`)
  })
 }
}