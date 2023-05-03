/*  model comptabiliter */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import {Organization} from '../../organization/schemas/organization.schema'
export type AccountingplansDocument = Accountingplans & Document

@Schema({ timestamps: true })
export class Accountingplans {
  @Prop()
  purchase: string
  @Prop()
  sale: string
  @Prop({type: MongooseSchema.Types.ObjectId , ref: 'Organization' ,autopopulate:true,  owner: Organization})
  idorganisation:Types.ObjectId
}

export const AccountingplansSchema = SchemaFactory.createForClass(Accountingplans)
AccountingplansSchema.plugin(require('mongoose-autopopulate'));