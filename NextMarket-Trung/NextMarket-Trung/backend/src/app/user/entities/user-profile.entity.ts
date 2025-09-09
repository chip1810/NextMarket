// user-profile.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'char', length: 36, unique: true })
  uuid!: string;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  full_name!: string;

  @Column({ type: 'date', nullable: true })
  dob!: Date;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  gender!: string;

  @Column({ nullable: true })
  avatar_url!: string;

  @Column({ type: 'text', nullable: true })
  bio!: string;

  @Column({ type: 'datetime', nullable: true })
  created_at!: Date;

@OneToOne(() => User, (user) => user.profile)
@JoinColumn({ name: 'user_id' })
user!: User;


}
