import {Controller, Get, Param, ParseIntPipe, Render} from '@nestjs/common';
import { AppService } from './app.service';
import { articles } from './articles';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { articles };
  }

  @Get(':id')
  @Render('article')
  getById(@Param('id', ParseIntPipe) id: number) {
    return articles.find(article => article.id === id);
  }
}
