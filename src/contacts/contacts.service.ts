import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contacts } from './schema/contact.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contacts.name) private contactModel: Model<Contacts>) { }
  async create(createContactDto: CreateContactDto) {
    const contact = await this.contactModel.create(createContactDto)
    return { message: "Created successfully" };
  }

  async findAll() {
    const contacts = await this.contactModel.find()

    return contacts;
  }

  async findOne(id: string) {
    const contact = await this.contactModel.findById(id)
    if (!contact) {
      throw new HttpException({ error_description: 'Contact does not exist', error_code: 'NO_EXISTING_CONTACT' }, HttpStatus.NOT_FOUND)

    }
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const item = await this.contactModel.findByIdAndUpdate(id, updateContactDto, { new: true })
    return { message: "Updated Successfully" };
  }

  async remove(id: string) {
    const item = await this.contactModel.findByIdAndDelete(id)
    return { message: "Deleted successfully" }
  }
}
