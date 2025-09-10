import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StoreService {
  constructor(@InjectRepository(Store) private storeRepo: Repository<Store>) {}
  
  async findAll(){
    return this.storeRepo.find();

  }

  async findOne( id : number){
    const store = await this.storeRepo.findOne({where: { id } });
    if(!store) throw new NotFoundException('Store not found')
        return store;
  }

  async create( userId : number, dto: CreateStoreDto){
     const store = this.storeRepo.create({
        ...dto,
        uuid: uuidv4(),
        user_id: userId,
        created_at: new Date(),
     });
     return this.storeRepo.save(store);

  }

  async update( id : number, dto: UpdateStoreDto){
    const store = await this.findOne(id);
    Object.assign(store, dto, { updated_at : new Date()})
    return this.storeRepo.save(store)
  }

  async remove( id: number){
    const store = await this.findOne(id)
    return this.storeRepo.remove(store)
  }
}
