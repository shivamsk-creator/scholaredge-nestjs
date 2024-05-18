import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Queries } from './schema/query.schema';
import { Model } from 'mongoose';

@Injectable()
export class QueriesService {
  constructor(@InjectModel(Queries.name) private queryModel: Model<Queries>) { }
  async create(createQueryDto: CreateQueryDto) {

    const query = await this.queryModel.create(createQueryDto)
    return { message: "Created successfuly" };
  }

  async findAll() {
    const queries = await this.queryModel.find()
    return queries;
  }

  async findOne(id: string) {
    const query = await this.queryModel.findById(id)

    if (!query) {
      throw new HttpException({ error_description: 'Query does not exist', error_code: 'NO_EXISTING_QUERY' }, HttpStatus.NOT_FOUND)
    }
    return query;
  }

  async findByCourse(id: string) {
    const queries = await this.queryModel.find({ student: id })
    return queries;
  }

  async update(id: string, updateQueryDto: UpdateQueryDto) {
    const item = await this.queryModel.findByIdAndUpdate(id, updateQueryDto, { new: true })
    return { message: "Updated successfully" };
  }

  async remove(id: string) {
    const item = await this.queryModel.findByIdAndDelete(id)
    return { message: "Deleted successfully" };
  }
}
