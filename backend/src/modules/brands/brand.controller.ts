import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PermissionGuard } from '../../common/auth/permission.guard';
import { RequirePermissions as Permissions } from '../../common/auth/permission.decorator';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('brands')
@Controller('brands')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class BrandController {
  constructor(private readonly service: BrandService) {}
   

  @Get()
  @Permissions('view_brand')
  async list(@Query('q') q?:string){
   return this.service.list(q)
  }

  @Get(':id')
  @Permissions('view_brand')
   async detail( @Param('id') id:number){
    const data= await this.service.detail(id)
    return{ data}

    }

    @Post()
    @Permissions('create_brand')
    async create ( @Body() dto : CreateBrandDto){
        const data = await this.service.create(dto)
        return data
    }

    @Put(':id')
    @Permissions('update_brand')
    async update (@Param('id') id:number, @Body() dto : UpdateBrandDto){
        const data = await this.service.update(id,dto)
        return data
    }


    @Delete(':id')
    @Permissions('delete_brand')
    async remove ( @Param('id') id:number){
        await this.service.remove(id)
        return id
    }
}