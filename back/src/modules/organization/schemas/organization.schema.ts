import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
export type organizationDocument = Organization & Document
import { Suborganization } from '../../sub-organization/schemas/subOrganization.schema'
@Schema({ timestamps: true })
export class Organization {
  @Prop({ required: true })
  name: string
  @Prop({ required: false })
  tel: string
  @Prop({ required: true, unique: true })
  email: string
  @Prop({ required: false })
  billingAddres: string
  @Prop({ required: false })
  taxNumber: string
  @Prop({ required: false })
  country: string
  @Prop({ required: false })
  devise: string
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Suborganization', owner: Suborganization })
  sub_organisation: [{ id: Types.ObjectId }]


}

export const organizationSchema = SchemaFactory.createForClass(Organization)
organizationSchema.plugin(require('mongoose-autopopulate'));
