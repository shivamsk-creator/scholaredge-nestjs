import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateInstructorDto {

    @IsNotEmpty()
    @ApiProperty({ required: true })
    name: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    email: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    address: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    contact: number

    @IsNotEmpty()
    @ApiProperty({ required: true })
    gender: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    dob: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    qualification: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    status: string


}
