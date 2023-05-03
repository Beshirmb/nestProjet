import { Controller ,
    Get,
    Post,
    Body,
    Param,
    Req, Res,
    HttpException,
    Patch, } from '@nestjs/common';
    import { Request, Response } from 'express';
import {InvoiceService} from './invoice.service'
import {Invoice} from './schemas/invoice.schema'
import { CreateinvoiceDto } from './createinvoice.dto';

import {
  ApiBearerAuth,
  ApiCreatedResponse,

} from '@nestjs/swagger';





@ApiBearerAuth()
@Controller('invoice')
export class InvoiceController {
    constructor(
        private invoiceService: InvoiceService,
      ) {}
    @Get()
    async findAll(): Promise<Invoice[]> {
      return this.invoiceService.findAll();
    }
    @Post('uplodeinvoice')
    async create(@Req() request : Request, @Res() res: Response) {
      try {
       const ress  = await this.invoiceService.fileupload(request, res);
       
       return ress

      } catch (error) {
        return res.json(`Failed to upload image file: ${error.message}`);
      }

      }
    
    
      @Get('/byorganisation/:_id')
      async byorganisation(@Param('_id') _id: string) {
        try {
          const user = await this.invoiceService.findbyorganisationId(_id);
    
          if (user) {
            return user;
          }
    
          throw new HttpException('User not exists', 404);
        } catch (error) {
          throw new HttpException(error.message, 500);
        }
      }

    @Get('/show/:_id')
    async show(@Param('_id') _id: string) {
      try {
        const user = await this.invoiceService.findById(_id);
  
        if (user) {
          return user;
        }
  
        throw new HttpException('User not exists', 404);
      } catch (error) {
        throw new HttpException(error.message, 500);
      }
    }
  

    @Patch('update/:Id')
    async updateinvoice (
      @Param('Id') Id: string,
      @Body() updateDto : any,
    ){
     return await this.invoiceService.updateinvoice(Id, updateDto)
    }
    @Patch('updatestatut/:Id')
    async updatestatut (
      @Param('Id') Id: string,
      @Body() data: any,
    ) {
     return await this.invoiceService.updatestatutinvoice(Id, data)
    }
  
  
}
