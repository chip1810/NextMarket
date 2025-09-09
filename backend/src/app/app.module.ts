import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '18102004Trung@',
      database: 'EveryMart',
      autoLoadEntities: true,
      synchronize: false,
    }),
    ProductModule,
    UserModule,
    AdminModule, // AdminModule đã cung cấp AdminService
  ],
})
export class AppModule {}
