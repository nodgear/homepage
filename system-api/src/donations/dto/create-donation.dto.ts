import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateDonationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  //FIXME: value nao seria number??
  @ApiProperty()
  @IsNotEmpty()
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  emailUser: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passwordUser: string;
}
