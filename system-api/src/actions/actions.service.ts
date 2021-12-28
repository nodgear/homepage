import { Injectable } from '@nestjs/common';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';

@Injectable()
export class ActionsService {

  public validSendFile(files) {
    if (files.length === 0) {
      throw Error('Necessário enviar no mínimo 1 arquivo.');
    }
  }

  private formatBody(dto: any) {
    if (dto.title) dto.title = dto.title.toUpperCase();
    if (dto.description) dto.description = dto.description.toUpperCase();
  }

  private createSaveObject(files, dto) {
    //return { title: dto.title, description: dto.description, amount: dto.amount, fileName, documentPath }
  }

  create(files, dto: CreateActionDto) {
    this.validSendFile(files);

    this.formatBody(dto);

    const data = 0;

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
