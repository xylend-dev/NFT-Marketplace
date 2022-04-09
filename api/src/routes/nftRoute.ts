import { Router } from "express";
import { postNftLikeValidator } from "../validators/nftValidator";
import {
  getNftController,
  postNftLikeController,
  getNftLikeController,
  getNftLikeCheckController,
} from "../controllers/nftController";
import { validate } from "../validators";

const nftRoute = Router();

nftRoute.get("/nft/token/:mint", getNftController);

nftRoute.get("/nft/like", getNftLikeController);

nftRoute.get("/nft/like/check", getNftLikeCheckController);

nftRoute.post(
  "/nft/like",
  validate(postNftLikeValidator),
  postNftLikeController
);

export default nftRoute;
