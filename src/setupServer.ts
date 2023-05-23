import {
  Application as ExpressApplication,
  Request,
  Response,
  NextFunction,
  urlencoded,
  json,
} from "express";
import "express-async-errors";
import { Server } from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cookieSession from "cookie-session";
import HTTP_STATUS from "http-status-codes";
import { config } from "./config";

export class FakeCompanyServer {
  private app: ExpressApplication;

  constructor(app: ExpressApplication) {
    this.app = app;
  }

  public start(): void {
    this.startServer(this.app);

    this.standardMiddleware(this.app);
    this.securityMiddleware(this.app);
    this.routeMiddleware(this.app);

    this.globalErrorHandler(this.app);
  }

  private async startServer(app: ExpressApplication): Promise<void> {
    try {
      const httpServer: Server = new Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  }
  private startHttpServer(httpServer: Server): void {
    httpServer.listen(config.SERVER_PORT, () => {
      console.log(`Server running on port ${config.SERVER_PORT}`);
    });
  }

  private standardMiddleware(app: ExpressApplication): void {
    app.use(compression());
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true, limit: "50mb" }));
  }
  private securityMiddleware(app: ExpressApplication): void {
    app.use(
      cookieSession({
        name: "session",
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 7 * 24 * 60 * 60 * 1000, // valid for 7 days
        secure: config.NODE_ENV !== "local",
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }
  private routeMiddleware(app: ExpressApplication): void {}

  private createSocketIO(httpServer: Server): void {}

  private globalErrorHandler(app: ExpressApplication): void {}
}
