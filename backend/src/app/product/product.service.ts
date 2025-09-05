import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(data: Partial<Product>) {
    if (!data) data = {};
    const product = this.repo.create({
      ...data,
      uuid: data.uuid || uuidv4(),  
      created_at: new Date(),
      updated_at: new Date(),
    });
    return this.repo.save(product);
  }
}
