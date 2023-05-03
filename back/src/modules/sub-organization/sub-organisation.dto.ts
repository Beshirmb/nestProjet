import { IsEmail, IsNotEmpty , IsEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
export class suborganizationdto {
  @ApiProperty()
  @IsNotEmpty()
  name: string
  @ApiProperty()
   @IsNotEmpty()
   idorganisation:string
   @ApiProperty()
   @IsNotEmpty()
   iduser:string
  @ApiPropertyOptional()
  tax: string
  @ApiPropertyOptional()
  tel: string
  @ApiProperty()
  @IsEmail()
  email: string
  @ApiPropertyOptional()
  billingAddres: string
  @ApiPropertyOptional()
  country: string
  @ApiPropertyOptional()
  devise: string
  }