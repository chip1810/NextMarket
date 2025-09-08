import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';


@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @ManyToOne(() => User, user => user.roles)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Role, role => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @Column()
  assigned_at!: Date;
}
