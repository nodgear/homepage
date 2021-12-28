import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  public async crypt(password: string) {
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
    if (!isValidPassword) throw new BadRequestException('Senha inválida');
  }

  async findOne({ email }: Omit<IUser, 'password'>) {
    return await this.model.findOne({ email: email.toLowerCase() });
  }

  async create(dto: CreateAdministratorDto) {
    const existingAdministrator = await this.findOne({
      email: dto.existingEmail,
    });
    if (!existingAdministrator)
      throw new NotFoundException('Administrador não encontrado');
    await this.verifyPassword({
      password: dto.existingpassword,
      user: existingAdministrator,
    });

    const emailAlreadyExists = await this.findOne({
      email: dto.newEmail,
    });
    if (emailAlreadyExists) throw new ConflictException('Email já cadastrado');

    const newAdministratorData = {} as IUser;
    newAdministratorData.email = dto.newEmail.toLowerCase();
    newAdministratorData.password = await this.crypt(dto.newPassword);

    const newAdministrator = new this.model(newAdministratorData);
    return await newAdministrator.save();
  }
}
