/* model Client */


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

import { Suborganization } from '../../sub-organization/schemas/subOrganization.schema'
export type CustomerDocument = Customer & Document

@Schema({ timestamps: true })
export class Customer {

  @Prop({ required: true, unique: true })
  name: string
  @Prop()
  codes: number
  @Prop({ required: true })
  tva: number
  @Prop({ required: true })
  comptetvacollect: string
  @Prop()
  devise: string
  /* Relation  */
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Suborganization', autopopulate: true, owner: Suborganization })
  organisation: Types.ObjectId
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
CustomerSchema.plugin(require('mongoose-autopopulate'));
CustomerSchema.plugin(require('mongoose-beautiful-unique-validation'));