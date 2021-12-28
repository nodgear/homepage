import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Action, ActionSchema } from './entities/action.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Action.name, schema: ActionSchema }
    ]),
  ],
  controllers: [ActionsController],
  providers: [ActionsService]
})
export class ActionsModule {}
