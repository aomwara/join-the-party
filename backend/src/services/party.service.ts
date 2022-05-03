import partyModel from "../models/party.model";

// Find All party
export const findAllParty = async () => {
  return await partyModel.find();
};
