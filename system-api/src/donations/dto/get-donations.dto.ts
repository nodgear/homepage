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
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsString()
  @Length(3)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
