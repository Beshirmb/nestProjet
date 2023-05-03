
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, Put } from '@nestjs/common'
import { ProduitService } from './category.service'
import { ProduitDto } from './category.dto'
import { ProduitDocument } from './schemas/category.schema'
import { Request, Response } from 'express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,

} from '@nestjs/swagger';

@Controller('produit')
export class ProduitController {
  constructor(private catservice: ProduitService) {

  }

  @Get('/show/:cat')

  async getcat(@Param('cat') cat: string) {
    return await this.catservice.getById(cat)
  }


  @Get("/show")
  async getall(): Promise<ProduitDocument[]> {
    return await this.catservice.getcategory()
  }
  @Get('/byorganisation/:id')
  async getcategory_byorganisation(@Param('id') id) {
    return await this.catservice.getcategory_organisation(id)
  }
  @Post("/add")
  async createcat(@Body() data: ProduitDto) {
    return await this.catservice.categoryadd(data)
  }
  @Post("/addmany")
  async addmabycat(): Promise<String | ProduitDocument[]> {
    return await this.catservice.categoryaddmany()
  }
  @Put('update/:cat')
  async updatecat(
    @Param('cat') cat: string,
    @Body() updateDto: any,
  ) {
    return await this.catservice.categoryupdate(cat, updateDto)
  }


  @Delete('delete/:cat')
  async detetecat(
    @Param('cat') cat: string,) {
    return await this.catservice.deletecategory(cat);
  }


}
