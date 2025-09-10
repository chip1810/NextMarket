import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SessionAuthGuard } from '../user/auth/session-auth.guard';
import { PermissionGuard } from '../user/auth/permission.guard';
import { RequirePermissions as Permissions } from '../user/auth/permission.decorator';

@Controller('categories')
@UseGuards(SessionAuthGuard, PermissionGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @Permissions('view_category')
  async findAll(){
    return this.categoryService.findAll()
  }

  @Get(':id')
  @Permissions('view_category')
  async findOne(@Param('id') id: number){
    return this.categoryService.findOne(id)
  }

  @Post()
  @Permissions('create_catgory')
  async create( @Body() dto: CreateCategoryDto){
    return this.categoryService.create(dto)
  }

  @Put(':id')
  @Permissions('update_category')
  async update(@Param(':id') id:number,@Body() dto:UpdateCategoryDto ){
    return this.categoryService.update(id,dto)
  }

  @Delete(':id')
  @Permissions('delete_category')
  async remove( @Param('id')id: number){
    return this.categoryService.remove(id)
  }
}