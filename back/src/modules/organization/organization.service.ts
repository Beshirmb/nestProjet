import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization, organizationDocument } from './schemas/organization.schema'
import { addorganisationDto } from './dto/create-organisation.dto';
import { UserService } from '../user/services/user.services'
import { SubOrganizationService } from '../sub-organization/sub-organization.service'
import { ProduitService } from '../produit/category.service'
import { configuration } from '../../config/configuration'
@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name) private organisationModel: Model<organizationDocument>,
    private userservice: UserService,
    private suborganiasation: SubOrganizationService,
    private ProduitService: ProduitService

  ) { }

  public async createorganisation(data: addorganisationDto) {

    const creatganisation = new this.organisationModel({
      name: data.name,
      email: data.email,
      tel: data.tel
    });
    const orgesxiste = await this.organisationModel.find({ email: data.email }).exec();
    if (orgesxiste.length > 0)
      return {
        success: false, message: {
          ar: 'البريد الاكتروني مستعمل ',
          fr: 'un organisation avec cet email existe deja',
          en: 'organization with this email already exists'
        }
      }
    else {
      const organisation = await creatganisation.save();
      if (organisation) {

        const createfistdata = await this.suborganiasation.creatfirstorganisation(data, organisation)
        if (createfistdata) {
          const createuser = await this.userservice.create_first_user(data, createfistdata)
          const createcatego = await this.ProduitService.firstcategoryaddmany(createfistdata._id)
          return createuser
        }
      }
      else
        return {
          success: false, message: {
            ar: 'مشكلة الخادم حاول مرة أخرى في وقت لاحق',
            fr: 'problème serveur réessayez ultérieurement',
            en: 'server problem try again later'
          }
        }
    }

  }

  public async getorganisationbyuser(id) {
    const userexiste = await this.userservice.findById(id)
    if (userexiste) {
      const newuser = userexiste.toObject();
      let userjs = JSON.stringify(newuser)
      let userjson = JSON.parse(userjs)
      const mainorganisation = userjson?.organisation?.idorganisation
      return mainorganisation
    }
    else
      return {
        success: false, message: {
          an: `user not exists`,
          fr: `l'utilisateur n'existe pas`,
          ar: `المستخدم غير موجود`
        }
      }

  }
  public async getorganisation(): Promise<organizationDocument[]> {
    return this.organisationModel.find().exec();
  }

  public async findByEmail(email: string) {
    const organisationExists = await this.organisationModel.findOne({ email }).exec();

    if (organisationExists) {
      return organisationExists;
    }

    return {
      success: false,
      message: {
        ar: ' البريد الإلكتروني غير موجود',
        fr: 'verifier votre enter , email n`existe pas',
        en: 'your enter, email does not exist'
      }
    }
  }

  public async getorganisationById(_id: string): Promise<organizationDocument | undefined> {
    const userExists = await this.organisationModel.findOne({ _id }).exec();
    return userExists ?? undefined;
  }
  async updateorganisation(organisationId: string, orgUpdates: addorganisationDto): Promise<object | undefined> {
    const org = await this.organisationModel.findByIdAndUpdate(organisationId, orgUpdates)
    if (org)
      return {
        success: true, message: {
          ar: 'تم تحديث المنظمة بنجاح',
          fr: 'organisation mise ajour avec success',
          en: 'organization successfully updated'
        }
      }
  }
  async deleteorganisation(id: any) {
    const findorg = await this.organisationModel.findByIdAndDelete(id)
    if (findorg)
      return {
        success: true, message: {
          ar: 'تم حذف المنظمة بنجاح',
          fr: 'organisation suprimer avec success',
          en: 'organization successfully deleted'
        }
      }
    else
      return {
        success: true, message: {
          ar: 'المنظمة غير موجودة   ',
          fr: 'organisation n`existe pas',
          en: 'organization does not exist'
        }
      }

  }


}
