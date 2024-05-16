import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateInstructorDto } from './create-instructor.dto';

export class UpdateInstructorDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    address: string

    @ApiProperty()
    contact: number

    @ApiProperty()
    gender: string

    @ApiProperty()
    dob: string

    @ApiProperty()
    qualification: string

    @ApiProperty()
    status: string
}
