export interface PartyResponse {
  status: string;
  result: number;
  data: Parties;
}

export interface Party {
  [x: string]: string | undefined;
  _id: string;
  name: string;
  oragaizertion: string;
  date: string;
  description: string;
  images: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface Parties {
  party: Party[];
}
