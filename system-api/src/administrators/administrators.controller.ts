import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdministratorsService } from './administrators.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';

@ApiTags('administrators')
@Controller('administrators')
export class AdministratorsController {
  constructor(private readonly administratorsService: AdministratorsService) {}

  @Post()
  async create(@Body() dto: CreateAdministratorDto) {
    try {
      return await this.administratorsService.create(dto);
    } catch (error) {
      throw new HttpException(error.message, error.response.statusCode);
    }
  }
}
