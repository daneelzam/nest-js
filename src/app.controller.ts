import {
  Controller,
  Render, Redirect,
  Get, Post,
  Param, Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { articles } from './articles';
import {Article} from "./article.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { articles };
  }

  @Get('articles/:id')
  @Render('article')
  getById(@Param('id', ParseIntPipe) id: number) {
    return articles.find(article => article.id === id);
  }

  @Get('create')
  @Render('create-article')
  getForm(): void {
    return;
  }

  @Post('articles')
  @Redirect('/', 301)
  create(@Body() body: any): void {
    const id = articles.length + 1;
    const newArticle = new Article(body.title, body.content, id);
    articles.push(newArticle);
  }
}
