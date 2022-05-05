import { NextFunction, Request, Response } from "express";
import {
  findAllParty,
  findPartyById,
  createParty,
} from "../services/party.service";
import { CreatePartyInput } from "../schema/party.schema";

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

export const getPartyByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const party = await findPartyById(id);
    res.status(200).json(party);
  } catch (err: any) {
    next(err);
  }
};

export const createPartyHandler = async (
  req: Request<{}, {}, CreatePartyInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const party = await createParty({
      name: req.body.name,
      organizer: user.email,
      date: req.body.date,
      description: req.body.description,
      image: req.body.image,
      amount: req.body.amount,
    });

    res.status(201).json(party);
  } catch (err: any) {
    next(err);
  }
};
