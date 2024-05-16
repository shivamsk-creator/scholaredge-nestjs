import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Instructors } from './schema/instructor.schema';
import { Model } from 'mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
export class InstructorsService {
  constructor(@InjectModel(Instructors.name) private instructorModel: Model<Instructors>) { }

  async create(createInstructorDto: CreateInstructorDto) {
    const { email } = createInstructorDto
    const existEmail = await this.instructorModel.findOne({ email: email })
    if (existEmail) {
      throw new HttpException({ error_description: "This email is already exist! Please use another email address", error_code: 'EMAIL_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
    }

    const instructor = await this.instructorModel.create(createInstructorDto)
    return { message: "Registered successfully", };
  }

  async findAll() {
    const instructors = await this.instructorModel.find()
    return instructors;
  }

  async findOne(id: string) {
    const instructor = await this.instructorModel.findById(id)
    if (!instructor) {
      throw new HttpException({ error_description: 'Instructor does not exist', error_code: 'NO_EXISTING_INSTRUCTOR' }, HttpStatus.NOT_FOUND)

    }
    return instructor;
  }

  async update(id: string, updateInstructorDto: UpdateInstructorDto) {
    const item = await this.instructorModel.findByIdAndUpdate(id, updateInstructorDto, { new: true })
    return { message: "Updated successfully" };
  }

  async remove(id: string) {
    const item = await this.instructorModel.findByIdAndDelete(id)
    return { message: "Deleted successfully" };
  }
}
