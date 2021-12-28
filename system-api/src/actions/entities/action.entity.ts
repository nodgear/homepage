import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ActionDocument = Action & Document;
@Schema({ timestamps: true })
export class Action {
    @Prop({ unique: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    amount: number;

    @Prop()
    fileName: string;

    @Prop()
    documentPath: Array<string>
}
export const ActionSchema = SchemaFactory.createForClass(Action);

