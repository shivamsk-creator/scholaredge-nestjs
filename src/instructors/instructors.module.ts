import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Instructors, InstructorsModel } from './schema/instructor.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Instructors.name, schema: InstructorsModel }])],
  controllers: [InstructorsController],
  providers: [InstructorsService],
})
export class InstructorsModule { }
