
import { Body, Controller,UseGuards, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { addorganisationDto } from './dto/create-organisation.dto'
import { OrganizationService } from './organization.service'
import { JwtAuthGuard } from '../user/auth/JwtAuthGuard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,

} from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('organization')
export class OrganizationController {
  constructor (private readonly organisationService: OrganizationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/show/:organisationId')
  async getoneorganisation (@Param('organisationId') organisationId: string) {
     const org =   await this.organisationService.getorganisationById(organisationId)
     if (org)
     return org
     else return {seccess:false , message: {
       fr:'organisation non existe',
       ar:'منظمة غير موجودة'}
  }
}
@ApiCreatedResponse({ type: addorganisationDto })
  @Get("/show")
  async getallOrganisation () {
    return  this.organisationService.getorganisation()
  }
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: addorganisationDto })
  @Get("/show/byuser/:id")
  async getOrganisationbyUser ( @Param('id') id: string) {
    return  this.organisationService.getorganisationbyuser(id)
  }
  @Post("/add")
  async createNeworganisation (@Body() createorganisationDto: addorganisationDto){
    return  this.organisationService.createorganisation(createorganisationDto)
  }
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async updateOrganisation (
    @Param('id') id: string,
    @Body() updateorganisationDto: addorganisationDto,
  ) {
   return await this.organisationService.updateorganisation(id, updateorganisationDto)
  }

  @Delete('delete/:id')
  async deteteOrganisation (
    @Param('id') id: string,) {
    return await this.organisationService.deleteorganisation(id);
  }
}
