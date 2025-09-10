import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserAddress } from './entities/user-addresses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile,UserAddress]),
  JwtModule.register({
      secret: process.env.JWT_SECRET || 'toanpro123',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService,JwtModule],
})
export class UserModule {}
