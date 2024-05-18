import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Students } from "src/users/schema/user.schema";

@Schema({ timestamps: true })
export class Queries {

    @Prop({ type: String, required: true })
    date: string

    @Prop({ type: String, required: true })
    query: string

    @Prop({ type: String })
    response: string

    @Prop({ type: String, required: true })
    status: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Students", required: true })
    student: Students

}

export type QueriesDocument = HydratedDocument<Queries>

export const QueriesModel = SchemaFactory.createForClass(Queries)