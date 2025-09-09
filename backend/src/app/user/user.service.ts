// user.service.ts
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService, // 👈 inject JwtService
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

    return await this.userRepository.save(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      relations: [
        'roles',
        'roles.role',
        'roles.role.rolePermissions',
        'roles.role.rolePermissions.permission',
      ],
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const permissions = user.roles.flatMap(ur =>
      ur.role.rolePermissions.map(rp => rp.permission.code),
    );

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map(ur => ur.role.name),
      permissions,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      email: user.email,
      roles: user.roles.map(ur => ur.role.name),
      permissions,
      token, // 👈 JWT token
    };
  }
}
