
import { Injectable,Req, Res } from '@nestjs/common';
import{AccountingplansDocument,Accountingplans} from './schemas/accountingplans.schema'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AccountingplansService {
    constructor(@InjectModel(Accountingplans.name) private acountingplansModel: Model<AccountingplansDocument>){}


    public async addAccounting(data) {
        const createacount = new this.acountingplansModel(data)
        const acount = createacount.save()
        if(acount)
        return  { success: true,   message:{
          ar:'إضافة مخطط الحسابات بنجاح ',
          fr:'plan comptable ajouter avec succee',
          en:'chart of accounts add successfully'
        
        }
      }
        else
        return { success: false,   message:{
          ar:'مخطط الحسابات غير موجود',
          fr:'plan comptable not existe',
          en:'chart of accounts not existed'
        
        }
      }
    }
    
    public async getAccounting() {
       return this.acountingplansModel.find().exec();
    }
     public async getacounting_organisation(id) {
        const acount =  await this.acountingplansModel.findOne({idorganisation : id}).exec();
        if(acount)  {
          
        let obj = acount.toObject();
          delete obj.idorganisation
       
        
          return {success:true , row:obj}
      }
      else {
        return  { success: false,   message:{
          ar:'مخطط الحسابات غير موجود',
          fr:'plan comptable not existe',
          en:'chart of accounts not existed'
        }   }
      }
    }
    
    public async getById(_id: string){
        const acount = await this.acountingplansModel.findOne({ _id }).exec();
       if(acount)  {
       const newacount = acount.toObject();
       delete newacount.idorganisation
       return {success:true , row:newacount} 
       }
       else 
      return  { success: false,   message:{
        ar:'مخطط الحسابات غير موجود',
        fr:'plan comptable not existe',
        en:'chart of accounts not existed'
      }   }
      }
    
    public async updateAccounting(id,data){
            const findacount = await  this.acountingplansModel.findByIdAndUpdate(id, data)
            if(findacount)  {
             
              return {success:true , message:{
                ar:'تم تحديث مخطط الحسابات بنجاح',
                fr:'plan comptable mise à jour avec succès',
                en:'chart of accounts successfully updated'
              } } 
              }
              else 
             return  { success: false,    message:{
              ar:'مخطط الحسابات غير موجود',
              fr:'plan comptable not existe',
              en:'chart of accounts not existed'
             }   }
          }
    
    public async deleteAccounting(id){
        const deleteacount= await  this.acountingplansModel.findByIdAndDelete(id)
        if(deleteacount){
        return {success:true , message:{
          ar:'تم حذف مخطط الحسابات بنجاح',
          fr:'plan comptable supprimer avec succès',
          en:'chart of accounts successfully deleted'
        } } 
        }
        else 
        return  { success: false,    message:{
         ar:'مخطط الحسابات غير موجود',
         fr:'plan comptable not existe',
         en:'chart of accounts not existed'
        }   }
    }

}
