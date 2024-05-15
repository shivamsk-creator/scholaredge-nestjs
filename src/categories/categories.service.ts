import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Categories.name) private categoryModel: Model<Categories>) { }
  async create(createCategoryDto: CreateCategoryDto) {
    const { name, desc } = createCategoryDto

    if (!name) {
      throw new HttpException({ error_description: "Category name is required", error_code: ' CATEGORY_REQUIRED' }, HttpStatus.BAD_REQUEST);
    }

    if (!desc) {
      throw new HttpException({ error_description: "Description is required", error_code: ' DESCRIPTION_REQUIRED' }, HttpStatus.BAD_REQUEST);
    }

    let existCategory = await this.categoryModel.findOne({ name: name, })
    if (existCategory) {
      throw new HttpException({ error_description: "This category already exist", error_code: ' CATEGORY_ALREADY_EXIST' }, HttpStatus.BAD_REQUEST);
    }

    const category = await this.categoryModel.create(createCategoryDto)
    return { message: "Created successfully" };;
  }

  async findAll() {
    const categories = await this.categoryModel.find()
    return categories;
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findOne({ _id: id })

    if (!category) {
      throw new HttpException({ error_description: 'Category does not exist', error_code: 'NO_EXISTING_CATEGORY' }, HttpStatus.NOT_FOUND)
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const item = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true })
    if (!item) {
      throw new HttpException({ error_description: 'Category does not exist', error_code: 'NO_EXISTING_CATEGORY' }, HttpStatus.NOT_FOUND)
    }

    return { message: "Updated successfully" };
  }

  async remove(id: string) {
    const item = await this.categoryModel.findByIdAndDelete(id)
    return { message: "Deleted successfully" };
  }
}
