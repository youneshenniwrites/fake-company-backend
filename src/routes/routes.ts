import { Application } from 'express';
import { authRoutes } from '@auth/routes/authRoutes';
import { config } from '@root/config/setupConfig';

export function applicationRoutes(expressApp: Application) {
  const registerRoutes = () => {
    expressApp.use(config.BASE_PATH, authRoutes.getRoutes());
  };
  registerRoutes();
}

// app.use("/test", serverAdapter.getRouter());
// app.use("", healthRoutes.health());
// app.use("", healthRoutes.env());
// app.use("", healthRoutes.instance());
// app.use("", healthRoutes.fiboRoutes());
// app.use(BASE_PATH, authRoutes.routes());
// app.use(BASE_PATH, authRoutes.signoutRoute());
// app.use(BASE_PATH, authMiddleware.verifyUser, currentUserRoutes.routes());
// app.use(BASE_PATH, authMiddleware.verifyUser, postRoutes.routes());
// app.use(BASE_PATH, authMiddleware.verifyUser, reactionRoutes.routes());
// app.use(BASE_PATH, authMiddleware.verifyUser, commentRoutes.routes());
// app.use(BASE_PATH, authMiddleware.verifyUser, followerRoutes.routes());
// app.use(BASE_PATH, authMiddleware.verifyUser, notificationRoutes.routes());
// app.use(BASE_PATH, authMiddleware.verifyUser, imageRoutes.routes());
// app.use(BASE_PATH, authMiddleware.verifyUser, chatRoutes.routes());
// app.use(BASE_PATH, authMiddleware.verifyUser, userRoutes.routes());
