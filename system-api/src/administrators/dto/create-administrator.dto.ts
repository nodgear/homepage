import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAdministratorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  existingEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8)
  existingpassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  newEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8)
  newPassword: string;
}
