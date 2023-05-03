/* model déclaration */

import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type StatementDocument = Statement & Document

@Schema({ timestamps: true })
export class Statement {

  
  @Prop({ required: true })
  recapTva: string
  @Prop({ required: true })
  recuputaiveTva: string
  @Prop({ required: true })
  recuputaiveDroitTimbre: string
  @Prop({ required: true })
  startDate: Date
  @Prop({ required: true })
  endDate: Date

  /* Relation exercice comptable */
 
}

export const StatementSchema = SchemaFactory.createForClass(Statement)
