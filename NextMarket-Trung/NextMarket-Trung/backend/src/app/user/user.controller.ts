// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('users') // Nhóm các API liên quan đến user
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() dto: CreateUserDto) {
    return this.userService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }
}
