// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { UserProfile } from '../admin/entities/user-profile.entity';
import { UserRole } from '../user-role/user-role.entity';



@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'char', length: 36, unique: true })
  uuid!: string;

  @Column({ nullable: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  status!: string;

  @Column({ nullable: true, unique: true })
  code!: string;

  @Column({ type: 'datetime', nullable: true })
  created_at!: Date;

  @Column({ type: 'datetime', nullable: true })
  updated_at!: Date;

@OneToOne(() => UserProfile, (profile) => profile.user, {
  cascade: true,
})
profile!: UserProfile;

  @OneToMany(() => UserRole, userRole => userRole.user, { cascade: true })
  roles!: UserRole[];


}
