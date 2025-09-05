import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './../auth/dto/create-user.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('users') 

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User|null> {
    return this.usersService.findOne(id);
  }

  // Removed duplicate create method

  @Put(':id')
  update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User | null> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
   create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
   }
}
