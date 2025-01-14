import { connect } from "mongoose";
import logger from "./logger.ts"; // Adjust the path as necessary


export class DbConnection {
 public static async connect(): Promise<void> {
  if (!process.env.MONGO_URI) {
   throw new Error("MONGO_URI is not defined in the environment variables");
  }
  const connectionDb = await connect(process.env.MONGO_URI);
  logger.info(`Connected to database ${connectionDb.connection.name}`)
 }
}