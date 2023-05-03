import { Body, Controller, Delete, Get, Param, Patch, Post,  UseGuards,  HttpException } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,

} from '@nestjs/swagger';
import { JwtAuthGuard } from '../user/auth/JwtAuthGuard';
import { SuppDto } from './supplier.dto'

import { SupplierService } from './supplier.service'
@Controller('supplier')
export class SupplierController {
    constructor(
        private supService: SupplierService,
      ) {}
      @ApiBearerAuth()
      @UseGuards(JwtAuthGuard)
      @Get()
      async findAll(){
        return this.supService.findAll();
      }
    
      @ApiBearerAuth()
      @UseGuards(JwtAuthGuard)
      
      @Post()
      async create(@Body() data: SuppDto) {
        try {
        const create = await this.supService.create(data);
        return create
      } catch (error) {
        throw new HttpException(error.message, 500);
      }
      }
      @ApiBearerAuth()
      @UseGuards(JwtAuthGuard)
      @Get('/byorganisation/:id')
      async showby_organisation(@Param('id') id: string) {
        try {
          const sup = await this.supService.getsup_by_organisation(id);
    
          if (sup) {
  
            return sup;
          }
    
          throw new HttpException({ success: false, message:{
            ar:'لم يتم العثور على المورد',
            fr:'fournisseur non trouvé',
            en:'supplier not found'
          }}, 404);
        } catch (error) {
          throw new HttpException(error.message, 500);
        }
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('/filter')
    async filtersupplier( @Body() params: object ) {
  try{
    let tabsup = [] ;
     const filterdsup = await this.supService.filtersupper(params);
     if (filterdsup.length>0){
     filterdsup.forEach(el => {
      const object  = el.toObject();
      delete object.organisation
      tabsup.push(object)
     })
     return {success: true , row : tabsup}
     }
     throw new HttpException({ success: false, message:{
      ar:'لم يتم العثور على المورد',
      fr:'fournisseur non trouvé',
      en:'supplier not found'
    }}, 404);
  }
  catch(err){
  throw new HttpException(err, 500);
  }
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
      @Get('/show/:_id')
      async showby_id(@Param('_id') _id: string) {
        try {
          const sup = await this.supService.findById(_id);
    
          if (sup) {
            const newsub = sup.toObject();
            delete newsub.organisation
            return newsub;
          }
    
          throw new HttpException({ success: false, message:{
            ar:'لم يتم العثور على المورد',
            fr:'fournisseur non trouvé',
            en:'supplier not found'
          }}, 404);
        } catch (error) {
          throw new HttpException(error, 500);
        }
      }
      @ApiBearerAuth()
      @UseGuards(JwtAuthGuard)
      @Patch('update/:suppId')
      async updateUser (
        @Param('suppId') suppId: string,
        @Body() updateUserDto: SuppDto,
      ) {
       return await this.supService.supupdate(suppId, updateUserDto)
      }
      @ApiBearerAuth()
      @UseGuards(JwtAuthGuard)
      @Delete('delete/:suppId')
      async deteteUser (
        @Param('suppId') suppId: string,) {
        return await this.supService.supdelete(suppId);
      }
    }





