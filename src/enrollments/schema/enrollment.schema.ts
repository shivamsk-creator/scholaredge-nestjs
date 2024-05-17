import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Courses } from "src/courses/schema/course.schema";
import { Students } from "src/users/schema/user.schema";

@Schema({ timestamps: true })
export class Enrollments {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Students", required: true })
    student: Students

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Courses", required: true })
    course: Courses

    @Prop({ type: String, required: true })
    payment: string
}

export type EnrollmentsDocument = HydratedDocument<Enrollments>
export const EnrollmentModel = SchemaFactory.createForClass(Enrollments)