import { Request, Response } from "express";
import { getNewNftService, postNewNftService } from "../services/newNftService";

export const getNewNftController = async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 12;
    const response = await getNewNftService(limit);
    return res.status(200).json(response);
  } catch (error) {
    return res
      .status(400)
      .json([
        { errors: [{ msg: "Não foi possível recuperar detalhes do NFT" }] },
      ]);
  }
};

export const postNewNftController = async (req: Request, res: Response) => {
  try {
    const response = await postNewNftService(req.body.mint);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({
      errors: [{ msg: "Erro inesperado ao adicionar a curtida do NFT" }],
    });
  }
};
