import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
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
    private donationModel: mongoose.Model<DonationDocument>,
    // @InjectModel(Calculation.name)
    // private calculationModel: mongoose.Model<CalculationDocument>,

    private administratorsService: AdministratorsService,
    private calculationsService: CalculationsService,
    // private calculationService: CalculationsService,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) {}

  private async transformBody(dto: any) {
    if (dto.name) dto.name = dto.name.toUpperCase();
    return dto;
  }

  async create(dto: CreateDonationDto) {
    if (dto.value <= 0) throw new BadRequestException('O valor não pode ser 0');
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

    const donationsInfo = await this.calculationsService.findOne();

    const newDonationsInfo = {} as CreateCalculationDto;
    newDonationsInfo.amount = (donationsInfo?.amount || 0) + dto.value;
    newDonationsInfo.donationsCount = (donationsInfo?.donationsCount || 0) + 1;

    const donation = new this.donationModel({
      administratorId: user._id,
      ...dto,
    });

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      await donation.save({ session });
      await this.calculationsService.save(newDonationsInfo, session);
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
    const doacoes = await this.donationModel
      .find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: 'desc' });
    console.log(doacoes);

    const { amount, donationsCount } = await this.calculationsService.findOne();
    return { ...doacoes, amount, donationsCount };
  }

  async findOne(_id: string) {
    return await this.donationModel.findOne({ _id });
  }

  async update(_id: string, dto: UpdateDonationDto) {
    const rawData = { ...dto };

    await this.transformBody(rawData);

    return await this.donationModel.updateOne({ _id }, rawData);
  }

  async remove(_id: string) {
    return await this.donationModel.deleteOne({ _id });
  }

  async findByName(name: string) {
    return await this.donationModel.find({ name: name.toUpperCase() });
  }
}
