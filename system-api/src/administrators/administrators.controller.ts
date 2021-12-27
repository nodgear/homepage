import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';

@ApiTags('administrators')
@Controller('administrators')
export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) { }

  @Post()
  async create(@Body() dto: CreateAdministratorDto) {
    try {
      await this.administratorsService.verifyUser(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return this.administratorsService.create(dto);
  }

  // @Get()
  // findAll() {
  //   return 'disabled route'
  // }

  // @Get(':id')
  // findOne(@Param('id') _id: string) {
  //   return 'disabled route'
  // }

  // @Patch(':id')
  // update(@Param('id') _id: string, @Body() dto: UpdateAdministratorDto) {
  //   return 'disabled route'
  // }

  // @Delete(':id')
  // remove(@Param('id') _id: string) {
  //   return 'disabled route';
  // }
}
