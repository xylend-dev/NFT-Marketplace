import { Router } from "express";
import { postNftLikeValidator } from "../validators/nftValidator";
import {
  getNftController,
  postNftLikeController,
} from "../controllers/nftController";
import { validate } from "../validators";

const nftRoute = Router();

nftRoute.get("/nft/:mint", getNftController);
nftRoute.post("/nft/like", validate(postNftLikeValidator), postNftLikeController);

export default nftRoute;
