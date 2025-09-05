import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('NextMarket API')        // Tiêu đề API docs
    .setDescription('API documentation for NextMarket project') // Mô tả
    .setVersion('1.0')                 // Version
    .addBearerAuth()                   // Nếu có JWT Auth
    .build();

  // Tạo document
  const document = SwaggerModule.createDocument(app, config);

  // Đường dẫn truy cập swagger: http://localhost:3000/api-docs
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
