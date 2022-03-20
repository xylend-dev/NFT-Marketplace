import { Request, Response } from "express";
import { getNftService, postNftLikeService } from "../services/nftService";

export const getNftController = async (req: Request, res: Response) => {
  try {
    const response = await getNftService(req.params.mint);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(400)
      .json([
        { errors: [{ msg: "Não foi possível recuperar detalhes do NFT" }] },
      ]);
  }
};

export const postNftLikeController = async (req: Request, res: Response) => {
  try {
    const response = await postNftLikeService(
      req.body.mint,
      req.body.walletAddress
    );
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({
      errors: [{ msg: "Error inesperado ao adicionar a curtida do NFT" }],
    });
  }
};
