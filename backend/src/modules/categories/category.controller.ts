import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PermissionGuard } from '../../common/auth/permission.guard';
import { RequirePermissions as Permissions } from '../../common/auth/permission.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('categories')
@Controller('categories')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
@Permissions('view_category')
async findAll() {
  const data = await this.categoryService.findAll();
  return {
    message: 'Lấy danh sách category thành công',
    total: data.length,
    data,
  };
}

@Get(':id')
@Permissions('view_category')
async findOne(@Param('id') id: number) {
  const data = await this.categoryService.findOne(id);
  return {
    message: data ? 'Lấy category thành công' : 'Không tìm thấy category',
    data,
  };
}

@Post()
@Permissions('create_category')
async create(@Body() dto: CreateCategoryDto) {
  const data = await this.categoryService.create(dto);
  return {
    message: 'Tạo category thành công',
    data,
  };
}

@Put(':id')
@Permissions('update_category')
async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
  const data = await this.categoryService.update(id, dto);
  return {
    message: 'Cập nhật category thành công',
    data,
  };
}

@Delete(':id')
@Permissions('delete_category')
async remove(@Param('id') id: number) {
  await this.categoryService.remove(id);
  return {
    message: 'Xóa category thành công',
  };
}

}