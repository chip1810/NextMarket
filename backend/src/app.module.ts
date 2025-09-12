import { CategoryModule } from './modules/categories/category.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { StoreModule } from './modules/store/store.module';
import { BrandModule } from './modules/brands/brands.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RolePermissionModule } from './modules/role-permission/role-permission.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
<<<<<<< HEAD
import { join } from 'path';
=======
import { ProductCollectionModule } from './modules/product_collection/product_collection.module';
>>>>>>> 6c756844907cda5e3c93477cd26c1037a8739b73

@Module({
  imports: [
    // Đọc file .env
    ConfigModule.forRoot({
<<<<<<< HEAD
      isGlobal: true, // để tất cả module khác đều dùng được
      envFilePath: join(process.cwd(), 'backend', 'src', 'config', '.env'),
=======
      isGlobal: true,
>>>>>>> 6c756844907cda5e3c93477cd26c1037a8739b73
    }),

    // Cấu hình DB dùng ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('DB_HOST:', configService.get('DB_HOST'));
        console.log('DB_NAME:', configService.get('DB_USERNAME'));
        console.log('DB_PASSWORD:', configService.get('DB_PASSWORD'));

        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false,
          logging: true,
        };
      },
    }),

    ProductModule,
    UserModule,
    CategoryModule,
    StoreModule,
    BrandModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    UserRoleModule,
    ProductCollectionModule,
  ],
})
export class AppModule {}
