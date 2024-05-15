import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admins, AdminsModel } from './schema/admin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admins.name, schema: AdminsModel }])],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule { }
