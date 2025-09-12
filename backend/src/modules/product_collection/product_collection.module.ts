import { Module } from '@nestjs/common';
import { ProductCollectionService } from './product_collection.service';
import { ProductCollectionController } from './product_collection.controller';

@Module({
  controllers: [ProductCollectionController],
  providers: [ProductCollectionService],
})
export class ProductCollectionModule {}
