import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import {Suborganization} from '../../sub-organization/schemas/subOrganization.schema'
export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string
  @Prop()
  lastName: string
  @Prop({unique: true})
  email: string
  @Prop()
  password: string
  @Prop()
  phoneNumber: string
  @Prop()
  image:string
  @Prop({default : false})
  isadmin : boolean
  @Prop({type: MongooseSchema.Types.ObjectId , ref: 'Suborganization' ,autopopulate:true,  owner: Suborganization})
organisation:Types.ObjectId


}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.plugin(require('mongoose-autopopulate'));
