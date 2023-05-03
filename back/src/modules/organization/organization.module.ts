
import { forwardRef, Module } from '@nestjs/common'
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { Organization, organizationSchema } from './schemas/organization.schema';
import { UserModule } from '../user/user.module'
import { CategoryModule } from '../produit/category.module'
import { MongooseModule } from '@nestjs/mongoose';
import { SubOrganizationModule } from '../sub-organization/sub-organization.module'
@Module({
  imports: [
    UserModule,
    CategoryModule,
    SubOrganizationModule,
    MongooseModule.forFeature([
      {
        name: Organization.name,
        schema: organizationSchema,
      },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule { }
