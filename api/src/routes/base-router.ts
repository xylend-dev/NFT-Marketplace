import { Express } from "express";
import likeRoutes from "./like-routes";

const setBaseRouter = (app: Express): void => {
  app.use("/", [likeRoutes]);
};

export default setBaseRouter;
