import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAdminDto {

    @ApiProperty({ required: true })
    name: string

    @IsNotEmpty()
    @ApiProperty({ required: true, uniqueItems: true })
    email: string

    @ApiProperty({ required: true })
    gender: string

    @ApiProperty({ required: true })
    dob: string

    @ApiProperty({ required: true })
    contact: number

    @ApiProperty({ required: true })
    address: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    password: string

    @ApiProperty()
    profilePic: string
}
