
import { Body, Controller, Delete, Get,UseGuards, Param, Patch, Post,  Req, Res, } from '@nestjs/common'
import {AccountingplansService} from './accountingplans.service'
import {AcountingplanDto} from './acountingplans.dto'
import {AccountingplansDocument} from './schemas/accountingplans.schema'
import {
  ApiBearerAuth,
  ApiCreatedResponse,

} from '@nestjs/swagger';
import { JwtAuthGuard } from '../user/auth/JwtAuthGuard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accountingplan')
export class AccountingplansController {

constructor(private acountingplans : AccountingplansService ){}
  
    @Get('/show/:id')

async getplansbyid (@Param('id') id: string){
  return  await this.acountingplans.getById(id)
}

@Get("/show")
async getAccountingplans () {
  return await this.acountingplans.getAccounting()
}
@Get('/byorganisation/:id')
async getAccountingplans_byorganisation (@Param('id') id:string) {
  return await this.acountingplans.getacounting_organisation(id)
}
@Post("/add")
async createAccountingplans (@Body() data: AcountingplanDto) {
  return await this.acountingplans.addAccounting(data)
}

@Patch('update/:id')
async updateAccountingplans (
  @Param('id') id: string,
  @Body() updateDto: AcountingplanDto,
) {
 return await this.acountingplans.updateAccounting(id, updateDto)
}

@Delete('delete/:id')
async deteteAccountingplans (
  @Param('id') id: string,) {
  return await this.acountingplans.deleteAccounting(id);
}
}
