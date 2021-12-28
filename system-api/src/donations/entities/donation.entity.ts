import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DonationDocument = Donation & Document;

//FIXME: createdAt

@Schema()
export class Donation {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  value: number;

  //FIXME: userId
  @Prop({ required: true })
  administratorId: string;
}
export const DonationSchema = SchemaFactory.createForClass(Donation);
