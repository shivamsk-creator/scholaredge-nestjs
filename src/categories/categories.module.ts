import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Categories, CategoriesModel } from './schema/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Categories.name, schema: CategoriesModel }])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }
