import { PartialType } from '@nestjs/swagger';
import { CreateProductCollectionDto } from './create-product_collection.dto';

export class UpdateProductCollectionDto extends PartialType(
  CreateProductCollectionDto
) {}
