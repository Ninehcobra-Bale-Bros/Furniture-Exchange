import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('write-to-file')
  writeToFile() {
    return this.categoriesService.writeToFile();
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }
}
