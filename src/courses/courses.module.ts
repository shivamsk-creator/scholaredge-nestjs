import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Courses, CoursesModel } from './schema/course.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Courses.name, schema: CoursesModel }])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }
