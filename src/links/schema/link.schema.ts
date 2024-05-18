import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Links {

    @Prop({ type: String, required: true })
    link: string

    @Prop({ type: String, required: true })
    course: string

    @Prop({ type: String, required: true })
    name: string

}

export type linksDocument = HydratedDocument<Links>

export const LinksModel = SchemaFactory.createForClass(Links)