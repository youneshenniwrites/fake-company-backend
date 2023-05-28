import { Application as ExpressApplication, Request, Response, NextFunction, urlencoded, json } from 'express';
import 'express-async-errors';
import Logger from 'bunyan';
import { Server as HTTPServer } from 'http';
import { Server as WebSocketServer } from 'socket.io';
import { createClient as createRedisClient } from 'redis';
import { createAdapter as createRedisAdapter } from '@socket.io/redis-adapter';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import HTTP_STATUS from 'http-status-codes';
import { CustomError, IErrorResponse } from '@global/helpers/handleErrors';
import { applicationRoutes } from '@root/routes/routes';
import { config } from '@root/config/setupConfig';

export class FakeCompanyServer {
  private readonly expressApp: ExpressApplication;
  private readonly logger: Logger;

  constructor(expressApp: ExpressApplication) {
    this.expressApp = expressApp;
    this.logger = config.createLogger('FAKE COMPANY SERVER >>>');
  }

  public start(): void {
    this.startServer(this.expressApp);

    this.standardMiddleware(this.expressApp);
    this.securityMiddleware(this.expressApp);
    this.routeMiddleware(this.expressApp);

    this.globalErrorHandler(this.expressApp);
  }

  private async startServer(expressApp: ExpressApplication) {
    try {
      const httpServer = new HTTPServer(expressApp);
      const websocketServer = await this.createWebSocket(httpServer);
      this.startHttpServer(httpServer);
      this.establishWebSocketConnections(websocketServer);
    } catch (error) {
      this.logger.error(error);
    }
  }

  private startHttpServer(httpServer: HTTPServer) {
    this.logger.info(`Server started with process ${process.pid}`);
    httpServer.listen(config.SERVER_PORT, () => {
      this.logger.info(`Server running on port ${config.SERVER_PORT}`);
    });
  }

  private async createWebSocket(httpServer: HTTPServer): Promise<WebSocketServer> {
    const websocket = new WebSocketServer(httpServer, {
      cors: {
        origin: config.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      }
    });

    const redisPublishingClient = createRedisClient({ url: config.REDIS_HOST });
    const redisSubscriptionClient = redisPublishingClient.duplicate();
    await Promise.all([redisPublishingClient.connect(), redisSubscriptionClient.connect()]);

    websocket.adapter(createRedisAdapter(redisPublishingClient, redisSubscriptionClient));

    return websocket;
  }

  private establishWebSocketConnections(_websocket: WebSocketServer) {
    // TODO
  }

  private standardMiddleware(expressApp: ExpressApplication) {
    expressApp.use(compression());
    expressApp.use(json({ limit: '50mb' }));
    expressApp.use(urlencoded({ extended: true, limit: '50mb' }));
  }
  private securityMiddleware(expressApp: ExpressApplication) {
    expressApp.use(
      cookieSession({
        name: 'session',
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 7 * 24 * 60 * 60 * 1000, // valid for 7 days
        secure: config.NODE_ENV !== 'local'
      })
    );
    expressApp.use(hpp());
    expressApp.use(helmet());
    expressApp.use(
      cors({
        origin: config.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
  }

  private routeMiddleware(expressApp: ExpressApplication) {
    applicationRoutes(expressApp);
  }

  private globalErrorHandler(expressApp: ExpressApplication) {
    //* This is to handle URLs that do not exist
    expressApp.all('*', (req: Request, res: Response) => {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: `${req.originalUrl} not found` });
    });

    expressApp.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
      this.logger.error(error);
      if (error instanceof CustomError) {
        return res.status(error.statusCode).json(error.serialiseErrors());
      }
      next();
    });
  }
}
