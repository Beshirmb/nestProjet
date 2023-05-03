/* Model de facture  */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {  Document, Types, Schema as MongooseSchema, PromiseProvider  } from 'mongoose'
import {Suborganization} from '../../sub-organization/schemas/subOrganization.schema'
import {Supplier} from '../../supplier/schemas/supplier.schema'
import {Customer} from '../../customer/schemas/customer.schema'
export type InvoiceDocument = Invoice & Document

@Schema({ timestamps: true })
export class Invoice {
  @Prop()
  numInvoice: string
  @Prop()
  refinterne: string
  @Prop()
  Date: string
  @Prop()
  devise: string
  @Prop()
  tva: string
  @Prop()
  amountTVA: string
  @Prop()
  amountTTC: string
  @Prop()
  amountHT: string
  @Prop()
  //droit de timbre
  rightStamp: number
  @Prop()
  categorie : string
  @Prop()
  image: string
  @Prop()
  methode: string
  @Prop({default : false})
  fournissuer: boolean
  @Prop({default : false})
  isvalide:boolean
  @Prop({default : true})
  isnew:boolean
    /* Relation Fournisseur */
  @Prop({type: MongooseSchema.Types.ObjectId , ref: 'Customer', owner:Customer})
  idclient: Types.ObjectId
  @Prop({type: MongooseSchema.Types.ObjectId , ref: 'Supplier', owner:Supplier})
  idfournissuer: Types.ObjectId
  @Prop({type: MongooseSchema.Types.ObjectId ,  ref: 'Suborganization' , owner:Suborganization})
  idsub_organisation: Types.ObjectId
  /* Relation Sous Categorie */
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice)
InvoiceSchema.plugin(require('mongoose-autopopulate'));