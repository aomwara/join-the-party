import partyModel, { Party } from "../models/party.model";
import { omit } from "lodash";

// Create party service
export const createParty = async (input: Partial<Party>) => {
  const party = await partyModel.create(input);
  return omit(party.toJSON());
};

// Find All party
export const findAllParty = async () => {
  return await partyModel.find();
};

// Find party by id
export const findPartyById = async (id: string) => {
  const user = await partyModel.findById(id).lean();
  return omit(user);
};

// Find party by organizer
export const findPartyByOrganizer = async (organizer: string) => {
  const party = await partyModel.find({ email: organizer }).lean();
  return omit(party);
};
