import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PermissionGuard } from '../user/auth/permission.guard';
import { RequirePermissions as Permissions } from '../user/auth/permission.decorator';
import { JwtAuthGuard } from '../user/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('stores')
@Controller('stores')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

@Get()
@Permissions('view_store')
async findAll() {
  const stores = await this.storeService.findAll();
  return {
    message: 'Danh sách cửa hàng',
    total: stores.length,
    data: stores,
  };
}

@Get(':id')
@Permissions('view_store')
async findOne(@Param('id') id: number) {
  const store = await this.storeService.findOne(id);
  return {
    message: 'Chi tiết cửa hàng',
    data: store,
  };
}

@Post()
@Permissions('create_store')
async create(@Req() req: any, @Body() dto: CreateStoreDto) {
  const store = await this.storeService.create(req.user.userId, dto);
  return {
    message: 'Tạo cửa hàng thành công',
    data: store,
  };
}

@Put(':id')
@Permissions('update_store')
async update(@Param('id') id: number, @Body() dto: UpdateStoreDto) {
  const store = await this.storeService.update(id, dto);
  return {
    message: 'Cập nhật cửa hàng thành công',
    data: store,
  };
}

@Delete(':id')
@Permissions('delete_store')
async remove(@Param('id') id: number) {
  await this.storeService.remove(id);
  return {
    message: 'Xóa cửa hàng thành công',
  };
}
}