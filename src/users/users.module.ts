import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Students, StudentsModel } from './schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Students.name, schema: StudentsModel }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
