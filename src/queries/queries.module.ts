import { Module } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { QueriesController } from './queries.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Queries, QueriesModel } from './schema/query.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Queries.name, schema: QueriesModel }])],
  controllers: [QueriesController],
  providers: [QueriesService],
})
export class QueriesModule { }
