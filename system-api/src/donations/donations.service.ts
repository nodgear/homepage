import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation, DonationDocument } from './entities/donation.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name)
    private model: Model<DonationDocument>,
  ) { }


  private async transformBody(dto: any) {
    if (dto.name) dto.name = dto.name.toUpperCase();
  }

  async create(dto: CreateDonationDto) {
    const rawData = { ...dto };

    await this.transformBody(rawData);

    const created = new this.model(rawData);

    return await created.save();
  }

  async findAll() {
    return await this.model.find();
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

  async findAmount() {
    let amount = 0;
    const records = await this.findAll();
    for (const iterator of records) {
      amount += iterator.value;
    }
    return { 'amount': amount, 'number-of-donations': records.length };
  }
}
