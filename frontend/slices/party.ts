import axios from "axios";
import { apiEndpoints, apiHost } from "../config";

import { PartyResponse, Party } from "../interfaces/Party";

export const getAllParty = async (token: string): Promise<Party[]> => {
  try {
    const res = await axios.get<PartyResponse>(
      `${apiHost.default}${apiEndpoints.section.party.getAll}`,
      {
        headers: {
          Authorization: `Bearer ` + token,
        },
      }
    );
    if (res.status === 200) {
      return res.data.data.party;
    }
  } catch {
    console.log("Cannot Get Party");
  }
  return Promise.reject(new Error("Get Party Failed"));
};
