import { Router } from "express";
import { getNftController } from "../controllers/nftController";

const nftRoute = Router();

nftRoute.get("/nft/:mint", getNftController);

export default nftRoute;
