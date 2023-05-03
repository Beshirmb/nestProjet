import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AcountingplanDto {
    @ApiProperty()
    purchase: string
    @ApiProperty()
    sale: string
    @ApiProperty()
    @IsNotEmpty()
    idorganisation : string
}