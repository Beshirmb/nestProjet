import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProduitDto {
  @ApiProperty()
  @IsNotEmpty()
  codes: string
  @ApiProperty()
  @IsNotEmpty()
  color: string
  @ApiProperty()
  nameProduit: string

  @ApiProperty()
  Stock: number


  @ApiProperty()
  @IsNotEmpty()
  idorganisation: string

}