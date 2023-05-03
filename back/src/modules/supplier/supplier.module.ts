import { Module } from '@nestjs/common';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
import { SupplierSchema, Supplier } from './schemas/supplier.schema'
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Supplier.name,
        schema: SupplierSchema,
      },
    ]),],
  controllers: [SupplierController],
  providers: [SupplierService]
})
export class SupplierModule { }
