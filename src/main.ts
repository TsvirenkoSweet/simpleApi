import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {runSeed} from "./database/seed";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await runSeed();

  await app.listen(3000);
  console.log('✅ Server started on http://localhost:3000');
}
bootstrap();
