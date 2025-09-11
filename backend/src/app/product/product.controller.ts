import { Controller, Get, Post, Body, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { RequirePermissions as Permissions } from '../user/auth/permission.decorator';
import { PermissionGuard } from '../user/auth/permission.guard';
import { JwtAuthGuard } from '../user/auth/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Permissions('view_product')
  async findAll() {
    const products = await this.productService.findAll();
    return {
      message: 'Lấy danh sách sản phẩm thành công',
      total: products.length,
      data: products,
    };
  }

  @Get(':id')
  @Permissions('view_product')
  async findOne(@Param('id') id: number){
    const data = await this.productService.findOne(id)
    return data
  }


  @Post()
  @Permissions('create_product')
  async create(@Body() body: Partial<Product>) {
    const product = await this.productService.create(body);
    return {
      message: 'Tạo sản phẩm thành công',
      data: product,
    };
  }

  @Put(':id')
  @Permissions('update_product')
  async update(@Param('id') id: number,@Body()dto: UpdateProductDto){
    const data = await this.productService.update(id,dto)
    return data

  }

  @Delete(':id')
  @Permissions('delete_product')
  async remove(@Param('id') id :number){
    await this.productService.remove(id)
    return id
  }
}
