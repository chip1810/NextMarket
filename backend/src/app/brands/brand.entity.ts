import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'char', length: 36, unique: true })
  @Generated('uuid')
  uuid!: string;

  @Column({ length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ length: 255, nullable: true })
  logo_url!: string;

  @Column({ type: 'datetime', nullable: true })
  created_at!: Date;
}
