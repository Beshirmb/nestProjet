import { Module } from '@nestjs/common';
import { ProduitController } from './category.controller';
import { ProduitService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Produit, ProduitSchema } from './schemas/category.schema'
@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Produit.name,
      schema: ProduitSchema,
    },
  ]),],
  controllers: [ProduitController],
  providers: [ProduitService],
  exports: [ProduitService],
})
export class CategoryModule { }
