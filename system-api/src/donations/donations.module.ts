import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Donation, DonationSchema } from './entities/donation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
    ])
  ],
  controllers: [DonationsController],
  providers: [DonationsService]
})
export class DonationsModule {}
