import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import {
  Administrator,
  AdministratorDocument,
} from './entities/administrator.entity';

export type IUser = {
  email: string;
  password: string;
};
export type IVerifyPassword = {
  user: IUser;
  password: string;
};
@Injectable()
export class AdministratorsService {
  constructor(
    @InjectModel(Administrator.name)
    private model: Model<AdministratorDocument>,
  ) {}

  private async formatDto(dto: any) {
    if (dto.email) dto.email = dto.email.toLowerCase();

    if (dto.password) dto.password = await this.crypt(dto.password);
  }

  public async crypt(password) {
    return await bcrypt.hash(password, 14);
  }

  public async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  public async verifyPassword({
    user,
    password,
  }: IVerifyPassword): Promise<void> {
    const isValidPassword = await this.comparePassword(password, user.password);
    if (!isValidPassword) throw Error('Senha inválida');
  }

  async findOne({ email }: Omit<IUser, 'password'>) {
    return await this.model.findOne({ email: email.toLowerCase() });
  }

  async create(dto: CreateAdministratorDto) {
    const rawData = { ...dto };
    await this.formatDto(rawData);

    const created = new this.model(rawData);

    return await created.save();
  }

  // findAll() {
  //   return `unused method`;
  // }

  // findOne(id: number) {
  //   return `unused method`;
  // }

  // update(id: number, dto: UpdateAdministratorDto) {
  //   return `unused method`;
  // }

  // remove(id: number) {
  //   return `unused method`;
  // }
}
