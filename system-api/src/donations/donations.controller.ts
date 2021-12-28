import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { GetDonationsDto } from './dto/get-donations.dto';

@ApiTags('donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  async create(@Body() dto: CreateDonationDto) {
    try {
      return await this.donationsService.create(dto);
    } catch (error) {
      throw new HttpException(error.message, error.response.statusCode);
    }
  }

  @Get()
  async findAll(@Query() dto: GetDonationsDto) {
    try {
      return await this.donationsService.findAll(dto);
    } catch (error) {
      throw new HttpException(error.message, error.response.statusCode);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }
}
