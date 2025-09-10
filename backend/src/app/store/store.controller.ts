import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { SessionAuthGuard } from '../user/auth/session-auth.guard';
import { PermissionGuard } from '../user/auth/permission.guard';
import { RequirePermissions as Permissions } from '../user/auth/permission.decorator';

@Controller('stores')
@UseGuards(SessionAuthGuard, PermissionGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @Permissions('view_store')
  async findAll(){
    return this.storeService.findAll();

  
  }

  @Get('id')
  @Permissions('view_store')
  async findOne(@Param('id') id: number) {
    return this.storeService.findOne(id)

  }

  @Post()
  @Permissions('create_store')
  async create( @Req()req: any,@Body() dto : CreateStoreDto){
    return this.storeService.create(req.user.id,dto)
  }

  @Put(':id')
  @Permissions('update_store')
  async update( @Param('id') id: number, @Body()dto: UpdateStoreDto){
    return this.storeService.update( id, dto);
  }

  @Delete(':id')
  @Permissions('delete_store')
  async remove(@Param('id') id: number){
    return this.storeService.remove(id)
  }
}