import joinModel, { Join } from "../models/join.model";
import partyModel, { Party } from "../models/party.model";
import { Types } from "mongoose";

import { omit } from "lodash";

// Join party service
export const joinParty = async (input: Join) => {
  const join = await joinModel.create(input);
  const party: Party | null = await partyModel.findById(input.partyID);
  if (party) {
    await partyModel.findByIdAndUpdate(input.partyID, {
      amount: party.amount - 1,
    });
  }

  return omit(join.toJSON());
};

// Join check service
export const checkJoin = async (input: Join) => {
  const join = await joinModel.findOne({
    partyID: input.partyID,
    userID: input.userID,
  });

  const party: Party | null = await partyModel.findById(input.partyID);
  if (party?.amount === 0) {
    return null;
  }

  return join;
};

// get party join by me
export const getMeJoin = async (input: Partial<Join>) => {
  const join = await joinModel.find({
    userID: input.userID,
  });

  var parties: Party[] = [];
  if (join.length > 0) {
    for (let i = 0; i < join.length; i++) {
      if (Types.ObjectId.isValid(join[i].partyID)) {
        const party = await partyModel.findOne({ _id: join[i].partyID });
        if (party) {
          parties.push(party);
        }
      }
    }
  }

  return parties;
};
