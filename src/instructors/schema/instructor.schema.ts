import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Instructors {

    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, required: true })
    email: string

    @Prop({ type: String, required: true })
    address: string

    @Prop({ type: Number, required: true })
    contact: number

    @Prop({ type: String, required: true })
    gender: string

    @Prop({ type: String, required: true })
    dob: string

    @Prop({ type: String, required: true })
    qualification: string

    @Prop({ type: String, required: true })
    status: string

}

export type InstructorsDocument = HydratedDocument<Instructors>

export const InstructorsModel = SchemaFactory.createForClass(Instructors)