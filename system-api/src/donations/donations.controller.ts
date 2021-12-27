import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@ApiTags('donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService,
    private readonly administratorsService: AdministratorsService) {}

  @Post()
  async create(@Body() dto: CreateDonationDto) {
    try {
      await this.administratorsService.verifyUser(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return this.donationsService.create(dto);
  }
  
  @Get('amount')
  getAmount(){
    return this.donationsService.findAmount();
  }

  @Get('all')
  findAll() {
    return this.donationsService.findAll();
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
