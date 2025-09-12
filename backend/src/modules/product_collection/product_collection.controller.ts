import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductCollectionService } from './product_collection.service';
import { CreateProductCollectionDto } from './dto/create-product_collection.dto';
import { UpdateProductCollectionDto } from './dto/update-product_collection.dto';

@Controller('product-collection')
export class ProductCollectionController {
  constructor(
    private readonly productCollectionService: ProductCollectionService
  ) {}

  @Post()
  create(@Body() createProductCollectionDto: CreateProductCollectionDto) {
    return this.productCollectionService.create(createProductCollectionDto);
  }

  @Get()
  findAll() {
    return this.productCollectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCollectionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCollectionDto: UpdateProductCollectionDto
  ) {
    return this.productCollectionService.update(
      +id,
      updateProductCollectionDto
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCollectionService.remove(+id);
  }
}
