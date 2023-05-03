import { Injectable, Req, Res } from '@nestjs/common';
import { ProduitDocument, Produit } from './schemas/category.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { categorytab } from '../../middlewares/Produitinit'
@Injectable()
export class ProduitService {

  constructor(@InjectModel(Produit.name) private categoryModel: Model<ProduitDocument>) { }

  public async categoryaddmany() {
    const insetrtmany = await this.categoryModel.insertMany(categorytab)
    return insetrtmany

  }
  public async firstcategoryaddmany(id) {
    let newcat = [];
    categorytab.map(el => {
      newcat.push(Object.assign(el, { idorganisation: id }))
    })
    const insetrtmany = await this.categoryModel.insertMany(newcat)
    return insetrtmany

  }
  public async categoryadd(data) {
    const createcat = new this.categoryModel(data)
    const cat = createcat.save()
    if (cat)
      return {
        success: true, message: {
          ar: 'إضافة  فئة  بنجاح',
          fr: 'category ajouter avec succee ',
          en: 'category add successfully'
        }
      }
    else
      return {
        success: false, message: {
          ar: 'من المستحيل إضافة   فئة  ',
          fr: 'impossible d`ajouter une category   ',
          en: 'impossible  to add category'
        }
      }
  }

  public async getcategory(): Promise<ProduitDocument[]> {
    return this.categoryModel.find().exec();
  }
  public async getcategory_organisation(id) {
    return this.categoryModel.find({ idorganisation: id }).exec();
  }

  public async getById(_id: string) {
    const category = await this.categoryModel.findOne({ _id }).exec();
    if (category)
      return category
    else
      return {
        success: false, message: {
          ar: 'الفئة غير موجودة',
          fr: 'category ,n`existe pas  ',
          en: 'category not existe'
        }
      }

  }

  public async categoryupdate(id, data) {
    const findcategory = await this.categoryModel.findByIdAndUpdate(id, data)
    if (findcategory)
      return {
        success: true, message: {
          ar: '  تحديث الفئة بنجاح ',
          fr: 'category ,mise ajour avec succees  ',
          en: 'category, update with success  '
        }
      }
    else
      return {
        success: false, message: {
          ar: 'الفئة غير موجودة',
          fr: 'category ,n`existe pas   ',
          en: 'category not existe  '
        }
      }
  }

  public async deletecategory(id) {
    const deletecategory = await this.categoryModel.findByIdAndDelete(id)
    if (deletecategory)
      return {
        success: true, message: {
          ar: '  حذف الفئة بنجاح ',
          fr: 'category ,supprimer  avec succees  ',
          en: 'category, delete with success  '
        }
      }
    else
      return {
        success: false, message: {
          ar: 'الفئة غير موجودة',
          fr: 'category ,n`existe pas   ',
          en: 'category not existe  '
        }
      }

  }








}
