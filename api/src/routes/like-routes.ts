import { Router } from "express";

const likeRoutes = Router();

likeRoutes.get("/like", (request, response) =>
  response.json({ message: "OK" })
);

export default likeRoutes;
