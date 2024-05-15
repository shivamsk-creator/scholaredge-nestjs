import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Students {
    @Prop({ type: String, required: true })
    regno: string

    @Prop({ type: String, default: null, trim: true })
    name: string

    @Prop({ type: String, default: null, trim: true })
    fname: string

    @Prop({ type: String, default: null })
    address: string

    @Prop({ type: String, default: null })
    contact: string

    @Prop({ type: String, default: null, required: true })
    email: string

    @Prop({ type: String, default: null })
    dob: string

    @Prop({ type: String, default: null })
    gender: string

    @Prop({ type: String, default: null })
    refby: string

    @Prop({ type: String, default: null })
    admdate: string

    @Prop({ type: String, default: null })
    password: string

    @Prop({ type: String, default: null })
    profilePic: string


}

export type StudentsDocument = HydratedDocument<Students>
export const StudentsModel = SchemaFactory.createForClass(Students)