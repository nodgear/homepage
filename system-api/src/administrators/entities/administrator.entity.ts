import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type AdministratorDocument =  Administrator & Document;

@Schema()
export class Administrator {
    @Prop({ unique: true })
    email: string;
  
    @Prop()
    password: string;
}
export const AdministratorSchema = SchemaFactory.createForClass(Administrator);