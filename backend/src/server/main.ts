import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`NestJS is connected on port ${port}`);
}
bootstrap();
