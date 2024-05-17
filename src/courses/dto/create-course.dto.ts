import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCourseDto {

    @IsNotEmpty()
    @ApiProperty({ required: true })
    title: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    category: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    instructor: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    level: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    lessons: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    img: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    desc: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    price: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    duration: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    rating: string

    @IsNotEmpty()
    @ApiProperty({ required: true })
    status: string
}
