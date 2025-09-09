// main.ts
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);

  // CORS: lưu ý origin = FE origin, credentials: true để cookie được gửi
  app.enableCors({
    origin: 'http://localhost:4200', // hoặc http://localhost:4200 tùy FE
    credentials: true,
  });

  // express-session (development: MemoryStore). Đổi store cho production.
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'change_this_secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60, // 1h
        sameSite: 'lax', // localhost thường dùng 'lax'
        secure: false, // true nếu dùng https
      },
    }),
  );

  // Swagger (tùy chọn): cho phép cookie auth trong UI
  const config = new DocumentBuilder()
    .setTitle('EveryMart API')
    .setDescription('API documentation for EveryMart')
    .setVersion('1.0')
    .addTag('users')
    .addTag('products')
    .addCookieAuth('connect.sid') // hiển thị cookie auth trong Swagger UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
  Logger.log(`📄 Swagger docs available at: http://localhost:${port}/api`);
}

bootstrap();