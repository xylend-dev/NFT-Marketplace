import { Express } from "express";
import newNftRoute from "./newNftRoute";
import nftRoute from "./nftRoute";

const setBaseRouter = (app: Express): void => {
  app.use("/", [nftRoute, newNftRoute]);
};

export default setBaseRouter;
