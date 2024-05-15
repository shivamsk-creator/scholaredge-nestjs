import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    fname: string

    @ApiProperty()
    address: string

    @ApiProperty()
    dob: string

    @ApiProperty()
    gender: string

    @ApiProperty()
    refby: string

    @ApiProperty()
    admdate: string

    @ApiProperty()
    profilePic: string
}
