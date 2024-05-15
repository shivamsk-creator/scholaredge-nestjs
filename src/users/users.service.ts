import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Students } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Students.name) private studentModel: Model<Students>, private jwtService: JwtService) { }

  async signUp(body: CreateUserDto) {
    try {

      let existMail = await this.studentModel.findOne({ email: body.email, })
      let existPhone = await this.studentModel.findOne({ contact: body.contact })
      if (existMail) {
        throw new HttpException({ error_description: "This email is already exist! Please use another email address", error_code: 'EMAIL_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
      }
      if (existPhone) {
        throw new HttpException({ error_description: "This phone no. is already exist! Please use another phone no.", error_code: 'PHONE_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
      }

      const saltOrRounds = 10;
      const password = body.password;
      const hash = await bcrypt.hash(password, saltOrRounds);

      const regno = + new Date()

      console.log("regno=>", regno);


      const data = {
        regno: `SCH-${regno}`,
        name: body.name,
        email: body.email,
        contact: body.contact,
        password: hash,
      }


      let user = await this.studentModel.create(data)



      let payload = { id: user._id, email: user.email }
      let access_token = await this.jwtService.signAsync(payload)

      return { access_token }
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async signIn(body: LoginUserDto) {
    let user = await this.studentModel.findOne({ email: body.email })

    let payload = { id: user?._id, email: user?.email }

    if (!user) {
      throw new HttpException({ error_description: 'Invalid email', error_code: 'INVALID_EMAIL' }, HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(body.password, user.password);

    console.log("Both passwords=>", user.password, body.password, isMatch);
    console.log("My User is=>", user);


    if (!isMatch) {
      throw new HttpException({ error_description: 'Wrong password', error_code: 'WRONG_PASSWORD' }, HttpStatus.UNAUTHORIZED);
    }

    let access_token = await this.jwtService.signAsync(payload)
    const data = {
      _id: user._id,
      email: user.email,
      name: user.name,
      fname: user.fname,
      contact: user.contact,
      address: user.address,
      profilePic: user.profilePic,
    }

    return { access_token, user: data }
  }

  async findAll() {
    const users = await this.studentModel.find()
    return users;
  }

  async findOne(id: string) {
    const user = await this.studentModel.findOne({ _id: id })

    if (!user) {
      throw new HttpException({ error_description: 'User does not exist', error_code: 'NO_EXISTING_USER' }, HttpStatus.NOT_FOUND)
    }
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {


    const item = await this.studentModel.findByIdAndUpdate(id, updateUserDto, { new: true })
    if (!item) {
      throw new HttpException({ error_description: 'User does not exist', error_code: 'NO_EXISTING_USER' }, HttpStatus.NOT_FOUND)
    }

    return { message: "Updated successfully", data: item };
  }

  async remove(id: string) {
    const item = await this.studentModel.findByIdAndDelete(id)
    console.log("deleted=>", item);

    return { message: "Deleted successfully" };
  }
}
