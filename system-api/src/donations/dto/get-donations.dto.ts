import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IS_LENGTH,
  Length,
} from 'class-validator';

export class GetDonationsDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsString()
  @Length(3)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit?: number;
}
