import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { GetDonationsDto } from './dto/get-donations.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation, DonationDocument } from './entities/donation.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name)
    private model: Model<DonationDocument>,
    private administratorsService: AdministratorsService,
  ) {}

  private async transformBody(dto: any) {
    if (dto.name) dto.name = dto.name.toUpperCase();
    return dto;
  }

  async create(dto: CreateDonationDto) {
    //FIXME: metodo verifyUser em tese nao deveria retornar user (Abner que alterou)
    const user = await this.administratorsService.findOne({
      email: dto.emailUser,
    });
    await this.administratorsService.verifyPassword({
      password: dto.passwordUser,
      user,
    });

    //FIXME: pq colocar name como UpperCase?
    // const transformedData = await this.transformBody(dto);
    dto.name.toUpperCase();
    delete dto.emailUser;
    delete dto.passwordUser;

    const donation = new this.model({
      administratorId: user._id,
      ...dto,
    });

    return await donation.save();
  }

  async findAll({ limit = 25, name = '', page = 1 }: GetDonationsDto) {
    //FIXME: paginar resultados
    const skip = (page - 1) * limit;
    return await this.model
      .find({ name })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: 'desc' });
  }

  async findOne(_id: string) {
    return await this.model.findOne({ _id });
  }

  async update(_id: string, dto: UpdateDonationDto) {
    const rawData = { ...dto };

    await this.transformBody(rawData);

    return await this.model.updateOne({ _id }, rawData);
  }

  async remove(_id: string) {
    return await this.model.deleteOne({ _id });
  }

  async findByName(name: string) {
    return await this.model.find({ name: name.toUpperCase() });
  }

  //FIXME: fazer tabela "dashboard" com total de doacoes e total de doadores - incrementar numeros todas vez que uma doacao for criada
  async findAmount() {
    let amount = 0;
    const records = await this.findAll({});
    for (const iterator of records) {
      amount += iterator.value;
    }
    return { amount: amount, 'number-of-donations': records.length };
  }
}
