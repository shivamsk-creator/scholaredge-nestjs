import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Categories } from "src/categories/schema/category.schema";

@Schema({ timestamps: true })
export class Courses {

    @Prop({ type: String, required: true })
    title: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true })
    category: Categories

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Instructors", required: true })
    instructor: Courses


    @Prop({ type: String, required: true })
    level: string

    @Prop({ type: String, required: true })
    lessons: string

    @Prop({ type: String, required: true })
    img: string

    @Prop({ type: String, required: true })
    desc: string

    @Prop({ type: String, required: true })
    price: string

    @Prop({ type: String, required: true })
    duration: string

    @Prop({ type: String, required: true })
    rating: string

    @Prop({ type: String, required: true })
    status: string

}

export type CoursesDocument = HydratedDocument<Courses>

export const CoursesModel = SchemaFactory.createForClass(Courses)