import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Events } from './schema/event.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Events.name) private eventModel: Model<Events>) { }
  async create(createEventDto: CreateEventDto) {
    const eventExist = await this.eventModel.findOne({ event: createEventDto.event })

    if (eventExist) {
      throw new HttpException({ error_description: "Event already exists", error_code: 'EVENT_ALREADY_EXISTS' }, HttpStatus.BAD_REQUEST)
    }

    const event = await this.eventModel.create(createEventDto)
    return { message: "Created successfully" }
  }

  async findAll() {
    const events = await this.eventModel.find()
    return events
  }

  async findOne(id: string) {
    const event = await this.eventModel.findById(id)
    if (!event) {
      throw new HttpException({ error_description: "Event does not exists", error_code: 'NO_EXISTING_EVENT' }, HttpStatus.BAD_REQUEST)

    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const item = await this.eventModel.findByIdAndUpdate(id, updateEventDto, { new: true })
    return { message: "Updated successfully" }
  }

  async remove(id: string) {
    const item = await this.eventModel.findByIdAndDelete(id)
    return { message: "Deleted Successfully" };
  }
}
