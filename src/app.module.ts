import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from "./article.model";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-52-212-228-71.eu-west-1.compute.amazonaws.com',
      database: 'dfd57jlsrkpg0i',
      username: 'ecygbbqwxdevfe',
      port: 5432,
      password: 'f42dd03e85136ef900cc4a462da9610c7ccd0a06209156927730a8cd9ed2b3fb',
      logging: true,
      entities: [Article],
      synchronize: true,
      cli: 'heroku pg:psql postgresql-adjacent-18796 --app trynestjs',
      url: 'postgres://ecygbbqwxdevfe:f42dd03e85136ef900cc4a462da9610c7ccd0a06209156927730a8cd9ed2b3fb@ec2-52-212-228-71.eu-west-1.compute.amazonaws.com:5432/dfd57jlsrkpg0i',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
