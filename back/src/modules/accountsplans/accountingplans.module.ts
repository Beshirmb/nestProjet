import { Module } from '@nestjs/common';
import { AccountingplansController } from './accountingplans.controller';
import { AccountingplansService } from './accountingplans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Accountingplans, AccountingplansSchema } from './schemas/accountingplans.schema'
@Module({
  imports:[MongooseModule.forFeature([
    {
      name: Accountingplans.name,
      schema: AccountingplansSchema,
    },
  ]),],
  controllers: [AccountingplansController],
  providers: [AccountingplansService]
})
export class AccountingplansModule {}
