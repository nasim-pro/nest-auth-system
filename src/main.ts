import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // remove unknown fields
      forbidNonWhitelisted: true, // throw error if extra fields
      transform: true,            // auto transform DTO types
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Server is running on: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
