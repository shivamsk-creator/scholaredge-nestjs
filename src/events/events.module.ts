import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventsModel } from './schema/event.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Events.name, schema: EventsModel }])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule { }
