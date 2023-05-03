import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoryModule } from './modules/produit/category.module'
import { CustomerModule } from './modules/customer/customer.module'
import { SupplierModule } from './modules/supplier/supplier.module'
import { StatementModule } from './modules/statement/statement.module'
import { OrganizationModule } from './modules/organization/organization.module'
import { SubOrganizationModule } from './modules/sub-organization/sub-organization.module'
import { UserModule } from './modules/user/user.module'
import { InvoiceModule } from './modules/invoice/invoice.module'

import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configuration } from './config/configuration'
import { AccountingplansModule } from './modules/accountsplans/accountingplans.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    CustomerModule,
    SupplierModule,
    StatementModule,
    OrganizationModule,
    SubOrganizationModule,
    UserModule,
    InvoiceModule,
    AccountingplansModule,
    MongooseModule.forRoot(configuration.database.host, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      createIndexes: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
