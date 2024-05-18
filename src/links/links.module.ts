import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Links, LinksModel } from './schema/link.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Links.name, schema: LinksModel }])],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule { }
