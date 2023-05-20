import {
  Application,
  Request,
  Response,
  NextFunction,
  urlencoded,
  json,
} from "express";
import { Server } from "http";

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

  private startServer(app: Application): void {}
  private startHttpServer(httpServer: Server): void {}

  private standardMiddleware(app: Application): void {}
  private securityMiddleware(app: Application): void {}
  private routeMiddleware(app: Application): void {}

  private createSocketIO(httpServer: Server): void {}

  private globalErrorHandler(app: Application): void {}
}
