import { ApiProperty } from "@nestjs/swagger";

export class CreateQueryDto {

    @ApiProperty({ required: true })
    date: string

    @ApiProperty()
    response: string

    @ApiProperty({ required: true })
    query: string

    @ApiProperty({ required: true })
    status: string

    @ApiProperty({ required: true })
    student: string
}
