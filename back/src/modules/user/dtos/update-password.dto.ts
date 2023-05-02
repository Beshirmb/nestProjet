import {IsNotEmpty,Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpasswordDto {
  @IsNotEmpty()
  @Length(6, 20)
  @ApiProperty()
  password: string;
}