import { ApiProperty } from "@nestjs/swagger";

export class CreateLinkDto {

    @ApiProperty({ required: true })
    link: string

    @ApiProperty({ required: true })
    course: string

    @ApiProperty({ required: true })
    name: string
}
