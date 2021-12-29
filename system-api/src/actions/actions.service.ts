import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { join } from 'path';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { CalculationsService } from 'src/calculations/calculations.service';
import { CreateCalculationDto } from 'src/calculations/dto/create-calculation.dto';
import { CreateActionDto } from './dto/create-action.dto';
import { Action, ActionDocument } from './entities/action.entity';
var fs = require('fs');

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Action.name)
    private model: mongoose.Model<ActionDocument>,
    private administratorsService: AdministratorsService,
    private calculationsService: CalculationsService,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) {}

  public fileToBase64(fileName) {
    const filename1 = join(process.cwd() + `/src/actions/files/${fileName}`);
    const binaryData = fs.readFileSync(filename1);
    const base64 = Buffer.from(binaryData);
    return base64;
  }

  public async validSendFile(files, dto) {
    if (files.length === 0) {
      throw Error('Necessário enviar no mínimo 1 arquivo.');
    }
    const action = await this.model.findOne({ title: dto.title.toUpperCase() });
    if (action) throw Error('Ação já registrado');
  }

  private formatBody(dto: any) {
    if (dto.title) dto.title = dto.title.toUpperCase();
    if (dto.description) dto.description = dto.description.toUpperCase();
  }

  private createSaveObject(files, dto) {
    return {
      title: dto.title,
      description: dto.description,
      amount: dto.amount,
      fileName: dto.fileName,
      documentPath: files,
    };
  }

  async create(files, dto: CreateActionDto) {
    this.validSendFile(files, dto);
    if (dto.amount <= 0)
      throw new BadRequestException('O valor não pode ser menor ou igual a 0');

    const user = await this.administratorsService.findOne({
      email: dto.emailUser,
    });
    if (!user) throw new ConflictException('Usuário não encontrado');
    await this.administratorsService.verifyPassword({
      password: dto.passwordUser,
      user,
    });

    this.formatBody(dto);

    for (const iterator of files) {
      iterator.fileBuffer = this.fileToBase64(iterator.filename);
    }
    const data = this.createSaveObject(files, dto);

    const action = new this.model(data);

    const donationsInfo = await this.calculationsService.findOne();

    const newDonationsInfo = {} as CreateCalculationDto;
    newDonationsInfo.amount = (donationsInfo?.amount || 0) - dto.amount;

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      await action.save({ session });
      await this.calculationsService.save(newDonationsInfo, session);
    });
    session.endSession();
  }

  async findAll() {
    return await this.model.find();
  }
}
