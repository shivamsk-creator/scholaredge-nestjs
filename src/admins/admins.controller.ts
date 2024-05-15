import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginAdminDto } from './dto/login-admin.dto';

@ApiTags("Admin")
@Controller('admin')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

  @Post("/register")
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Post("/login")
  signIn(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminsService.signIn(loginAdminDto);
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(id);
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
