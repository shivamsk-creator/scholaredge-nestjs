import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Categories {
    @Prop({ type: String, required: true })
    name: string

    @Prop({ type: String, default: null })
    desc: string
}

export type CategoriesDocument = HydratedDocument<Categories>
export const CategoriesModel = SchemaFactory.createForClass(Categories)