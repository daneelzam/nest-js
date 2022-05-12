import {
  Controller,
  Render, Redirect,
  Get, Post,
  Param, Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Article } from "./article.model";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index() {
    return {
      articles: await Article.find()
    };
  }

  @Get('articles/:id')
  @Render('article')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const article = await Article.findOne({ id });
    return article;
  }

  @Get('create')
  @Render('create-article')
  getForm(): void {
    return;
  }

  @Post('articles')
  @Redirect('/', 301)
  async create(@Body() body: any): Promise<void> {
    const newArticle = new Article(body.title, body.content);
    await newArticle.save();
  }
}
