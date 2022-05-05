import axios from "axios";
import { apiEndpoints, apiHost } from "../config";

import { PartyResponse, Party, CreatePartyResponse } from "../interfaces/Party";
import { CreatePartyInput } from "../interfaces/CreatePartyInput";

export const getAllParty = async (token: string): Promise<Party[]> => {
  try {
    const res = await axios.get<PartyResponse>(
      `${apiHost.default}${apiEndpoints.section.party.getAll}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export const createParty = async (party: CreatePartyInput) => {
  try {
    console.log(party);
    const res = await axios.post<CreatePartyResponse>(
      `${apiHost.default}${apiEndpoints.section.party.create}`,
      party,
      {
        headers: {
          Authorization: `Bearer ${party.token}`,
        },
      }
    );
    if (res.status === 201) {
      console.log(res.data);
      return res.data;
    }
  } catch {
    console.log("Cannot Create Party");
  }
};

export const getPartyById = async (id: string, token: string) => {
  try {
    const res = await axios.get<Party>(
      `${apiHost.default}${apiEndpoints.section.party.getById}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch {
    console.log("Cannot Get Party By Id");
  }
};
