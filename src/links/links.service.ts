import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Links } from './schema/link.schema';
import { Model } from 'mongoose';

@Injectable()
export class LinksService {
  constructor(@InjectModel(Links.name) private linkModel: Model<Links>) { }
  async create(createLinkDto: CreateLinkDto) {
    const linkExists = await this.linkModel.findOne({ link: createLinkDto.link })

    if (linkExists) {
      throw new HttpException({ error_description: "This link is already exist", error_code: 'LINK_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
    }

    const createdLink = await this.linkModel.create(createLinkDto)

    return { message: "Created Successfully" };
  }

  async findAll() {
    const links = await this.linkModel.find()

    return LinksService;
  }

  async findOne(id: string) {

    const link = await this.linkModel.findById(id)

    if (!link) {
      throw new HttpException({ error_description: 'Link does not exist', error_code: 'NO_EXISTING_LINK' }, HttpStatus.NOT_FOUND)
    }
    return link;
  }

  async findByCourse(id: string) {

    const links = await this.linkModel.find({ course: id })


    return links;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    const item = await this.linkModel.findByIdAndUpdate(id, updateLinkDto, { new: true })
    if (!item) {
      throw new HttpException({ error_description: 'Link does not exist', error_code: 'NO_EXISTING_LINK' }, HttpStatus.NOT_FOUND)
    }
    return { message: "Updated successfully" };
  }

  async remove(id: string) {
    const item = await this.linkModel.findByIdAndDelete(id)
    return { message: "Deleted successfully" }
  }
}
