import express, { Express } from "express";
import { userRoute } from "./user.routes.ts";
import { loginRoute } from "./login.routes.ts";
import { companyRoute } from "./company.routes.ts";
import { productRoute } from "./product.routes.ts";
import { stockRoute } from "./stock.routes.ts";
import { errorMiddleware } from "../middleware/error.middleware.ts";
import { orderRoute } from "./order.routes.ts";

export class App {
  public readonly server: Express;

  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.initializeRoutes();
  }

  private async initializeRoutes() {
    const userRouter = await userRoute(this.server);
    this.server.use("/user", userRouter);
    const loginRouter = await loginRoute(this.server);
    this.server.use("/login", loginRouter);
    const companyRouter = await companyRoute(this.server);
    this.server.use("/company", companyRouter);
    const productRouter = await productRoute(this.server);
    this.server.use("/product", productRouter);
    const stockRouter = await stockRoute(this.server);
    this.server.use("/stock", stockRouter);
    const orderRouter = await orderRoute(this.server);
    this.server.use("/order", orderRouter);

    this.server.use(errorMiddleware);
  }
}
