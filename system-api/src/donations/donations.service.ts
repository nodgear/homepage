import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdministratorsService } from 'src/administrators/administrators.service';
import { CalculationsService } from 'src/calculations/calculations.service';
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
    private calculationService: CalculationsService,
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
    dto.name = dto.name.toUpperCase();
    delete dto.emailUser;
    delete dto.passwordUser;

    const donation = new this.model({
      administratorId: user._id,
      ...dto,
    });

    return await donation.save();
  }

  async findAll(props: GetDonationsDto) {
    const limit = Number(props.limit || 25);
    const page = Number(props.page || 1);

    console.log(typeof limit, typeof page);
    //FIXME: paginar resultados
    const skip = (page - 1) * limit;
    const filter = {} as any;
    
    if(props.name){
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
