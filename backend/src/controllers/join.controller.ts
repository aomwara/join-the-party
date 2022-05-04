import e, { NextFunction, Request, Response } from "express";
import { joinParty, checkJoin, getMeJoin } from "../services/join.service";
import { joinInput } from "../schema/join.schema";

export const joinHandler = async (
  req: Request<{}, {}, joinInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const userID: string = user._id.toString();

    const check = await checkJoin({
      partyID: req.body.partyID,
      userID: userID,
    });

    if (!check) {
      const join = await joinParty({
        partyID: req.body.partyID,
        userID: userID,
      });
      res.status(201).json({
        status: "success",
        data: join,
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "You have already joined this party",
      });
    }
  } catch (err: any) {
    next(err);
  }
};

export const getMeJoinHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    const userID: string = user._id.toString();

    const parties = await getMeJoin({
      userID: userID,
    });
    res.status(200).json({
      status: "success",
      data: parties,
    });
  } catch (err: any) {
    next(err);
  }
};
