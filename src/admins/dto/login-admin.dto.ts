import { ApiProperty } from "@nestjs/swagger";

export class LoginAdminDto {
    @ApiProperty({ required: true })
    email: string

    @ApiProperty({ required: true })
    password: string
}