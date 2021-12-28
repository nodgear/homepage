import { Injectable } from '@nestjs/common';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';

@Injectable()
export class ActionsService {
  create(createActionDto: CreateActionDto) {
    return 'This action adds a new action';
  }

  findAll() {
    return `This action returns all actions`;
  }

  findOne(_id: string) {
    return `This action returns a #${_id} action`;
  }

  update(_id: string, dto: UpdateActionDto) {
    return `This action updates a #${_id} action`;
  }

  remove(_id: string) {
    return `This action removes a #${_id} action`;
  }
}
