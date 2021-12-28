import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalculationDocument = Calculation & Document;

export class Calculation {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  donationsCount: number;
}

export const CalculationSchema = SchemaFactory.createForClass(Calculation);
