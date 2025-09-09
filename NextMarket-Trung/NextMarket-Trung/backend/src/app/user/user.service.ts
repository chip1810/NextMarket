// user.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(dto: CreateUserDto) {
    const exist = await this.userRepository.findOne({ where: { email: dto.email } });
    if (exist) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      uuid: uuidv4(),
      username: dto.username,
      email: dto.email,
      password: hashed,
      status: 'active',
      created_at: new Date(),
      profile: {
        uuid: uuidv4(),
        full_name: dto.full_name,
        dob: dto.dob,
        phone: dto.phone,
        gender: dto.gender,
        created_at: new Date(),
      },
    });

    return await this.userRepository.save(user); // cascade save luôn profile
  }
  async login(dto: LoginDto) {
  const user = await this.userRepository.findOne({
    where: { email: dto.email },
    relations: ['profile'], // nếu muốn lấy luôn profile
  });

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(dto.password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException('Invalid credentials');
  }

  // Trả về user (có thể trả token nếu muốn JWT)
  return {
    id: user.id,
    uuid: user.uuid,
    email: user.email,
    username: user.username,
    profile: user.profile,
  };
}
}
