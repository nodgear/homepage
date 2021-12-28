import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCalculationDto } from './dto/create-calculation.dto';
import {
  Calculation,
  CalculationDocument,
} from './entities/calculation.entity';

@Injectable()
export class CalculationsService {
  constructor(
    @InjectModel(Calculation.name)
    private model: Model<CalculationDocument>,
  ) {}
  async save(createCalculationDto: CreateCalculationDto, session: any) {
    console.log(createCalculationDto);
    await this.model.findOneAndUpdate(
      undefined,
      {
        amount: createCalculationDto.amount,
        donationsCount: createCalculationDto.donationsCount,
      },
      { upsert: true, session },
    );
  }

  async findOne() {
    return await this.model.findOne();
  }
}
