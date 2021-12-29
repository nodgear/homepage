import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class GetDonationsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiProperty({ required: false })
  @IsString()
  @Length(3)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  limit?: string;
}
