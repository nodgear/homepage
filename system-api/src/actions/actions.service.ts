import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { join } from 'path/posix';
import { CreateActionDto } from './dto/create-action.dto';
import { Action, ActionDocument } from './entities/action.entity';
var fs = require('fs');

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action.name)
    private model: Model<ActionDocument>,
  ) {}


  public fileToBase64(fileName){
    const filename1 =  join(process.cwd()+`/src/actions/files/${fileName}`);
    const binaryData = fs.readFileSync(filename1);
    const base64 = Buffer.from(binaryData)
    return base64;
  }

  public async validSendFile(files, dto) {
    if (files.length === 0) {
      throw Error('Necessário enviar no mínimo 1 arquivo.');
    }
    const action = await this.model.findOne({ title: dto.title.toUpperCase() })
    if(action)
      throw Error('Ação já registrado');
  }

  private formatBody(dto: any) {
    if (dto.title) dto.title = dto.title.toUpperCase();
    if (dto.description) dto.description = dto.description.toUpperCase();
  }

  private createSaveObject(files, dto) {
    return { title: dto.title, description: dto.description, amount: dto.amount, fileName: dto.fileName, documentPath:files }
  }

  async create(files, dto: CreateActionDto) {
    this.validSendFile(files, dto);

    this.formatBody(dto);

    for (const iterator of files) {
      iterator.fileBuffer = this.fileToBase64(iterator.filename)
    }
    const data = this.createSaveObject(files,dto);

    const created = new this.model(data);
    return await created.save();
  }

  async findAll() {
    return await this.model.find();
  }
}
