import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";

// @index({ email: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Party {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  organizer: string;

  @prop({ required: true })
  date: string;

  @prop({ required: true })
  description: string;

  @prop()
  image: string;

  @prop({ required: true })
  amount: string;
}

const partyModel = getModelForClass(Party);
export default partyModel;
