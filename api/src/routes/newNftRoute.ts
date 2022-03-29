import { Router } from "express";
import { postNewNftValidator } from "../validators/newNftValidator";
import {
  getNewNftController,
  postNewNftController,
} from "../controllers/newNftController";
import { validate } from "../validators";

const newNftRoute = Router();

newNftRoute.get("/nft/create", getNewNftController);

newNftRoute.post(
  "/nft/create",
  validate(postNewNftValidator),
  postNewNftController
);

export default newNftRoute;
