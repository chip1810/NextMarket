import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'toan123', description: 'Username of the user' })
  username!: string;

  @ApiProperty({ example: 'toan@example.com', description: 'Email address' })
  email!: string;

  @ApiProperty({ example: '123456', description: 'Password (plain text, sẽ được hash)' })
  password!: string;
}
