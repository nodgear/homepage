import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type DonationDocument = Donation & Document;

@Schema({ timestamps: true })
export class Donation {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    value: number;
}
export const DonationSchema = SchemaFactory.createForClass(Donation);