import { Express } from "express";
import nftRoute from "./nftRoute";

const setBaseRouter = (app: Express): void => {
  app.use("/", [nftRoute]);
};

export default setBaseRouter;
