import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    const existing = await this.findOne(id);
    if (!existing) return null;
    const updated = Object.assign(existing, user);
    return this.usersRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  findByEmail(email: string): Promise<User | null> {
  return this.usersRepository.findOne({ where: { email } });
}

}
