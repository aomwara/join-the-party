import { object, string, TypeOf, number } from "zod";

export const createPartySchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    // organizer: string({ required_error: "Email is required" }).email(
    //   "Invalid email"
    // ),
    date: string({ required_error: "Name is required" }),
    description: string({ required_error: "description is required" }),
    image: string({ required_error: "image is required" }),
    amount: number({ required_error: "amount is required" }),
  }),
});

export const getPartyByOrganizerSchema = object({
  body: object({
    organizer: string({ required_error: "Email is required" }).email(
      "Invalid email"
    ),
  }),
});

export type CreatePartyInput = TypeOf<typeof createPartySchema>["body"];
export type GetPartyByOrganizerInput = TypeOf<
  typeof getPartyByOrganizerSchema
>["body"];
