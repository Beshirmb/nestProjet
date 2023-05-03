import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    codesCustomer: number
    @ApiProperty()
    @IsNotEmpty()
    tva: number
    @ApiProperty()
    @IsNotEmpty()
    devise: string
    @ApiProperty()
    @IsNotEmpty()
    comptetvacollect: string
    @ApiProperty()
    @IsNotEmpty()
    organisation: string
}