import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Contacts, ContactsModel } from './schema/contact.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contacts.name, schema: ContactsModel }])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule { }
