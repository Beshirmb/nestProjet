import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class SuppDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string
    @ApiProperty()
    codes: number
    @ApiProperty()
    @IsNotEmpty()
    tva: number
    @ApiProperty()
    @IsNotEmpty()
    tvacollect: string
    @ApiProperty()
    @IsNotEmpty()
    devise: string
    @ApiProperty()
    @IsNotEmpty()
    organisation: string
}