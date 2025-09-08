import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';


@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @Column()
  code!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => RolePermission, rp => rp.permission)
  rolePermissions!: RolePermission[];
}
