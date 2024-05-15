import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAdminDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    gender: string

    @ApiProperty()
    dob: string

    @ApiProperty()
    contact: number

    @ApiProperty()
    address: string

    @ApiProperty()
    profilePic: string
}
