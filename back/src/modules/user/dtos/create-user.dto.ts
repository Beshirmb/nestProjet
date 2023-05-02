import { IsEmail, IsNotEmpty,IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({message : "name can't be empty"})
  name: string
  @ApiProperty()
  @IsNotEmpty({message : "lastName can't   be empty"})
  lastName: string
  @IsEmail( {}, {message : 'valide email is required'})
  @ApiProperty()
  email: string
  @ApiProperty()
  password: string
  @IsNotEmpty({message : "phone number can't  be empty"})
  @ApiProperty()
  phoneNumber: string
  @ApiProperty()
  image:string
  @IsNotEmpty({message : "organisation id can't  be empty"})
  @ApiProperty({type: 'string'})
  organisation: Types.ObjectId;

}


