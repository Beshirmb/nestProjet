import {
  Body, Controller, Delete, Get,
  HttpException, UseGuards, Put,
  Param, Patch, Post, Req, Res,
} from '@nestjs/common'
import { CustomerDocument } from './schemas/customer.schema'
import { CustomerDto } from './/customer.dto'
import { CustomerService } from './customer.service'
import { JwtAuthGuard } from '../user/auth/JwtAuthGuard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,

} from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customer')
export class CustomerController {
  constructor(private customer: CustomerService) { }
  @Get("/getone/:id")

  async getcustomerbyid(@Param('id') id: string): Promise<CustomerDocument | String> {
    try {
      return await this.customer.getById(id)
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get("/show")
  async getcustomer(): Promise<CustomerDocument[]> {
    return await this.customer.getcustomer()
  }
  @Get('/byorganisation/:id')
  async getAccounting_byorganisation(@Param('id') id) {
    try {
      return await this.customer.getcustomer_organisation(id)
    }
    catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Post('/filter')
  async filtersupplier(@Body() params: object) {
    try {
      let tabsup = [];
      const filtercus = await this.customer.filtercustom(params);
      if (filtercus.length > 0) {
        filtercus.forEach(el => {
          const object = el.toObject();
          delete object.organisation
          tabsup.push(object)
        })
        return { success: true, row: tabsup }
      }
      throw new HttpException({
        success: false, message: {
          ar: 'لم يتم العثور على المورد',
          fr: 'fournisseur non trouvé',
          en: 'supplier not found'
        }
      }, 404);
    }
    catch (err) {
      throw new HttpException(err, 500);
    }
  }
  @Post("/add")

  async createcustomer(@Body() data: CustomerDto) {
    try {
      return await this.customer.customeradd(data)
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Put('update/:cat')
  async updatecustomer(
    @Param('cat') cat: string,
    @Body() updateDto: CustomerDto,
  ) {
    return await this.customer.customerupdate(cat, updateDto)
  }

  @Delete('delete/:cat')
  async detetecustomer(
    @Param('cat') cat: string) {
    const result = await this.customer.deletecustomer(cat);
    if (result) {
      return {
        success: true,
        message: {
          an: `the customer is successfully deleted`,
          fr: `le client est supprimé avec succès`,
          ar: `تم حذف العميل بنجاح`
        }

      }
    }
    throw new HttpException({
      success: false, message: {
        an: `customer not  exists`,
        fr: `le client n'existe pas`,
        ar: `العميل  غير موجود`
      }
    }, 404);




  }
}
