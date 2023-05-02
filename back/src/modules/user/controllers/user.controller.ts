import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  UseGuards,
  Patch,
  ValidationPipe,
  Delete,
  Req, Res,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/JwtAuthGuard';
import {Forgetpassdto} from '../dtos/forget-pass.dto'
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import {UpasswordDto} from '../dtos/update-password.dto'
import { User } from '../schemas/user.schema';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.services';
import {
  ApiBearerAuth,
  ApiCreatedResponse,

} from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  async findAll(){
    return this.userService.findAll();
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body(new ValidationPipe({ transform: true })) createUserDto: CreateUserDto): Promise<String|object> {
    const create =  await this.userService.create(createUserDto);
   return create
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({type:CreateUserDto})
  @Get('/show/:_id')
  async show(@Param('_id') _id: string) {
    try {
      const user = await this.userService.findById(_id);

      if (user) {
        const newuser = user.toObject();
        let userjs = JSON.stringify(newuser)
        let userjson = JSON.parse(userjs)
        const organi = userjson?.organisation._id
        const adresse = userjson?.organisation.billingAddres
        delete newuser.organisation
        Object.assign(newuser , {organisation :organi , adresse:adresse })
      
           
        return newuser;
      }

      throw new HttpException({success:false ,message : {
        an:`user not exists` ,
        fr : `l'utilisateur n'existe pas` ,
        ar :`المستخدم غير موجود` 
      }}, 404);
    } catch (error) {
      throw new HttpException({success:false ,message : {
        an:` ${error.message}` ,
        fr : `erreur serveur  merci de réessayer après quelque minute` ,
        ar :`خطأ في الخادم ` 
      }}, 500);
    }
  }
  @Get('/show/byemail/:email')
  async showbyemail(@Param('email') email: string) {
    try {
      const user = await this.userService.findByEmail(email);

      if (user) {
        const newuser = user.toObject();
          delete newuser.organisation
          delete newuser.password
        return newuser;
      }

      throw new HttpException({success:false ,message : {
        an:`user not exists` ,
        fr : `l'utilisateur n'existe pas` ,
        ar :`المستخدم غير موجود` 
      }}, 404);
    } catch (error) {
      throw new HttpException({success:false ,message : {
        an:` ${error.message}` ,
        fr : `erreur serveur  merci de réessayer après quelque minute` ,
        ar :`خطأ في الخادم ` 
      }}, 500);
    }
  }
  @Get('/getorganisation/:iduser')
  async showorganisationbyuser(@Param('iduser') iduser : string){
    try {
      const organisation = await this.userService.findorganisation(iduser);
      if(organisation){
      return  organisation
      }
      throw new HttpException({success:false ,message : {
        an:`organisation not exists` ,
        fr : `l'organisation n'existe pas` ,
        ar :` المنظمة غير موجودة` 
      }}, 404);
    }
    catch(error){
      throw new HttpException({success:false ,message : {
        an:` ${error.message}` ,
        fr : `erreur serveur , merci de réessayer après quelque minute` ,
        ar :`خطأ في الخادم ` 
      }}, 500);
    }
  }
  @Post('/auth/login')
  async signIn(@Body(new ValidationPipe({ transform: true })) data: LoginUserDto) {
    return this.authService.login(data.email, data.password);
  }
  @Post('/auth/forgetpassword')
  async forgetppasword(@Body(new ValidationPipe({ transform: true })) data: Forgetpassdto) {
    return this.userService.forgetpass(data.email);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('update/:userId')
  async updateUser (
    @Param('userId') userId: string,
    @Body() updateUserDto: CreateUserDto,
  ){
   return await this.userService.updateUser(userId, updateUserDto)
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/uplodephoto')
  async uplodphoto(@Req() request : Request, @Res() res: Response) {
    try {
     const ress  = await this.userService.uplodephoto(request, res);
     
     return ress

    } catch (error) {
      return res.json(`Failed to upload image file: ${error.message}`);
    }

    }
 @Patch('changepassword/:id')
 async updatePassword (
   @Param('id') id: string,
   @Body() password : UpasswordDto,

 ) {
   return await this.userService.updatepassworduser(id ,password )
 }

  @Delete('delete/:userId')
  async deteteUser (
    @Param('userId') userId: string,) {
    return await this.userService.deleteUser(userId);
  }
}
