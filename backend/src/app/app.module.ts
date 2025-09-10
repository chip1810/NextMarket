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
      password: 'nhathuy04@',
      database: 'EveryMart',
      autoLoadEntities: true, 
      synchronize: false, 
    }),
    ProductModule,
    UserModule,
  ],
})
export class AppModule {}
