import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in the DTO
      forbidNonWhitelisted: true, // rejects request if extra properties are sent
      transform: true, // converts plain JSON into the DTO class instance
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
