import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentModel, Enrollments } from './schema/enrollment.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Enrollments.name, schema: EnrollmentModel }])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule { }
