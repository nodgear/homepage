import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { Action, ActionDocument } from './entities/action.entity';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action.name)
    private model: Model<ActionDocument>,
  ) {}

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
    return { title: dto.title, description: dto.description, amount: dto.amount, fileName: dto.fileName, documentPath:files }
  }

  async create(files, dto: CreateActionDto) {
    this.validSendFile(files);

    this.formatBody(dto);

    const data = this.createSaveObject(files,dto);

    const created = new this.model(data);
    return await created.save();
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
