import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { Product } from './product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ecomer',
       entities: [Product],
      autoLoadEntities: true, // 👈 tự load tất cả entity
      synchronize: false, // không tự tạo bảng, chỉ map
      logging: true,
    }),
    ProductModule,
    UserModule,
  ],
})
export class AppModule {}
