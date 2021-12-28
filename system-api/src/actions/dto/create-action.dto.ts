import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateActionDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    fileName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    emailUser: string;
  
    @ApiProperty()
    @IsNotEmpty()
    passwordUser: string;
}
