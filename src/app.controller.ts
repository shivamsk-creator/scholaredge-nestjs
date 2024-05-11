import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UsersService) { }

  @Post('signup')
  signUp(@Body() body: CreateUserDto) {
    return this.userService.signUp(body);
  }
}
