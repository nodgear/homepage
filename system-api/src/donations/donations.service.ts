import { ConflictException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { CalculationsService } from 'src/calculations/calculations.service';
import { CreateCalculationDto } from 'src/calculations/dto/create-calculation.dto';
import { CreateDonationDto } from './dto/create-donation.dto';
import { GetDonationsDto } from './dto/get-donations.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { Donation, DonationDocument } from './entities/donation.entity';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name)
    private model: mongoose.Model<DonationDocument>,
    private administratorsService: AdministratorsService,
    private calculationService: CalculationsService,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  private async transformBody(dto: any) {
    if (dto.name) dto.name = dto.name.toUpperCase();
    return dto;
  }

  async create(dto: CreateDonationDto) {
    const user = await this.administratorsService.findOne({
      email: dto.emailUser,
    });
    if (!user) throw new ConflictException('Usuário não encontrado');
    await this.administratorsService.verifyPassword({
      password: dto.passwordUser,
      user,
    });

    dto.name = dto.name.toUpperCase();
    delete dto.emailUser;
    delete dto.passwordUser;

    const danationsInfo = await this.calculationService.findOne();
    if (!danationsInfo)
      throw new ConflictException('Cálculos das doações não encontrados');

    const newDonationsInfo = {} as CreateCalculationDto;
    newDonationsInfo.amount = danationsInfo.amount + dto.value;
    newDonationsInfo.donationsCount = danationsInfo.donationsCount + 1;

    const donation = new this.model({
      administratorId: user._id,
      ...dto,
    });

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      await donation.save({ session });
      await this.calculationService.save(newDonationsInfo, { session });
    });
    session.endSession();
    return newDonationsInfo;
  }

  async findAll(props: GetDonationsDto) {
    const limit = Number(props.limit || 25);
    const page = Number(props.page || 1);

    const skip = (page - 1) * limit;
    const filter = {} as any;

    if (props.name) {
      filter.name = props.name.toUpperCase();
    }
    return await this.model
      .find(filter)
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
}
