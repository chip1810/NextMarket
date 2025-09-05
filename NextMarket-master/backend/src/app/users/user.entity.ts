import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn,UpdateDateColumn,} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'char', length: 36, unique: true })
  uuid!: string;

  @Column({ nullable: true })
  username!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true })
  status!: string;

  @Column({ nullable: true })
  code!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

