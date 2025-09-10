import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_addresses')
export class UserAddress {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'char', length: 36, unique: true })
  uuid!: string;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  recipient_name?: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ type: 'text', nullable: true })
  street?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  province?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country?: string;

  @Column({ nullable: true })
  postal_code?: string;

  @Column({ type: 'boolean', default: false })
  is_default!: boolean;

  @CreateDateColumn({ type: 'datetime' })
  created_at!: Date;

  // Quan hệ: nhiều địa chỉ thuộc về 1 user
  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
