import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Suborganization, subOrganizationDocument } from './schemas/subOrganization.schema'
import {suborganizationdto} from './sub-organisation.dto'
import { addorganisationDto } from '../organization/dto/create-organisation.dto';
@Injectable()
export class SubOrganizationService {
    constructor(
        @InjectModel(Suborganization.name) private organisationModel: Model<subOrganizationDocument>,
      ) {}

      public async creatfirstorganisation (data:addorganisationDto,idorganisation) {
        const creatganisation = new this.organisationModel({
          name: data.name,
            email: data.email,
            idorganisation:idorganisation,
            devise: 'dinar',
            country:'tunisia',
            billingAddres:'tunisia',
  
          });
          
           const organisation = await creatganisation.save();
        return organisation
      }
    public async createsuborganisation(data: suborganizationdto ) {
        const creatganisation = new this.organisationModel({
          name: data.name,
          email: data.email,
          tax:data?.tax,
          tel:data?.tel,
          billingAddres:data?.billingAddres,
          country:data?.country,
          devise:data?.devise,
          idorganisation:data?.idorganisation
          

        });
        const suborgesxiste = this.organisationModel.find({email :data.email }).exec();
        if(suborgesxiste)
        return {success: false ,message : {
          an:`sub organization already exists` ,
          fr : `sub organisation deja existe` ,
          ar :`المنظمة الفرعية موجودة بالفعل` 
        }}

        else{
         const organisation = await creatganisation.save();
      return organisation
        }
      }
    
      public async getsuborganisation(): Promise<subOrganizationDocument[]> {
        return this.organisationModel.find().exec();
      }
      public async getbyparentorganisation(id:string) {
        return this.organisationModel.find({idorganisation:id}).exec();
      }
      public async findsuborganisationByEmail(email: string) {
        const suborganisationExistsExists = await this.organisationModel.findOne({ email }).exec();
    
        if (suborganisationExistsExists) {
          return suborganisationExistsExists;
        }
    
        return {success:false ,message : {
          an:` check your enter, email does not exist` ,
          fr : `verifier votre enter , email n'existe pas` ,
          ar :`تحقق من إدخالك ، البريد الإلكتروني غير موجود ` 
        } 
      }
      }
      public async getsuborganisationById(_id: any) {
        const suborganisationExists = await this.organisationModel.findOne({ _id }).exec();
        if(suborganisationExists){
       
        const newsuborg= suborganisationExists.toObject()
        delete newsuborg.idorganisation
        return newsuborg 
         } 
         return undefined;
      }
      async updatesuborganisation (suborganisationId: string, suborganizationUpdates: suborganizationdto): Promise<subOrganizationDocument | undefined> {
        const updateuborganization =  this.organisationModel.findByIdAndUpdate(suborganisationId, suborganizationUpdates)
        return updateuborganization
      }
      async deletesuborganisation(id:any) : Promise<subOrganizationDocument | undefined> {
        const findsuborganization =  this.organisationModel.findByIdAndDelete(id)
        return findsuborganization
      }
}
