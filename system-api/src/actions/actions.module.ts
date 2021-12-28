import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Action, ActionSchema } from './entities/action.entity';
import { AdministratorsModule } from 'src/administrators/administrators.module';
import { CalculationsModule } from 'src/calculations/calculations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Action.name, schema: ActionSchema }]),
    AdministratorsModule,
    CalculationsModule,
  ],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
