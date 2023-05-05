

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Suborganization } from '../../sub-organization/schemas/subOrganization.schema'

export type SupplierDocument = Supplier & Document

@Schema({ timestamps: true })
export class Supplier {
  @Prop({ required: true, unique: true })
  name: string
  @Prop()
  codes: number
  @Prop({ required: true })
  tva: number
  @Prop({ required: true })
  tvacollect: string
  @Prop()
  devise: string
  /* Relation  */
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Suborganization', autopopulate: true, owner: Suborganization })
  organisation: Types.ObjectId

}

export const SupplierSchema = SchemaFactory.createForClass(Supplier)
SupplierSchema.plugin(require('mongoose-autopopulate'));
SupplierSchema.plugin(require('mongoose-beautiful-unique-validation'));