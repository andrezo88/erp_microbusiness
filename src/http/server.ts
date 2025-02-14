import { DbConnection } from "../config/db-connection.ts";
import { App } from "../router/index.ts";

export class Server {
  public static async start(): Promise<void> {
    DbConnection.connect();
    const port = process.env.PORT || 3000;

    const app = new App();

    app.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
