import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import {Organization} from '../../organization/schemas/organization.schema'
export type subOrganizationDocument = Suborganization & Document

@Schema({ timestamps: true })
export class Suborganization {
  @Prop({ required: true })
  name: string
  @Prop()
  tax: string
  @Prop() 
    tel:string
  @Prop({ required: true ,
    unique: true})
  email: string
  @Prop()
  billingAddres: string
  @Prop()
  country: string
  @Prop()
  devise: string
  @Prop({type: MongooseSchema.Types.ObjectId , ref: 'Organization' ,autopopulate:true,  owner: Organization})
idorganisation:Types.ObjectId

}

export const subOrganizationSchema = SchemaFactory.createForClass(Suborganization)
subOrganizationSchema.plugin(require('mongoose-autopopulate'));