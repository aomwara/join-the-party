import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Join {
  @prop({ required: true })
  partyID: string;

  @prop({ required: true })
  userID: string;
}

const joinModel = getModelForClass(Join);
export default joinModel;
