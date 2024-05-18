import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {

    @ApiProperty({ required: true })
    event: string

    @ApiProperty({ required: true })
    desc: string

    @ApiProperty({ required: true })
    from: string

    @ApiProperty({ required: true })
    to: string

    @ApiProperty({ required: true })
    img: string
}
