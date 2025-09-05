import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '18102004Trung@',
      database: 'EveryMart',
      autoLoadEntities: true, // 👈 tự load tất cả entity
      synchronize: false, // không tự tạo bảng, chỉ map
    }),
    ProductModule,
    UserModule,
  ],
})
export class AppModule {}
