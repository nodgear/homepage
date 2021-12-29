import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalculationsService } from './calculations.service';
import { Calculation, CalculationSchema } from './entities/calculation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calculation.name, schema: CalculationSchema },
    ]),
  ],
  providers: [CalculationsService],
  exports: [CalculationsService],
})
export class CalculationsModule {}
