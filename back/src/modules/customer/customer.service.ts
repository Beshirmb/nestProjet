
import { Injectable, Req, Res } from '@nestjs/common';
import { CustomerDocument, Customer } from './schemas/customer.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) { }

  public async customeradd(data) {
    const userexist = await this.customerModel.find({ name: data.name }).exec();
    if (userexist.length > 0)
      return {
        success: false, message: {
          ar: 'العميل موجود',
          fr: 'client existe',
          en: 'customer exists'
        }
      }
    else {
      const createCustomer = new this.customerModel(data)
      const Custom = await createCustomer.save()
      if (Custom)
        return {
          success: false, message: {
            ar: 'تم تسجيل   العميل   بنجاح',
            fr: 'client est créé avec succès',
            en: 'customer  is successfully created'
          }
        }
      else
        return {
          success: false, message: {
            ar: 'مشكلة الخادم حاول مرة أخرى في وقت لاحق',
            fr: 'problème serveur réessayer plus tard',
            en: 'server problem try again later'
          }
        }
    }
  }
  public async getcustomer(): Promise<CustomerDocument[]> {
    const allcustum = await this.customerModel.find().exec();
    return allcustum
  }

  public async filtercustom(params: object) {
    const filtersupper = await this.customerModel.find(params).exec();
    return filtersupper
  }

  public async getcustomer_organisation(id) {
    const customer = await this.customerModel.find({ organisation: id }).exec();
    let newcustomer = []
    if (customer.length > 0) {
      customer.forEach(el => {
        const subobject = el.toObject();
        delete subobject.organisation
        newcustomer.push(subobject)
      })
      return { row: newcustomer, success: true }
    }
    return {
      success: false, message: {
        ar: 'المنظمة ليس لديها الموردين حتى الآن',
        fr: 'organisation n`a pas encore des fournisseur',
        en: 'organization does not yet have suppliers '
      }
    }
  }

  public async getById(_id: string): Promise<CustomerDocument | String> {
    const Customer = await this.customerModel.findOne({ _id }).exec();
    return Customer ?? "Customer not found";
  }

  public async customerupdate(id, data) {
    const findCustomer = await this.customerModel.findByIdAndUpdate(id, data)
    if (findCustomer)
      return {
        success: true, message: {
          ar: 'تحديث عميل بنجاح',
          fr: 'modification  client avec success',
          en: 'update customer   success '
        }
      }
    else return {
      success: false, message: {
        ar: 'لم يتم العثور على عميل',
        fr: 'client non trouvé',
        en: 'customer not found'
      }
    }

  }

  public async deletecustomer(id) {
    const findone = await this.customerModel.findById(id)
    if (findone) {
      const deletedcustom = findone.toObject()
      delete deletedcustom._id

      const deleteCustomer = await this.customerModel.findByIdAndDelete(id).exec()
      return deleteCustomer


    }
    else {
      return {
        success: false, message: {
          ar: 'لم يتم العثور على عميل',
          fr: 'client non trouvé',
          en: 'customer not found'
        }
      }
    }
  }

}
