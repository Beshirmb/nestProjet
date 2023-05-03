import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
export class addorganisationDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'name organisation is required',
  })
name: string
@ApiProperty()
@IsNotEmpty({message: 'tel is required'})
tel: string
@ApiProperty()
@IsEmail()
email: string
@ApiPropertyOptional()
billingAddres: string
@ApiPropertyOptional()
taxNumber:string
@ApiPropertyOptional()
country: string
@ApiPropertyOptional()
devise: string 
isadmin:true
}