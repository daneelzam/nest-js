import type { NestExpressApplication } from "@nestjs/platform-express";

import { join } from 'path'
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '../views'));
  app.setViewEngine('pug');

  await app.listen(process.env.PORT || 3000);
};

bootstrap();
