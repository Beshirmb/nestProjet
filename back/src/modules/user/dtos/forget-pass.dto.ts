import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class Forgetpassdto {
  @IsEmail()
  @ApiProperty()
  email: string;
  
}