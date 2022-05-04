import { object, string, TypeOf } from "zod";

export const joinSchema = object({
  body: object({
    partyID: string({ required_error: "partyID is required" }),
  }),
});

export type joinInput = TypeOf<typeof joinSchema>["body"];
