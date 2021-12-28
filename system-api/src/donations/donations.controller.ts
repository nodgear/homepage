import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { GetDonationsDto } from './dto/get-donations.dto';

@ApiTags('donations')
@Controller('donations')
export class DonationsController {
  constructor(
    private readonly donationsService: DonationsService,
    private readonly administratorsService: AdministratorsService,
  ) { }

  @Post()
  async create(@Body() dto: CreateDonationDto) {
    //FIXME: essa validacao ja esta no service

    // try {
    //   await this.administratorsService.verifyUser({
    //     email: dto.emailUser,
    //     password: dto.passwordUser,
    //   });
    // } catch (error) {
    //   throw new BadRequestException(error.message);
    // }
    return this.donationsService.create(dto);
  }
  //FIXME: retirar "all" do path, e filtrar via query nesse mesmo metodo
  @Get()
  findAll(@Query() dto: GetDonationsDto) {
    return this.donationsService.findAll(dto);
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.donationsService.findByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateDonationDto) {
  //   return this.donationsService.update(id, dto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.donationsService.remove(id);
  // }
}
