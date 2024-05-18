import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Events {

    @Prop({ type: String, required: true })
    event: string

    @Prop({ type: String, required: true })
    desc: string

    @Prop({ type: String, required: true })
    from: string

    @Prop({ type: String, required: true })
    to: string

    @Prop({ type: String, required: true })
    img: string

}

export type EventsDocument = HydratedDocument<Events>

export const EventsModel = SchemaFactory.createForClass(Events)

