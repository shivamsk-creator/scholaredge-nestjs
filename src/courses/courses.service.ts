import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Courses } from './schema/course.schema';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Courses.name) private courseModel: Model<Courses>) { }
  async create(createCourseDto: CreateCourseDto) {
    let existCourse = await this.courseModel.findOne({ title: createCourseDto.title })
    if (existCourse) {
      throw new HttpException({ error_description: "This course is already exist", error_code: 'COURSE_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST)
    }
    const course = await this.courseModel.create(createCourseDto)

    return { message: "Created successfully", }
  }

  async findAll() {
    const courses = await this.courseModel.find().populate([{ path: "category", select: "_id name desc" }, { path: "instructor", select: "_id name email" }])
    return courses;
  }

  async findOne(id: string) {
    const course = await this.courseModel.findById(id).populate([{ path: "category", select: "_id name desc" }, { path: "instructor", select: "_id name email" }])
    if (!course) {
      throw new HttpException({ error_description: 'Course does not exist', error_code: 'NO_EXISTING_COURSE' }, HttpStatus.NOT_FOUND)
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const item = await this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true })
    if (!item) {

    }
    return { message: "Updated successfully" };
  }

  async remove(id: string) {
    const item = await this.courseModel.findByIdAndDelete(id)
    return { message: "Deleted successfully" };
  }
}
