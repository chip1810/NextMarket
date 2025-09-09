import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Role } from '../user/entities/role.entity';
import { Permission } from '../user/entities/permission.entity';
import { UserRole } from '../user/entities/user-role.entity';
import { User } from '../user/entities/user.entity';
import { RolePermission } from '../user/entities/role-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, Permission, UserRole, User, RolePermission]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService],
})
export class AdminModule {}
