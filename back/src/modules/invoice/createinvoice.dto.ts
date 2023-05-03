import { IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateinvoiceDto {
  @ApiProperty()
  numInvoice: string
  @ApiProperty()
  @IsDate()
  Date: Date
  @ApiProperty()
  devise: string
  @ApiProperty()
  tva: string
  @ApiProperty()
  methode: string
  @ApiProperty()
  amountTVA: string
  @ApiProperty()
  amountTTC: string
  @ApiProperty()
  amountHT: string
  @ApiProperty()
  rightStamp: number
  @ApiProperty()
  isvalide:boolean
}