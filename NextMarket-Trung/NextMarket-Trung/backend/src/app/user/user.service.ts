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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

    const savedUser = await this.userRepository.save(user);
    
    // Remove password from response
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async login(dto: LoginDto) {
    console.log('🔑 Login attempt for:', dto.email);
    
    // BỎ RELATIONS ĐỂ TEST
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      // relations: ['profile'], // COMMENT OUT DÒNG NÀY
    });

    console.log('👤 User found:', !!user);
    if (!user) {
      console.log('❌ User not found');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('🔐 Comparing passwords...');
    const isMatch = await bcrypt.compare(dto.password, user.password);
    console.log('✅ Password match:', isMatch);
    
    if (!isMatch) {
      console.log('❌ Password mismatch');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('🎉 Login successful!');

    // Generate JWT payload
    const payload = { 
      sub: user.id, 
      uuid: user.uuid, 
      email: user.email,
      username: user.username 
    };
    
    // Generate access token
    const access_token = this.jwtService.sign(payload);

    // Return user data with token (WITHOUT PROFILE FOR NOW)
    return {
      access_token,
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        username: user.username,
        // profile: user.profile, // COMMENT OUT
      }
    };
  }

  // Method to verify and decode JWT token
  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne({
        where: { id: payload.sub },
        // relations: ['profile'], // COMMENT OUT
      });
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}