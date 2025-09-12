// role-permission.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermission } from './role-permission.entity';
import { Role } from '../role/role.entity';
import { Permission } from '../permission/permission.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission) private rpRepo: Repository<RolePermission>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission) private permRepo: Repository<Permission>,
  ) {}

  async findAllRolesWithCount() {
    const roles = await this.roleRepo.find();
    return Promise.all(
      roles.map(async r => ({
        ...r,
        permissionCount: await this.rpRepo.count({ where: { role: { id: r.id } } }),
      })),
    );
  }

  async assignPermission(roleId: number, permId: number) {
    const role = await this.roleRepo.findOne({ where: { id: roleId } });
    const perm = await this.permRepo.findOne({ where: { id: permId } });
    if (!role || !perm) throw new NotFoundException('Role or Permission not found');

    const exist = await this.rpRepo.findOne({ where: { role: { id: roleId }, permission: { id: permId } } });
    if (exist) throw new BadRequestException('Permission already assigned');

    return this.rpRepo.save(this.rpRepo.create({ role, permission: perm, uuid: uuidv4() }));
  }

  async removePermission(roleId: number, permId: number) {
    const rp = await this.rpRepo.findOne({ where: { role: { id: roleId }, permission: { id: permId } } });
    if (!rp) throw new NotFoundException('Permission not assigned');
    return this.rpRepo.remove(rp);
  }
}
