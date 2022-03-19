import { Request, Response } from "express";
import { getNftService } from "../services/nftService";

export const getNftController = async (req: Request, res: Response) => {
  try {
    const response = await getNftService(req.params.mint);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
