import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Action, ActionSchema } from './entities/action.entity';
import { AdministratorsModule } from 'src/administrators/administrators.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Action.name, schema: ActionSchema }
    ]),
    AdministratorsModule,
  ],
  controllers: [ActionsController],
  providers: [ActionsService]
})
export class ActionsModule {}
