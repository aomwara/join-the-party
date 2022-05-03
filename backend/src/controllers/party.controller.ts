import { NextFunction, Request, Response } from "express";
import { findAllParty } from "../services/party.service";

export const getAllPartyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const party = await findAllParty();
    res.status(200).json({
      status: "success",
      result: party.length,
      data: {
        party,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
