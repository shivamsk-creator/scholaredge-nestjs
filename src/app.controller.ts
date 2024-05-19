import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { LoginUserDto } from './users/dto/login-user.dto';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UsersService) { }

  @Post('signup')
  signUp(@Body() body: CreateUserDto) {
    return this.userService.signUp(body);
  }

  @Post('signin')
  signIn(@Body() body: LoginUserDto) {
    return this.userService.signIn(body);
  }


}
