import axios from "axios";
import { apiEndpoints, apiHost } from "../config";

import { JoinInput } from "../interfaces/JoinInput";

export const joinParty = async (join: JoinInput) => {
  try {
    const res = await axios.post<any>(
      `${apiHost.default}${apiEndpoints.section.join.join}`,
      { partyID: join.partyID },
      {
        headers: {
          Authorization: `Bearer ${join.token}`,
        },
      }
    );
    if (res.status === 201) {
      console.log(res.data);
      return res.data;
    }
  } catch {
    console.log("Cannot Join Party");
  }
};

export const getMeJoin = async (token: string): Promise<any> => {
  try {
    const res = await axios.get<any>(
      `${apiHost.default}${apiEndpoints.section.join.getMeJoin}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data.data;
    }
  } catch {
    console.log("Cannot Get Me Join");
  }
};
