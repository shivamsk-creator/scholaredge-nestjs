import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Contacts {

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    email: string

    @Prop({ type: String, required: true })
    desc: string

    @Prop({ type: Number, required: true })
    contact: number

    @Prop({ type: String, required: true })
    subject: string


}

export type ContactsDocument = HydratedDocument<Contacts>

export const ContactsModel = SchemaFactory.createForClass(Contacts)