import { CategoryModule } from './categories/category.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from './store/store.module';
import { BrandModule } from './brands/brands.module';

@Module({
  imports: [
    // Đọc file .env
    ConfigModule.forRoot({
      isGlobal: true, // để tất cả module khác đều dùng được
    }),

    // Cấu hình DB dùng ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, //change to true if you want to start server;
      }),
    }),

    ProductModule,
    UserModule,
    AdminModule,
    CategoryModule,
    StoreModule,
    BrandModule,
  ],
})
export class AppModule {}
