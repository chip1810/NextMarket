import { Controller, Post, Body, Req, Session } from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() dto: CreateUserDto) {
    const user = await this.userService.register(dto);
    return {
      message: 'User registered successfully',
      data: user,
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto, @Req() req: Request, @Session() session: Record<string, any>) {
    const userData = await this.userService.login(dto);

    // Lưu vào session
    session.user = userData;

    return {
      message: 'Login successful',
      data: userData,
    };
  }
}
