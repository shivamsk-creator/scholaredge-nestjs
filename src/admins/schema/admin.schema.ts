import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true, })
export class Admins {

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    email: string

    @Prop({ type: String, required: true })
    gender: string

    @Prop({ type: String, required: true })
    dob: string

    @Prop({ type: Number, required: true })
    contact: number

    @Prop({ type: String, required: true })
    address: string

    @Prop({ type: String, required: true })
    password: string

    @Prop({ type: String })
    profilePic: string

}

export type AdminsDocument = HydratedDocument<Admins>
export const AdminsModel = SchemaFactory.createForClass(Admins)