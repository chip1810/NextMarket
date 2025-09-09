import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // === Role ===
  @Get('roles')
  findAllRoles() {
    return this.adminService.findAllRoles();
  }

  @Post('roles')
  createRole(@Body('name') name: string) {
    return this.adminService.createRole(name);
  }

  @Patch('roles/:id')
  updateRole(@Param('id') id: number, @Body('name') name: string) {
    return this.adminService.updateRole(id, name);
  }

  @Delete('roles/:id')
  deleteRole(@Param('id') id: number) {
    return this.adminService.deleteRole(id);
  }

  // === Permission ===
  @Get('permissions')
  findAllPermissions() {
    return this.adminService.findAllPermissions();
  }

  @Post('permissions')
  createPermission(@Body('code') code: string, @Body('description') description: string) {
    return this.adminService.createPermission(code, description);
  }

  @Patch('permissions/:id')
  updatePermission(@Param('id') id: number, @Body('code') code: string, @Body('description') description: string) {
    return this.adminService.updatePermission(id, code, description);
  }

  @Delete('permissions/:id')
  deletePermission(@Param('id') id: number) {
    return this.adminService.deletePermission(id);
  }

  // === Role-Permission ===
  @Get('roles-with-permissions')
findAllRolesWithCount() {
  return this.adminService.findAllRolesWithCount();
}

  @Post('roles/:roleId/permissions/:permId')
  assignPermissionToRole(@Param('roleId') roleId: number, @Param('permId') permId: number) {
    return this.adminService.assignPermissionToRole(roleId, permId);
  }

  @Delete('roles/:roleId/permissions/:permId')
  removePermissionFromRole(@Param('roleId') roleId: number, @Param('permId') permId: number) {
    return this.adminService.removePermissionFromRole(roleId, permId);
  }

  // === User-Role ===
  @Get('user-roles')
  getAllUserRoles() {
    return this.adminService.getAllUserRoles();
  }

  @Post('users/:userId/roles/:roleId')
  assignRoleToUser(@Param('userId') userId: number, @Param('roleId') roleId: number) {
    return this.adminService.assignRoleToUser(userId, roleId);
  }

  @Delete('users/:userId/roles/:roleId')
  removeRoleFromUser(@Param('userId') userId: number, @Param('roleId') roleId: number) {
    return this.adminService.removeRoleFromUser(userId, roleId);
  }

  @Get('users')
  getAllUsers() {
    return this.adminService.findAllUsers();
  }
}
