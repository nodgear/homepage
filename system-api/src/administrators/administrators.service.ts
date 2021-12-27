import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { Administrator, AdministratorDocument } from './entities/administrator.entity';

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectModel(Administrator.name)
    private model: Model<AdministratorDocument>,
  ) { }

  private async formatDto(dto: any) {
    if (dto.email) dto.email = dto.email.toLowerCase();

    if (dto.password) dto.password = await this.crypt(dto.password);
  }

  public async crypt(password) {
    return await bcrypt.hash(password, 14);
  }

  public async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  public async verifyUser(dto) {
    const user = await this.findByEmail(dto.emailUser);
    if (!user)
      throw Error('user não encontrado');
    const passMatch = await this.comparePassword(dto.passwordUser, user.password);
    if (!passMatch)
      throw Error('Credenciais inválidas');
  }

  async findByEmail(email: string) {
    return await this.model.findOne({ email: email.toLowerCase() });
  }

  async create(dto: CreateAdministratorDto) {
    await this.verifyUser(dto);

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
