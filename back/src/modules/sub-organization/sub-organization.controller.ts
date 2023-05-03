
import { Body, Controller, Delete,UseGuards, Get, Param, Patch, Post,HttpException } from '@nestjs/common'
import { suborganizationdto } from './sub-organisation.dto'
import { SubOrganizationService } from './sub-organization.service'
import { JwtAuthGuard } from '../user/auth/JwtAuthGuard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,

} from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('sub-organization')
export class SubOrganizationController {
    constructor (private readonly suborganisationService: SubOrganizationService) {}
    @ApiCreatedResponse({ type: suborganizationdto })
    @UseGuards(JwtAuthGuard)
    @Get('/show/:Id')
    async getoneorganisation (@Param('Id') Id: string) {
      try{
    const subprganization=   this.suborganisationService.getsuborganisationById(Id)
        if(subprganization){
     return subprganization
        }
      throw new HttpException({success:false ,
         message : {an :'sub organization not exists' ,
                     ar : 'المنظمة الفرعية غير موجودة',
                     fr : 'la sous-organisation n`existe pas'}}
      , 404);
    } catch (error) {
      throw new HttpException({success:false ,message : {
        an:` ${error.message}` ,
        fr : `erreur serveur  merci de réessayer après quelque minute` ,
        ar :`خطأ في الخادم ` 
      }
        }, 500);
    }
    }
  
    @Get("/show")
    async getallOrganisation () {
      return  this.suborganisationService.getsuborganisation()
    }
      @Get("show/byparentorg/:id")
      async getbyparent(@Param('id') id : string){
        try {
       let result = await this.suborganisationService.getbyparentorganisation(id)
      if(result)
      return result

       throw new HttpException({success:false ,message : {
        an:`sub organization does not exist ` ,
        fr : `sous organisation filles n'existe pas` ,
        ar :`المنظمة  الفرعية غير موجودة` 
      }}, 404);
    } catch (error) {
      throw new HttpException({success:false ,message : {
        an:` ${error.message}` ,
        fr : `erreur serveur  merci de réessayer après quelque minute` ,
        ar :`خطأ في الخادم ` 
      }}, 500);
    }
      }
    @Post("/add")
    async createUser (@Body() createorganisationDto: suborganizationdto){
      return  this.suborganisationService.createsuborganisation(createorganisationDto)
    }
    @ApiCreatedResponse({ type: suborganizationdto })
    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    async updateUser (
      @Param('id') id: string,
      @Body() updateorganisationDto: suborganizationdto,
    ) {
      try {
    const subprganization =   await this.suborganisationService.updatesuborganisation(id, updateorganisationDto)
     if(subprganization){
     const newsuborg= subprganization.toObject();
     delete newsuborg.idorganisation
     return newsuborg
     }

    throw new HttpException( {success:false, message : {en :'sub organization not exists' ,
    ar : 'المنظمة الفرعية غير موجودة',
    fr : 'la sous-organisation n`existe pas'}}, 404);
    } catch (error) {
      throw new HttpException({success:false ,message : {
        an:` ${error.message}` ,
        fr : `erreur serveur  merci de réessayer après quelque minute` ,
        ar :`خطأ في الخادم ` 
      }}, 500);
    }
    }
  
    @Delete('delete/:id')
    async deteteUser (
      @Param('id') id: string,) {
      return await this.suborganisationService.deletesuborganisation(id);
    }
}
