// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserProfile } from './user-profile.entity';

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


}
