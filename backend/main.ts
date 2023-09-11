import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/server/app.module';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`NestJS is connected on port ${port}`);
}
bootstrap();
