import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IS_LENGTH,
  Length,
} from 'class-validator';

export class GetDonationsDto {
  @ApiProperty()
  @IsNumber()
  page?: number;

  @ApiProperty()
  @IsString()
  @Length(3)
  name?: string;

  @ApiProperty()
  @IsNumber()
  limit?: number;
}
