import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags("Instructors")
@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) { }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorsService.create(createInstructorDto);
  }


  @Get()
  findAll() {
    return this.instructorsService.findAll();
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorsService.findOne(id);
  }
  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstructorDto: UpdateInstructorDto) {
    return this.instructorsService.update(id, updateInstructorDto);
  }

  @ApiBearerAuth("authentication")
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorsService.remove(id);
  }
}
