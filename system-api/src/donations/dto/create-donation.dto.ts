import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';


export class CreateDonationDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    value: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    emailUser: string;

    @ApiProperty()
    @IsNotEmpty()
    passwordUser: string;
}
