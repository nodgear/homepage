import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Donation, DonationSchema } from './entities/donation.entity';
import { AdministratorsModule } from 'src/administrators/administrators.module';
import { CalculationsModule } from 'src/calculations/calculations.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
    ]),
    AdministratorsModule,
    CalculationsModule,
  ],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
