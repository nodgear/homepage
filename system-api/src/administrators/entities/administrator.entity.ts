import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdministratorDocument = Administrator & Document;

@Schema({ timestamps: true })
export class Administrator {
  @Prop({ unique: true, required: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;
}
export const AdministratorSchema = SchemaFactory.createForClass(Administrator);
