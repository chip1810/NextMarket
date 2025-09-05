import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(dto: RegisterDto) {
    const user = this.usersRepository.create(dto);
    await this.usersRepository.save(user);
    return { message: 'User registered successfully', user };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findOneBy({ email: dto.email });

    if (!user || user.password !== dto.password) {
      return { message: 'Invalid email or password' };
    }

    return {
      message: 'Login successful',
      user,
      token: 'fake-jwt-token-123',
    };
  }
}
