import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from "./article.model";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: process.env.HOST,
      database: process.env.DATABASE,
      username: process.env.USER,
      password: process.env.PASS,
      url: process.env.DATABASE_URL,
      type: 'postgres',
      port: 5432,
      logging: true,
      entities: [Article],
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
