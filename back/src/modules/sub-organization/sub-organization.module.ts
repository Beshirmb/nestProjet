import { Module } from '@nestjs/common';
import { SubOrganizationController } from './sub-organization.controller';
import { SubOrganizationService } from './sub-organization.service';
import { MongooseModule } from "@nestjs/mongoose";
import {Suborganization , subOrganizationSchema } from './schemas/subOrganization.schema'
@Module({
  imports: [MongooseModule.forFeature([{ name: Suborganization.name, schema: subOrganizationSchema }])],
  controllers: [SubOrganizationController],
  providers: [SubOrganizationService],
  exports: [SubOrganizationService],
})
export class SubOrganizationModule {}
