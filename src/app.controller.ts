import {Body, Controller, Get, Param, ParseIntPipe, Post, Redirect, Render,} from '@nestjs/common';
import {AppService} from './app.service';
import {Article} from "./article.model";

// почему-то не работают через импорт
const puppeteer = require('puppeteer');
const ncrypt = require("ncrypt-js");

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

  @Post()
   func(@Body() body: any): string{
    const ncryptObject = new ncrypt('secretKey');
    const url = body.url
    const name = ncryptObject.encrypt(url);

    //сохранение статьи в виде pdf
    (async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(url, {
        waitUntil: 'networkidle2',
      });

      //сохранение данных в формате buffer в переменной test
      const test = await page.pdf({ path: `pdf/${name}.pdf`, format: 'a4' })
      await browser.close()
    })();
    return 'скоро мы научимся возвращать статику'
  }

  @Get('articles/:id')
  @Render('article')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await Article.findOne({id});
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
