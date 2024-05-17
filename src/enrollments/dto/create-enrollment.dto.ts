import { ApiProperty } from "@nestjs/swagger";

export class CreateEnrollmentDto {

    @ApiProperty({ required: true })
    student: string

    @ApiProperty({ required: true })
    course: string

    @ApiProperty()
    payment: string
}
