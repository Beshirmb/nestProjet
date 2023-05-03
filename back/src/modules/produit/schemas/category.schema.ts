
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Organization } from '../../organization/schemas/organization.schema'
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
export type ProduitDocument = Produit & Document

@Schema({ timestamps: true })
export class Produit {
  @Prop()
  codes: string
  @Prop()
  color: string
  @Prop()
  nameProduit: string
  @Prop()
  Stock: number


  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Organization', autopopulate: true, owner: Organization })
  idorganisation: Types.ObjectId

}

export const ProduitSchema = SchemaFactory.createForClass(Produit)
ProduitSchema.plugin(require('mongoose-autopopulate'));

