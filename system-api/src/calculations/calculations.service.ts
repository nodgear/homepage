import { Injectable } from '@nestjs/common';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import { UpdateCalculationDto } from './dto/update-calculation.dto';

@Injectable()
export class CalculationsService {
  create(createCalculationDto: CreateCalculationDto) {
    return 'This action adds a new calculation';
  }

  findAll() {
    return `This action returns all calculations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} calculation`;
  }

  update(id: number, updateCalculationDto: UpdateCalculationDto) {
    return `This action updates a #${id} calculation`;
  }

  remove(id: number) {
    return `This action removes a #${id} calculation`;
  }
}
