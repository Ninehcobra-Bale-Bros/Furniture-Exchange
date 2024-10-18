import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('categories')
@ApiTags('categories')
@UseGuards(JwtAuthGuard, RoleGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @Public()
  @ApiOperation({
    summary: '[PUBLIC] Get all categories',
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':slug/products')
  @Public()
  @ApiOperation({
    summary: '[PUBLIC] Get products by category',
  })
  getProductsByCategory(@Param('slug') slug: string) {
    return this.categoriesService.getProductsByCategory(slug);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[ADMIN] Create a category',
  })
  @Roles(RoleEnum.ADMIN)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // @Get('write-to-file')
  // @Public()
  // @ApiOperation({
  //   summary: '[ADMIN] DO NOT USE THIS ENDPOINT',
  // })
  // writeToFile() {
  //   return this.categoriesService.writeToFile();
  // }
}
