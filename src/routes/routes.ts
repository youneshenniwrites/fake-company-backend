import { Application } from "express";

export function applicationRoutes(app: Application) {
  const routes = () => {
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
  };
  routes();
}
