import { Router } from "express";
import { postNftLikeValidator } from "../validators/nftValidator";
import {
  getNftController,
  postNftLikeController,
  getNftLikeController,
} from "../controllers/nftController";
import { validate } from "../validators";

const nftRoute = Router();

nftRoute.get("/nft/token/:mint", getNftController);

nftRoute.get("/nft/like", getNftLikeController);

nftRoute.post(
  "/nft/like",
  validate(postNftLikeValidator),
  postNftLikeController
);

export default nftRoute;
