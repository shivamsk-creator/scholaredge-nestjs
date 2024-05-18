import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateContactDto {

    @IsNotEmpty()
    @ApiProperty({ required: true })
    name: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    email: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    desc: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    contact: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    subject: string
}
