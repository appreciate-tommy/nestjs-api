import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPipes = new ValidationPipe({
    whitelist: true, // whitelisting strips out anything that is not included in our dto
  });
  app.useGlobalPipes(globalPipes);

  await app.listen(3333);
}
bootstrap();
