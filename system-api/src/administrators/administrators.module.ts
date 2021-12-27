import { Module } from '@nestjs/common';
import { AdministratorsService } from './administrators.service';
import { AdministratorsController } from './administrators.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Administrator, AdministratorSchema } from './entities/administrator.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Administrator.name, schema: AdministratorSchema }
    ]),
  ],
  controllers: [AdministratorsController],
  providers: [AdministratorsService],
  exports: [AdministratorsService]
})
export class AdministratorsModule {}
