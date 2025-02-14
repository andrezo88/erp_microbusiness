import { Server } from "./src/http/server.js"
import * as dotenv from 'dotenv'

dotenv.config()

Server.start()