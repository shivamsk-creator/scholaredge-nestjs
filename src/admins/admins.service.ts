import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admins } from './schema/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';


@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admins.name) private adminsModel: Model<Admins>, private jwtService: JwtService) { }
  async create(createAdminDto: CreateAdminDto) {
    const { name, email, password, } = createAdminDto
    if (!name) {
      throw new HttpException({ error_description: "Name is required", error_code: ' NAME_REQUIRED' }, HttpStatus.BAD_REQUEST);
    }

    if (!email) {
      throw new HttpException({ error_description: "Email is required", error_code: ' EMAIL_REQUIRED' }, HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException({ error_description: "Password is required", error_code: ' PASSWORD_REQUIRED' }, HttpStatus.BAD_REQUEST);
    }

    let existEmail = await this.adminsModel.findOne({ email: email })

    if (existEmail) {
      throw new HttpException({ error_description: "This email is already exist! Please use another email address", error_code: 'EMAIL_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(password, 10);

    let admin = await this.adminsModel.create({ ...createAdminDto, password: hash })

    let payload = { id: admin._id, email: admin.email }
    let access_token = await this.jwtService.signAsync(payload)

    return { access_token }
  }

  async signIn(loginAdminDto: LoginAdminDto) {
    const { email, password } = loginAdminDto

    let admin = await this.adminsModel.findOne({ email: email })

    let payload = { id: admin?._id, email: admin?.email }

    if (!admin) {
      throw new HttpException({ error_description: 'Invalid email', error_code: 'INVALID_EMAIL' }, HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new HttpException({ error_description: 'Wrong password', error_code: 'WRONG_PASSWORD' }, HttpStatus.UNAUTHORIZED);
    }

    let access_token = await this.jwtService.signAsync(payload)

    return { access_token };
  }

  async findAll() {
    const admins = await this.adminsModel.find()
    return admins;
  }

  async findOne(id: string) {
    const admin = await this.adminsModel.findOne({ _id: id })

    if (!admin) {
      throw new HttpException({ error_description: 'Admin does not exist', error_code: 'NO_EXISTING_ADMIN' }, HttpStatus.NOT_FOUND)
    }
    return admin
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const item = await this.adminsModel.findByIdAndUpdate(id, updateAdminDto, { new: true })
    if (!item) {
      throw new HttpException({ error_description: 'User does not exist', error_code: 'NO_EXISTING_USER' }, HttpStatus.NOT_FOUND)
    }

    return { message: "Updated successfully" };
  }


  async remove(id: string) {
    const item = await this.adminsModel.findByIdAndDelete(id)

    return { message: "Deleted successfully" };
  }
}
