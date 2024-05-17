import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Enrollments } from './schema/enrollment.schema';
import { Model } from 'mongoose';

@Injectable()
export class EnrollmentsService {
  constructor(@InjectModel(Enrollments.name) private enrollmentModel: Model<Enrollments>) { }
  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { student, course } = createEnrollmentDto

    let existEnrollment = await this.enrollmentModel.findOne({ student: student, course: course })

    if (existEnrollment) {
      throw new HttpException({ error_description: "Student already enrolled", error_code: 'STUDENT_ALREADY_ENROLLED' }, HttpStatus.BAD_REQUEST)
    }

    const cours = await this.enrollmentModel.create(createEnrollmentDto)
    return { message: "Created successfully", }

  }

  async findAll() {
    const enrollments = await this.enrollmentModel.find().populate([{ path: "student", select: "_id name email" }, { path: "course", select: "_id title desc img lessons duration rating status" }])
    return enrollments;
  }

  async findOne(id: string) {
    const enrollment = await this.enrollmentModel.findById(id).populate([{ path: "student", select: "_id name email" }, { path: "course", select: "_id title desc img lessons duration rating status" }])
    if (!enrollment) {
      throw new HttpException({ error_description: 'Enrollment does not exist', error_code: 'NO_EXISTING_ENROLLMENT' }, HttpStatus.NOT_FOUND)
    }
    return enrollment;
  }

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    const item = await this.enrollmentModel.findByIdAndUpdate(id, updateEnrollmentDto, { new: true })
    // if(item){
    //   const 
    // }
    return { message: "Updated successfully" };
  }

  async remove(id: string) {
    const item = await this.enrollmentModel.findByIdAndDelete(id)
    return { message: "Deleted successfully" };
  }
}
