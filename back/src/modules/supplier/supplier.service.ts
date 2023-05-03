import { Injectable } from '@nestjs/common';
import { SupplierDocument, Supplier } from './schemas/supplier.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class SupplierService {

  constructor(@InjectModel(Supplier.name) private supModel: Model<SupplierDocument>) { }
  public async create(data) {
    const userexist = await this.supModel.find({ name: data.name }).exec();
    if (userexist.length > 0)
      return {
        success: false, message: {
          ar: 'المورد موجود',
          fr: 'fournisseur existe',
          en: 'supplier exists'
        }
      }
    else {
      const createsuplier = new this.supModel(data)
      const suplier = await createsuplier.save()
      if (suplier)
        return {
          success: true, message: {
            ar: 'تم تسجيل   المورد  بنجاح',
            fr: 'fournisseur est créé avec succès',
            en: 'supplier is successfully created'
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

  public async findAll() {
    const allsub = await this.supModel.find().exec();
    let newallsub = []
    if (allsub.length > 0) {
      allsub.forEach(el => {
        const subobject = el.toObject();
        delete subobject.organisation
        newallsub.push(subobject)
      })
      return { success: true, row: newallsub }
    }
    return {
      success: false, message: {
        ar: 'ليس لدينا موردون بعد',
        fr: 'on n`a pas encore des fournisseur',
        en: 'we we haven`t yet yet have suppliers '
      }
    }
  }

  public async getsup_by_organisation(id) {
    const sub = await this.supModel.find({ organisation: id }).exec();

    let newsub = []
    if (sub.length > 0) {
      sub.forEach(el => {
        const subobject = el.toObject();
        delete subobject.organisation
        newsub.push(subobject)
      })

      return { row: newsub, success: true }
    }
    else
      return {
        success: false, message: {
          ar: 'المنظمة ليس لديها الموردين حتى الآن',
          fr: 'organisation n`a pas encore des fournisseur',
          en: 'organization does not yet have suppliers '
        }
      }
  }
  public async findById(_id: string) {
    const suplier = await this.supModel.findById(_id).exec();

    return suplier

  }
  public async filtersupper(params: object) {
    const filtersupper = await this.supModel.find(params).exec();
    return filtersupper
  }

  public async supupdate(id, data) {
    const findsuplier = await this.supModel.findByIdAndUpdate(id, data)
    if (findsuplier)
      return {
        success: true, message: {
          ar: 'تحديث المورد بنجاح',
          fr: 'modification  fournisseur avec success',
          en: 'update supplier  success '
        }
      }
    else return {
      success: false, message: {
        ar: 'لم يتم العثور على المورد',
        fr: 'founrnissuer non trouvé',
        en: 'supplier not found'
      }
    }
  }

  public async supdelete(id) {
    const findone = await this.supModel.findById(id)
    if (findone) {
      const deletedsup = findone.toObject()
      delete deletedsup._id
      const deletesuplier = await this.supModel.findByIdAndDelete(id);

      if (deletesuplier)
        return {
          success: true, message: {
            ar: 'حذف المورد بنجاح',
            fr: 'delete  fournisseur avec success',
            en: 'delete supplier with success '
          }
        };
      return {
        success: false, message: {
          ar: 'لم يتم العثور على المورد',
          fr: 'founrnissuer non trouvé',
          en: 'supplier not found'
        }
      };

    }
    else return {
      success: false, message: {
        ar: 'لم يتم العثور على المورد',
        fr: 'founrnissuer non trouvé',
        en: 'supplier not found'
      }
    };
  }
}
