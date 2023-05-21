import {
  Application,
  Request,
  Response,
  NextFunction,
  urlencoded,
  json,
} from "express";
import { Server } from "http";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import compression from "compression";
import cookieSession from "cookie-session";
import HTTP_STATUS from "http-status-codes";
import "express-async-errors";

const SERVER_PORT = 5000;

export class FakeCompanyServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.startServer(this.app);

    this.standardMiddleware(this.app);
    this.securityMiddleware(this.app);
    this.routeMiddleware(this.app);

    this.globalErrorHandler(this.app);
  }

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: Server = new Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  }
  private startHttpServer(httpServer: Server): void {
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
    });
  }

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: "50mb" }));
    app.use(urlencoded({ extended: true, limit: "50mb" }));
  }
  private securityMiddleware(app: Application): void {
    app.use(
      cookieSession({
        name: "session",
        keys: ["younes", "henni"],
        maxAge: 7 * 24 * 60 * 60 * 1000, // valid for 7 days
        secure: false,
      })
    );
    app.use(hpp());
    app.use(helmet());
    app.use(
      cors({
        origin: "*",
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }
  private routeMiddleware(app: Application): void {}

  private createSocketIO(httpServer: Server): void {}

  private globalErrorHandler(app: Application): void {}
}
