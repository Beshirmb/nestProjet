
import { Req, Res, Injectable } from '@nestjs/common';
import * as multer from 'multer';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InvoiceDocument, Invoice, InvoiceSchema } from './schemas/invoice.schema'
import { CreateinvoiceDto } from './createinvoice.dto'
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

const getBlobName = originalName => {
  const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
  return `${identifier}-${originalName}`;
};
const inMemoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

@Injectable()
export class InvoiceService {

  constructor(
    @InjectModel(Invoice.name) public invoiceModel: Model<InvoiceDocument>,

  ) { }
  uploadStrategy = multer({ storage: inMemoryStorage }).single('file')

  public async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }
  public async adddata(data) {
    const invoice = new this.invoiceModel(data)
    return invoice.save()

  }
  public async create(data: CreateinvoiceDto): Promise<Invoice> {
    const invoice = new this.invoiceModel(data)
    return invoice.save()

  }

  public async findById(id: any): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(id).exec()
    return invoice

  }
  public async findbyorganisationId(id: any) {
    const invoice = await this.invoiceModel.find({ idsub_organisation: id }).exec()
    return invoice
  }
  public async updateinvoice(id: any, data: any) {
    const updateinvoice = await this.invoiceModel.findByIdAndUpdate(id, data)
    if (updateinvoice)
      return {
        success: true, message: {
          ar: 'تحديث المستخدم فاتورة',
          fr: 'mise a jour facture avec success',
          en: 'invoice update success '
        }
      };
    else return {
      success: false, message: {
        ar: 'لم يتم العثور على فاتورة',
        fr: 'facture non trouvé',
        en: 'invoice not found'
      }
    };
  }

  public async updatestatutinvoice(id, data) {
    const updatestatut = await this.invoiceModel.findByIdAndUpdate(id, data)
    if (updatestatut)
      return {
        success: true, message: {
          ar: 'تحديث المستخدم فاتورة',
          fr: 'mise a jour facture avec success',
          en: 'invoice update success '
        }
      };
    else return {
      success: false, message: {
        ar: 'لم يتم العثور على فاتورة',
        fr: 'facture non trouvé',
        en: 'invoice not found'
      }
    };

  }
  public async fileupload(@Req() request: Request, @Res() res: Response) {

    let calculref: any;
    let catfact = "C"
    let now = new Date();
    let year = now.getFullYear();
    let resuplod: any;
    const invoice = new this.invoiceModel()
    const invoices = this.invoiceModel

    try {

      this.uploadStrategy(request, res, async function (error) {

        if (error) {

          return res.json({ message: `Failed to upload image file: ${error}` });
        }
        else {

          const blobName = getBlobName(request.file.originalname);
          const stream = createReadStream(join(process.cwd(), "/public/" + request.file.originalname));
          const streamLength = request.file.size


          const findnumber = await invoices.find({ idsub_organisation: request.body.idsub_organisation, fournissuer: request.body.facture })

          if (findnumber)
            calculref = findnumber.length;
          if (request.body.facture)
            catfact = "F"



          return res.json({
            success: true,
            message: {
              en: "invoice data saved ",
              ar: 'حفظ بيانات الفاتورة ',
              fr: 'données de facturation enregistrées',
            }
          })

        }
      })

    } catch (error) {

      return res.json({
        success: false, message: {
          en: `Failed to upload image file: ${error}`,
          fr: `Échec du téléchargement du fichier image ${error}`
        }
      });
    }
  }





}