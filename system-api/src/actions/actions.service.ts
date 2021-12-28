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

  private formatBody(dto: any){
    if (dto.typeDoc) dto.typeDoc = dto.typeDoc.toLowerCase();
    if (dto.otherTypeSector) dto.otherTypeSector = dto.otherTypeSector.toLowerCase();
  }

  create(files, dto: CreateActionDto) {
    this.validSendFile(files);
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
